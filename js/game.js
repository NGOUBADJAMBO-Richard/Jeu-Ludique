import { getDomRefs } from "./game-dom.mjs";
import {
  CUSTOM_QUESTION_COUNTS,
  GameState,
  assertStateTransition,
  buildQuestionSet,
  clampTime,
  getDifficultyMeta,
  getEndResultText,
  getPlannedQuestionCount,
  getSelectedDifficulty,
  normalizeName,
  normalizeSecondName,
  t,
} from "./game-engine.mjs";
import { createRenderer } from "./game-renderer.mjs";
import { createInitialState } from "./game-state.mjs";

const state = createInitialState();
const refs = getDomRefs();

let renderer;

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function applyTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  state.theme = safeTheme;
  document.documentElement.setAttribute("data-theme", safeTheme);
  refs.themeSelect.value = safeTheme;
  localStorage.setItem("quizTheme", safeTheme);
}

function syncPlayersFromInputs() {
  state.playerName = normalizeName(refs.playerNameInput.value);
  state.playerTwoName = normalizeSecondName(refs.playerTwoNameInput.value);
  state.twoPlayerMode = refs.twoPlayerModeInput.checked;
  state.players = state.twoPlayerMode
    ? [state.playerName, state.playerTwoName]
    : [state.playerName];
}

function resetRoundState() {
  state.activePlayerIndex = 0;
  state.scores = [0, 0];
  state.score = 0;
  state.currentQuestionIndex = 0;
  state.answeredCurrentQuestion = false;
}

function applyDifficultySettings() {
  const level = getSelectedDifficulty(refs.difficultyLevelInput.value);
  const meta = getDifficultyMeta(state, level);
  state.difficultyLevel = level;
  state.timePerQuestion = clampTime(meta.seconds);
  state.plannedQuestionCount = getPlannedQuestionCount(state, level);
  refs.timePerQuestionInput.value = String(state.timePerQuestion);
  refs.difficultyLabel.textContent = meta.label[state.language];
  refs.difficultyInfo.textContent = `${meta.label[state.language]}: ${meta.seconds}s, ${state.plannedQuestionCount} questions (${meta.description[state.language]})`;
}

function setGameState(nextState) {
  assertStateTransition(state.gameState, nextState);
  state.gameState = nextState;
  renderer.renderState();
}

function handleTimeout() {
  if (state.gameState !== GameState.PLAYING || state.answeredCurrentQuestion) {
    return;
  }

  state.answeredCurrentQuestion = true;
  stopTimer();
  refs.timerLabel.textContent = "0s";
  renderer.lockAnswersAndReveal(null);
  refs.resultText.textContent = t(state, "timeoutFor", {
    name: state.players[state.activePlayerIndex],
  });
  refs.nextBtn.disabled = false;
}

function startQuestionTimer() {
  stopTimer();
  state.currentTimeLeft = state.timePerQuestion;
  refs.timerLabel.textContent = `${state.currentTimeLeft}s`;

  state.timerId = setInterval(() => {
    state.currentTimeLeft -= 1;
    refs.timerLabel.textContent = `${Math.max(0, state.currentTimeLeft)}s`;

    if (state.currentTimeLeft <= 0) {
      handleTimeout();
    }
  }, 1000);
}

function refreshSetupStateIfIdle() {
  if (state.gameState === GameState.PLAYING) {
    return;
  }

  applyDifficultySettings();
  renderer.renderState();
}

function prepareRound() {
  applyDifficultySettings();
  syncPlayersFromInputs();
  resetRoundState();
  buildQuestionSet(state);
}

function selectAnswer(choiceIndex) {
  if (state.gameState !== GameState.PLAYING || state.answeredCurrentQuestion) {
    return;
  }

  stopTimer();
  state.answeredCurrentQuestion = true;
  const current = state.shuffledQuestions[state.currentQuestionIndex];
  const isCorrect = choiceIndex === current.answerIndex;

  if (isCorrect) {
    state.score += 1;
    state.scores[state.activePlayerIndex] += 1;
    refs.scoreLabel.textContent = String(state.score);
    renderer.updateScoreboard();
  }

  renderer.lockAnswersAndReveal(choiceIndex);
  refs.nextBtn.disabled = false;
}

