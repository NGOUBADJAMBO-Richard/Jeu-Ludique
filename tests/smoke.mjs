import assert from "node:assert/strict";

import {
  THEME_OPTIONS,
  GameState,
  questionPoolsByLanguage,
  totalQuestionsEn,
  totalQuestionsFr,
} from "../js/quiz-data.mjs";
import {
  assertStateTransition,
  clampTime,
  getEndResultText,
  getPlannedQuestionCount,
  getQuestionsForDifficulty,
  getSelectedTheme,
  normalizeName,
  normalizeSecondName,
  t,
} from "../js/game-engine.mjs";
import { createInitialState } from "../js/game-state.mjs";

function runSmokeTests() {
  const state = createInitialState();

  assert.equal(totalQuestionsFr, 1000, "FR question count should be 1000");
  assert.equal(totalQuestionsEn, 1000, "EN question count should be 1000");
  assert.ok(
    questionPoolsByLanguage.fr.easy.length > 0,
    "FR easy pool should exist",
  );
  assert.ok(
    questionPoolsByLanguage.en.hard.length > 0,
    "EN hard pool should exist",
  );
  assert.ok(THEME_OPTIONS.includes("history"), "History theme should exist");
  assert.ok(THEME_OPTIONS.includes("civics"), "Civics theme should exist");

  assert.equal(normalizeName("  "), "Invité");
  assert.equal(normalizeName("  Ruth  "), "Ruth");
  assert.equal(normalizeSecondName(" "), "Joueur 2");
  assert.equal(normalizeSecondName("  Daniel  "), "Daniel");

  assert.equal(clampTime(NaN), 15);
  assert.equal(clampTime(2), 5);
  assert.equal(clampTime(77), 60);
  assert.equal(clampTime(14.9), 14);

  state.questionCountMode = "auto";
  state.difficultyLevel = "easy";
  state.questionTheme = "all";
  assert.equal(
    getPlannedQuestionCount(state),
    questionPoolsByLanguage.fr.easy.length,
    "Auto question mode should use full pool",
  );

  state.questionTheme = "science";
  const sciencePool = getQuestionsForDifficulty(state, "easy");
  assert.ok(sciencePool.length > 0, "Science theme pool should be non-empty");
  assert.ok(
    sciencePool.every((question) => question.theme === "science"),
    "Theme filtering should keep only selected theme",
  );

  assert.equal(getSelectedTheme("history"), "history");
  assert.equal(getSelectedTheme("unknown"), "all");

  state.questionCountMode = "custom";
  state.customQuestionCount = 30;
  assert.equal(
    getPlannedQuestionCount(state),
    30,
    "Custom question count should apply",
  );

  state.language = "fr";
  assert.equal(t(state, "stateStart"), "Debut");
  state.language = "en";
  assert.equal(t(state, "stateStart"), "Start");

  state.language = "fr";
  state.twoPlayerMode = false;
  state.playerName = "Ruth";
  state.score = 8;
  state.shuffledQuestions = new Array(10).fill(null);
  assert.equal(
    getEndResultText(state),
    "Ruth, votre score final est 8 / 10.",
    "Single player final text should match",
  );

  state.twoPlayerMode = true;
  state.players = ["Ruth", "Daniel"];
  state.scores = [6, 6];
  assert.equal(getEndResultText(state), "Egalite ! Ruth 6 - Daniel 6.");

  state.scores = [7, 5];
  assert.equal(getEndResultText(state), "Ruth gagne (7 - 5).");

  assert.doesNotThrow(() =>
    assertStateTransition(GameState.START, GameState.PLAYING),
  );
  assert.throws(() => assertStateTransition(GameState.START, GameState.END));

  console.log("Smoke tests passed.");
}

runSmokeTests();
