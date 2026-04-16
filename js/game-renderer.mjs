import { DIFFICULTY_CONFIG, GameState } from "./quiz-data.mjs";

export function createRenderer({
  state,
  refs,
  t,
  getPlannedQuestionCount,
  onSelectAnswer,
  onStartTimer,
  onStopTimer,
}) {
  function updateLiveName() {
    refs.liveName.textContent = state.twoPlayerMode
      ? `${state.players[0]} & ${state.players[1]}`
      : state.playerName;
  }

  function updateScoreboard() {
    if (state.twoPlayerMode) {
      refs.scoreboardLabel.textContent = `${state.players[0]} ${state.scores[0]} - ${state.players[1]} ${state.scores[1]}`;
      return;
    }
    refs.scoreboardLabel.textContent = `${state.players[0]} ${state.scores[0]}`;
  }

  function refreshParticipantUI() {
    updateLiveName();
    updateScoreboard();
  }

  function lockAnswersAndReveal(selectedIndex) {
    const current = state.shuffledQuestions[state.currentQuestionIndex];
    Array.from(refs.answersContainer.children).forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === current.answerIndex) {
        btn.classList.add("correct");
      } else if (selectedIndex !== null && idx === selectedIndex) {
        btn.classList.add("wrong");
      }
    });
  }

  function renderQuestion() {
    const current = state.shuffledQuestions[state.currentQuestionIndex];
    refs.questionText.textContent = current.text;
    refs.answersContainer.innerHTML = "";

    current.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "answer-btn";
      btn.textContent = choice;
      btn.addEventListener("click", () => onSelectAnswer(idx));
      refs.answersContainer.appendChild(btn);
    });

    refs.nextBtn.disabled = true;
    onStartTimer();
  }

  function renderState() {
    const labels = {
      [GameState.START]: t("stateStart"),
      [GameState.PLAYING]: t("statePlaying"),
      [GameState.END]: t("stateEnd"),
    };

    refs.gameStateLabel.textContent = labels[state.gameState];
    updateLiveName();
    refs.difficultyLabel.textContent =
      DIFFICULTY_CONFIG[state.difficultyLevel].label[state.language];
    refs.scoreLabel.textContent = String(state.score);
    refs.currentPlayerLabel.textContent =
      state.gameState === GameState.PLAYING
        ? state.players[state.activePlayerIndex]
        : "-";
    updateScoreboard();

    if (state.gameState === GameState.START) {
      onStopTimer();
      refs.timerLabel.textContent = "0s";
      refs.progressLabel.textContent = `0 / ${getPlannedQuestionCount(state.difficultyLevel)}`;
      refs.questionText.textContent = t("clickToStart");
      refs.answersContainer.innerHTML = "";
      refs.nextBtn.disabled = true;
      refs.replayBtn.disabled = true;
      refs.startBtn.disabled = false;
      refs.languageSelect.disabled = false;
      refs.difficultyLevelInput.disabled = false;
      refs.questionThemeInput.disabled = false;
      refs.questionCountModeInput.disabled = false;
      refs.customQuestionCountInput.disabled =
        state.questionCountMode !== "custom";
      return;
    }

    if (state.gameState === GameState.PLAYING) {
      refs.progressLabel.textContent = `${state.currentQuestionIndex + 1} / ${state.shuffledQuestions.length}`;
      refs.currentPlayerLabel.textContent =
        state.players[state.activePlayerIndex];
      refs.startBtn.disabled = true;
      refs.replayBtn.disabled = true;
      refs.languageSelect.disabled = true;
      refs.difficultyLevelInput.disabled = true;
      refs.questionThemeInput.disabled = true;
      refs.questionCountModeInput.disabled = true;
      refs.customQuestionCountInput.disabled = true;
      renderQuestion();
      return;
    }

    onStopTimer();
    refs.timerLabel.textContent = "0s";
    refs.progressLabel.textContent = `${state.shuffledQuestions.length} / ${state.shuffledQuestions.length}`;
    refs.questionText.textContent = t("gameFinished");
    refs.answersContainer.innerHTML = "";
    refs.nextBtn.disabled = true;
    refs.replayBtn.disabled = false;
    refs.languageSelect.disabled = false;
    refs.difficultyLevelInput.disabled = false;
    refs.questionThemeInput.disabled = false;
    refs.questionCountModeInput.disabled = false;
    refs.customQuestionCountInput.disabled =
      state.questionCountMode !== "custom";
    refs.currentPlayerLabel.textContent = "-";
  }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    refs.appTitle.textContent = t("title");
    refs.headerTitle.textContent = t("headerTitle");
    refs.headerTagline.textContent = t("tagline");
    refs.languageLabel.textContent = t("languageLabel");
    refs.themeLabel.textContent = t("themeLabel");
    refs.rulesTitle.textContent = t("rulesTitle");
    refs.rule1.innerHTML = t("rule1");
    refs.rule2.textContent = t("rule2");
    refs.rule3.textContent = t("rule3");
    refs.rule4.textContent = t("rule4");
    refs.rule5.textContent = t("rule5");
    refs.rule6.textContent = t("rule6");
    refs.rule7.textContent = t("rule7");
    refs.rule8.innerHTML = t("rule8");
    refs.playerOneLabel.textContent = t("player1Label");
    refs.playerTwoLabel.textContent = t("player2Label");
    refs.secondsPerQuestionLabel.textContent = t("secondsPerQuestion");
    refs.difficultyLevelSetupLabel.textContent = t("difficultyLabelSetup");
    refs.questionThemeLabel.textContent = t("questionThemeLabel");
    refs.questionCountModeLabel.textContent = t("questionCountModeLabel");
    refs.customQuestionCountLabel.textContent = t("customQuestionCountLabel");
    refs.twoPlayerModeLabel.textContent = t("twoPlayerLabel");
    refs.startBtn.textContent = t("startBtn");
    refs.nextBtn.textContent = t("nextBtn");
    refs.replayBtn.textContent = t("replayBtn");
    refs.livePrefix.textContent = t("livePrefix");
    refs.statePrefix.textContent = t("statePrefix");
    refs.turnPrefix.textContent = t("turnPrefix");
    refs.timePrefix.textContent = t("timePrefix");
    refs.difficultyPrefix.textContent = t("difficultyPrefix");
    refs.scorePrefix.textContent = t("scorePrefix");
    refs.scoreboardPrefix.textContent = t("scoreboardPrefix");
    refs.questionPrefix.textContent = t("questionPrefix");
    refs.resultTitle.textContent = t("resultTitle");
    refs.resultText.textContent =
      state.gameState === GameState.END
        ? refs.resultText.textContent
        : t("noGameYet");
    refs.themeSelect.options[0].textContent = t("themeLight");
    refs.themeSelect.options[1].textContent = t("themeDark");
    refs.difficultyLevelInput.options[0].textContent =
      DIFFICULTY_CONFIG.easy.label[state.language];
    refs.difficultyLevelInput.options[1].textContent =
      DIFFICULTY_CONFIG.medium.label[state.language];
    refs.difficultyLevelInput.options[2].textContent =
      DIFFICULTY_CONFIG.hard.label[state.language];
    refs.questionThemeInput.options[0].textContent = t("themeAll");
    refs.questionThemeInput.options[1].textContent = t("themeGeography");
    refs.questionThemeInput.options[2].textContent = t("themeHistory");
    refs.questionThemeInput.options[3].textContent = t("themeScience");
    refs.questionThemeInput.options[4].textContent = t("themeArts");
    refs.questionThemeInput.options[5].textContent = t("themeSports");
    refs.questionThemeInput.options[6].textContent = t("themeBible");
    refs.questionThemeInput.options[7].textContent = t("themeTechnology");
    refs.questionThemeInput.options[8].textContent = t("themeCivics");
    refs.questionCountModeInput.options[0].textContent = t("modeAuto");
    refs.questionCountModeInput.options[1].textContent = t("modeCustom");
    refs.playerNameInput.placeholder = "Ex: Ruth";
    refs.playerTwoNameInput.placeholder = "Ex: Daniel";
  }

  return {
    applyLanguage,
    lockAnswersAndReveal,
    refreshParticipantUI,
    renderState,
    updateScoreboard,
  };
}