function nextQuestion() {
  if (state.gameState !== GameState.PLAYING || !state.answeredCurrentQuestion) {
    return;
  }

  state.currentQuestionIndex += 1;
  state.answeredCurrentQuestion = false;
  if (state.twoPlayerMode) {
    state.activePlayerIndex = state.activePlayerIndex === 0 ? 1 : 0;
  }

  if (state.currentQuestionIndex >= state.shuffledQuestions.length) {
    setGameState(GameState.END);
    refs.resultText.textContent = getEndResultText(state);
    return;
  }

  renderer.renderState();
}

function startGame() {
  if (state.gameState !== GameState.START) {
    return;
  }

  prepareRound();
  refs.resultText.textContent = t(state, "gameInProgress");
  setGameState(GameState.PLAYING);
}

function replayGame() {
  if (state.gameState !== GameState.END) {
    return;
  }

  stopTimer();
  prepareRound();
  refs.resultText.textContent = t(state, "noGameYet");
  setGameState(GameState.START);
}

function applyLanguage() {
  renderer.applyLanguage();
  applyDifficultySettings();
}

renderer = createRenderer({
  state,
  refs,
  t: (key, params) => t(state, key, params),
  getPlannedQuestionCount: (level) => getPlannedQuestionCount(state, level),
  onSelectAnswer: selectAnswer,
  onStartTimer: startQuestionTimer,
  onStopTimer: stopTimer,
});

refs.playerNameInput.addEventListener("input", (event) => {
  state.playerName = normalizeName(event.target.value);
  syncPlayersFromInputs();
  renderer.refreshParticipantUI();
});

refs.playerTwoNameInput.addEventListener("input", (event) => {
  state.playerTwoName = normalizeSecondName(event.target.value);
  syncPlayersFromInputs();
  renderer.refreshParticipantUI();
});

refs.twoPlayerModeInput.addEventListener("change", () => {
  syncPlayersFromInputs();
  renderer.refreshParticipantUI();
});

refs.difficultyLevelInput.addEventListener("change", () => {
  refreshSetupStateIfIdle();
});

refs.questionCountModeInput.addEventListener("change", () => {
  state.questionCountMode =
    refs.questionCountModeInput.value === "custom" ? "custom" : "auto";
  refs.customQuestionCountInput.disabled = state.questionCountMode !== "custom";
  refreshSetupStateIfIdle();
});

refs.customQuestionCountInput.addEventListener("change", () => {
  const nextValue = Number(refs.customQuestionCountInput.value);
  state.customQuestionCount = CUSTOM_QUESTION_COUNTS.includes(nextValue)
    ? nextValue
    : 10;
  refs.customQuestionCountInput.value = String(state.customQuestionCount);
  refreshSetupStateIfIdle();
});

refs.languageSelect.addEventListener("change", () => {
  state.language = refs.languageSelect.value === "en" ? "en" : "fr";
  localStorage.setItem("quizLanguage", state.language);
  applyLanguage();
  renderer.renderState();
});

refs.themeSelect.addEventListener("change", () => {
  applyTheme(refs.themeSelect.value);
});

refs.startBtn.addEventListener("click", startGame);
refs.nextBtn.addEventListener("click", nextQuestion);
refs.replayBtn.addEventListener("click", replayGame);

state.language = localStorage.getItem("quizLanguage") === "en" ? "en" : "fr";
refs.languageSelect.value = state.language;
state.questionCountMode =
  refs.questionCountModeInput.value === "custom" ? "custom" : "auto";
state.customQuestionCount = Number(refs.customQuestionCountInput.value) || 10;
refs.customQuestionCountInput.disabled = state.questionCountMode !== "custom";
applyTheme(localStorage.getItem("quizTheme") || "light");
applyLanguage();
renderer.renderState();
