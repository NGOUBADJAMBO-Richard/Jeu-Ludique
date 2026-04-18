import {
  CUSTOM_QUESTION_COUNTS,
  DIFFICULTY_CONFIG,
  GameState,
  I18N,
  MIN_QUESTIONS_PER_GAME,
  THEME_OPTIONS,
  questionPoolsByLanguage,
  shuffleQuestions,
} from "./quiz-data.mjs";

export function normalizeName(value) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Invité";
}

export function normalizeSecondName(value) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Joueur 2";
}

export function t(state, key, params = {}) {
  const dict = I18N[state.language] || I18N.fr;
  let template = dict[key] || I18N.fr[key] || key;
  Object.entries(params).forEach(([paramKey, value]) => {
    template = template.replaceAll(`{${paramKey}}`, String(value));
  });
  return template;
}

export function getActiveQuestionPools(state) {
  return questionPoolsByLanguage[state.language] || questionPoolsByLanguage.fr;
}

export function getSelectedTheme(value) {
  return THEME_OPTIONS.includes(value) ? value : "all";
}

export function getQuestionsForDifficulty(
  state,
  level = state.difficultyLevel,
) {
  const levelPool = getActiveQuestionPools(state)[level];
  if (state.questionTheme === "all") {
    return levelPool;
  }

  const filtered = levelPool.filter(
    (question) => question.theme === state.questionTheme,
  );
  return filtered.length >= MIN_QUESTIONS_PER_GAME ? filtered : levelPool;
}

export function sanitizeCustomQuestionCount(value, poolCount) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return Math.min(MIN_QUESTIONS_PER_GAME, poolCount);
  }

  const rounded = Math.floor(numeric);
  return Math.min(poolCount, Math.max(MIN_QUESTIONS_PER_GAME, rounded));
}

export function getPlannedQuestionCount(state, level = state.difficultyLevel) {
  const poolCount = getQuestionsForDifficulty(state, level).length;
  if (state.questionCountMode === "custom") {
    return sanitizeCustomQuestionCount(state.customQuestionCount, poolCount);
  }
  return poolCount;
}

export function clampTime(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return 15;
  }
  return Math.min(60, Math.max(5, Math.floor(numeric)));
}

export function getSelectedDifficulty(value) {
  if (value === "easy" || value === "medium" || value === "hard") {
    return value;
  }
  return "easy";
}

export function getDifficultyMeta(state, level) {
  const config = DIFFICULTY_CONFIG[level];
  const count = getQuestionsForDifficulty(state, level).length;
  return { ...config, count };
}

export function buildQuestionSet(state) {
  const pool = shuffleQuestions(getQuestionsForDifficulty(state));
  state.plannedQuestionCount = getPlannedQuestionCount(
    state,
    state.difficultyLevel,
  );
  state.shuffledQuestions = pool.slice(0, state.plannedQuestionCount);
}

export function resetRoundState(state) {
  state.activePlayerIndex = 0;
  state.scores = [0, 0];
  state.score = 0;
  state.currentQuestionIndex = 0;
  state.answeredCurrentQuestion = false;
}

export function getEndResultText(state) {
  if (!state.twoPlayerMode) {
    return t(state, "finalScoreSingle", {
      name: state.playerName,
      score: state.score,
      total: state.shuffledQuestions.length,
    });
  }

  if (state.scores[0] === state.scores[1]) {
    return t(state, "tieText", {
      p1: state.players[0],
      s1: state.scores[0],
      p2: state.players[1],
      s2: state.scores[1],
    });
  }

  const winnerIndex = state.scores[0] > state.scores[1] ? 0 : 1;
  return t(state, "winnerText", {
    winner: state.players[winnerIndex],
    s1: state.scores[0],
    s2: state.scores[1],
  });
}

export function assertStateTransition(currentState, nextState) {
  const allowedTransitions = {
    [GameState.START]: [GameState.PLAYING],
    [GameState.PLAYING]: [GameState.END],
    [GameState.END]: [GameState.START],
  };

  const allowed = allowedTransitions[currentState] || [];
  if (!allowed.includes(nextState)) {
    throw new Error(`Transition interdite: ${currentState} -> ${nextState}`);
  }
}

export {
  CUSTOM_QUESTION_COUNTS,
  DIFFICULTY_CONFIG,
  GameState,
  MIN_QUESTIONS_PER_GAME,
  THEME_OPTIONS,
  questionPoolsByLanguage,
};
