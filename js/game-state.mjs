import { GameState } from "./quiz-data.mjs";

export function createInitialState() {
  return {
    gameState: GameState.START,
    playerName: "Invité",
    playerTwoName: "Joueur 2",
    twoPlayerMode: false,
    players: ["Invité"],
    activePlayerIndex: 0,
    scores: [0, 0],
    score: 0,
    currentQuestionIndex: 0,
    answeredCurrentQuestion: false,
    timePerQuestion: 15,
    difficultyLevel: "easy",
    questionCountMode: "auto",
    customQuestionCount: 10,
    plannedQuestionCount: 0,
    language: "fr",
    theme: "light",
    currentTimeLeft: 0,
    timerId: null,
    shuffledQuestions: [],
  };
}
