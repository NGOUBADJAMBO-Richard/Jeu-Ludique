export const GameState = Object.freeze({
  START: "START",
  PLAYING: "PLAYING",
  END: "END",
});

const CUSTOM_QUESTION_COUNTS = Object.freeze([10, 20, 30]);

const DIFFICULTY_CONFIG = Object.freeze({
  easy: {
    seconds: 20,
    label: { fr: "Facile", en: "Easy" },
    description: { fr: "niveau introductif", en: "intro level" },
  },
  medium: {
    seconds: 14,
    label: { fr: "Moyen", en: "Medium" },
    description: { fr: "niveau intermediaire", en: "intermediate level" },
  },
  hard: {
    seconds: 9,
    label: { fr: "Difficile", en: "Hard" },
    description: { fr: "niveau avance", en: "advanced level" },
  },
});

const I18N = {
  fr: {
    title: "Quiz Biblique & Culture Generale",
    headerTitle: "Quiz Biblique & Culture Generale",
    tagline: "Un mini-jeu rapide, clair et 100% en local.",
    languageLabel: "Langue",
    themeLabel: "Theme",
    themeLight: "Clair",
    themeDark: "Sombre",
    rulesTitle: "Regles",
    rule1: "Entrez votre nom puis cliquez sur <strong>Commencer</strong>.",
    rule2: "Vous repondez a un nombre de questions defini par la difficulte.",
    rule3: "Chaque bonne reponse vaut 1 point.",
    rule4: "Le minuteur par question est regle automatiquement par difficulte.",
    rule5: "Les questions sont melangees a chaque nouvelle partie.",
    rule6: "Le mode 2 joueurs local alterne les tours question par question.",
    rule7: "Le score et votre nom s'affichent en temps reel.",
    rule8:
      "A la fin, cliquez sur <strong>Rejouer</strong> pour une nouvelle partie sans recharger la page.",
    player1Label: "Nom joueur 1",
    player2Label: "Nom joueur 2",
    secondsPerQuestion: "Secondes par question",
    difficultyLabelSetup: "Difficulte",
    questionCountModeLabel: "Mode de questions",
    modeAuto: "Automatique (selon difficulte)",
    modeCustom: "Personnalise",
    customQuestionCountLabel: "Nombre personnalise",
    twoPlayerLabel: "Activer le mode 2 joueurs local",
    startBtn: "Commencer",
    nextBtn: "Question suivante",
    replayBtn: "Rejouer",
    livePrefix: "Participant en direct:",
    statePrefix: "Etat du jeu:",
    turnPrefix: "Tour actuel:",
    timePrefix: "Temps restant:",
    difficultyPrefix: "Difficulte:",
    scorePrefix: "Score:",
    scoreboardPrefix: "Scores joueurs:",
    questionPrefix: "Question:",
    resultTitle: "Resultat",
    noGameYet: "Aucune partie terminee pour le moment.",
    clickToStart: "Cliquez sur Commencer pour lancer la partie",
    gameFinished: "Partie terminee",
    gameInProgress: "Partie en cours...",
    timeoutFor: "Temps ecoule pour {name} !",
    finalScoreSingle: "{name}, votre score final est {score} / {total}.",
    tieText: "Egalite ! {p1} {s1} - {p2} {s2}.",
    winnerText: "{winner} gagne ({s1} - {s2}).",
    stateStart: "Debut",
    statePlaying: "En cours",
    stateEnd: "Fin",
  },
  en: {
    title: "Bible & General Knowledge Quiz",
    headerTitle: "Bible & General Knowledge Quiz",
    tagline: "A fast, clear, fully local mini-game.",
    languageLabel: "Language",
    themeLabel: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    rulesTitle: "Rules",
    rule1: "Enter your name then click <strong>Start</strong>.",
    rule2: "You answer a number of questions based on selected difficulty.",
    rule3: "Each correct answer is worth 1 point.",
    rule4: "The timer is automatically set by difficulty.",
    rule5: "Questions are shuffled every new game.",
    rule6: "Local 2-player mode alternates turns question by question.",
    rule7: "Score and participant name are shown in real time.",
    rule8:
      "At the end, click <strong>Replay</strong> to start a new game without page refresh.",
    player1Label: "Player 1 name",
    player2Label: "Player 2 name",
    secondsPerQuestion: "Seconds per question",
    difficultyLabelSetup: "Difficulty",
    questionCountModeLabel: "Question mode",
    modeAuto: "Automatic (from difficulty)",
    modeCustom: "Custom",
    customQuestionCountLabel: "Custom amount",
    twoPlayerLabel: "Enable local 2-player mode",
    startBtn: "Start",
    nextBtn: "Next question",
    replayBtn: "Replay",
    livePrefix: "Live participant:",
    statePrefix: "Game state:",
    turnPrefix: "Current turn:",
    timePrefix: "Time left:",
    difficultyPrefix: "Difficulty:",
    scorePrefix: "Score:",
    scoreboardPrefix: "Player scores:",
    questionPrefix: "Question:",
    resultTitle: "Result",
    noGameYet: "No completed game yet.",
    clickToStart: "Click Start to launch the game",
    gameFinished: "Game finished",
    gameInProgress: "Game in progress...",
    timeoutFor: "Time is up for {name}!",
    finalScoreSingle: "{name}, your final score is {score} / {total}.",
    tieText: "Draw! {p1} {s1} - {p2} {s2}.",
    winnerText: "{winner} wins ({s1} - {s2}).",
    stateStart: "Start",
    statePlaying: "Playing",
    stateEnd: "End",
  },
};

function shuffleQuestions(source) {
  const copy = [...source];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildNumericChoices(answer, deltaA, deltaB, deltaC) {
  const choices = [
    String(answer),
    String(answer + deltaA),
    String(answer + deltaB),
    String(answer + deltaC),
  ];
  const unique = new Set(choices);
  if (unique.size < 4) {
    choices[3] = String(answer + deltaC + 3);
  }

  const rotated = [...choices];
  const answerSlot = Math.abs(answer) % 4;
  [rotated[0], rotated[answerSlot]] = [rotated[answerSlot], rotated[0]];
  return {
    choices: rotated,
    answerIndex: answerSlot,
  };
}

const easyFixed = [
  {
    text: "Qui a construit l'arche selon la Bible ?",
    choices: ["Moise", "Noe", "Abraham", "Paul"],
    answerIndex: 1,
  },
  {
    text: "Combien de continents y a-t-il sur Terre ?",
    choices: ["5", "6", "7", "8"],
    answerIndex: 2,
  },
  {
    text: "Quelle est la capitale du Canada ?",
    choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answerIndex: 2,
  },
  {
    text: "Quelle couleur obtient-on en melangeant bleu et jaune ?",
    choices: ["Rouge", "Vert", "Orange", "Violet"],
    answerIndex: 1,
  },
  {
    text: "Quel gaz les plantes absorbent-elles principalement ?",
    choices: ["Oxygene", "Hydrogene", "Azote", "Dioxyde de carbone"],
    answerIndex: 3,
  },
  {
    text: "Combien y a-t-il de jours dans une semaine ?",
    choices: ["5", "6", "7", "8"],
    answerIndex: 2,
  },
  {
    text: "Quel ocean borde l'Afrique a l'ouest ?",
    choices: ["Atlantique", "Pacifique", "Indien", "Arctique"],
    answerIndex: 0,
  },
  {
    text: "Qui a recu les dix commandements ?",
    choices: ["David", "Moise", "Pierre", "Samuel"],
    answerIndex: 1,
  },
  {
    text: "Dans quelle ville Jesus est-il ne selon la Bible ?",
    choices: ["Nazareth", "Jerusalem", "Bethleem", "Jericho"],
    answerIndex: 2,
  },
  {
    text: "Quel est le plus grand animal terrestre ?",
    choices: ["Girafe", "Elephant", "Rhinoceros", "Bison"],
    answerIndex: 1,
  },
  {
    text: "Combien de minutes y a-t-il dans une heure ?",
    choices: ["45", "50", "60", "90"],
    answerIndex: 2,
  },
  {
    text: "Quel est l'instrument qui indique le nord ?",
    choices: ["Boussole", "Thermometre", "Barometre", "Compteur"],
    answerIndex: 0,
  },
  {
    text: "Qui etait connu pour sa sagesse parmi les rois bibliques ?",
    choices: ["Saul", "David", "Salomon", "Joas"],
    answerIndex: 2,
  },
  {
    text: "Quelle planete est appelee la planete rouge ?",
    choices: ["Venus", "Mars", "Jupiter", "Saturne"],
    answerIndex: 1,
  },
  {
    text: "Quel est le resultat de 10 - 4 ?",
    choices: ["4", "5", "6", "7"],
    answerIndex: 2,
  },
  {
    text: "Quel est le premier livre de la Bible ?",
    choices: ["Exode", "Genese", "Psaumes", "Matthieu"],
    answerIndex: 1,
  },
  {
    text: "Combien y a-t-il de mois dans une annee ?",
    choices: ["10", "11", "12", "13"],
    answerIndex: 2,
  },
  {
    text: "Quel est l'etat de l'eau a 0 degre C ?",
    choices: ["Liquide", "Gazeux", "Glace", "Plasma"],
    answerIndex: 2,
  },
  {
    text: "Quelle est la langue officielle principale du Bresil ?",
    choices: ["Espagnol", "Portugais", "Francais", "Anglais"],
    answerIndex: 1,
  },
  {
    text: "Combien d'animaux de chaque espece Noe prend-il dans l'arche (version simple) ?",
    choices: ["1", "2", "3", "7"],
    answerIndex: 1,
  },
];

const easyMathSeeds = [
  [2, 3],
  [4, 5],
  [6, 2],
  [7, 4],
  [8, 3],
  [9, 5],
  [10, 6],
  [12, 3],
  [11, 8],
  [5, 9],
  [13, 4],
  [14, 2],
  [15, 5],
  [16, 3],
  [17, 6],
  [18, 7],
  [19, 2],
  [20, 4],
  [21, 5],
  [22, 6],
];

const easyGenerated = easyMathSeeds.map(([a, b]) => {
  const answer = a + b;
  const numeric = buildNumericChoices(answer, 1, -1, 2);
  return {
    text: `Combien font ${a} + ${b} ?`,
    choices: numeric.choices,
    answerIndex: numeric.answerIndex,
  };
});

const mediumFixed = [
  {
    text: "Qui a ecrit la majorite des psaumes ?",
    choices: ["David", "Moise", "Esaie", "Paul"],
    answerIndex: 0,
  },
  {
    text: "Quel est le plus long fleuve du monde (souvent admis) ?",
    choices: ["Nil", "Amazone", "Yangtse", "Mississippi"],
    answerIndex: 0,
  },
  {
    text: "En quelle annee a commence la Premiere Guerre mondiale ?",
    choices: ["1912", "1914", "1916", "1918"],
    answerIndex: 1,
  },
  {
    text: "Quel apotre a renie Jesus trois fois ?",
    choices: ["Jean", "Jacques", "Pierre", "Andre"],
    answerIndex: 2,
  },
  {
    text: "Quelle est la formule chimique de l'eau ?",
    choices: ["CO2", "O2", "H2O", "NaCl"],
    answerIndex: 2,
  },
  {
    text: "Quel est le plus petit nombre premier ?",
    choices: ["0", "1", "2", "3"],
    answerIndex: 2,
  },
  {
    text: "Qui etait le pere d'Isaac ?",
    choices: ["Jacob", "Abraham", "Noe", "Joseph"],
    answerIndex: 1,
  },
  {
    text: "Quel pays a pour capitale Canberra ?",
    choices: ["Nouvelle-Zelande", "Australie", "Afrique du Sud", "Canada"],
    answerIndex: 1,
  },
  {
    text: "Combien de joueurs y a-t-il dans une equipe de football sur le terrain ?",
    choices: ["9", "10", "11", "12"],
    answerIndex: 2,
  },
  {
    text: "Quel evangeliste etait medecin selon la tradition ?",
    choices: ["Marc", "Luc", "Matthieu", "Jean"],
    answerIndex: 1,
  },
  {
    text: "Quelle mer Moise a-t-il traversee avec le peuple d'Israel ?",
    choices: ["Mer Morte", "Mer Rouge", "Mer Noire", "Mer d'Arabie"],
    answerIndex: 1,
  },
  {
    text: "Quel est le resultat de 12 x 8 ?",
    choices: ["88", "92", "96", "108"],
    answerIndex: 2,
  },
  {
    text: "Quel element a pour symbole Fe ?",
    choices: ["Fluor", "Fer", "Francium", "Fermium"],
    answerIndex: 1,
  },
  {
    text: "Combien de chapitres contient le livre de Proverbes ?",
    choices: ["21", "31", "41", "51"],
    answerIndex: 1,
  },
  {
    text: "Quelle est la capitale de l'Egypte ?",
    choices: ["Le Caire", "Alexandrie", "Rabat", "Tripoli"],
    answerIndex: 0,
  },
  {
    text: "Quel est le plus grand desert chaud du monde ?",
    choices: ["Gobi", "Kalahari", "Sahara", "Atacama"],
    answerIndex: 2,
  },
  {
    text: "Qui a ete avale par un grand poisson ?",
    choices: ["Elie", "Jonas", "Jeremie", "Amos"],
    answerIndex: 1,
  },
  {
    text: "Quelle couche de l'atmosphere contient l'ozone majoritairement ?",
    choices: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
    answerIndex: 1,
  },
  {
    text: "Quel pays est surnomme le pays du Soleil-Levant ?",
    choices: ["Coree", "Chine", "Japon", "Thailande"],
    answerIndex: 2,
  },
  {
    text: "Quel est le resultat de 9 au carre ?",
    choices: ["72", "81", "99", "108"],
    answerIndex: 1,
  },
];

const mediumCalcSeeds = [
  [14, 7],
  [18, 6],
  [24, 8],
  [27, 9],
  [32, 4],
  [36, 12],
  [45, 5],
  [49, 7],
  [54, 6],
  [63, 9],
  [72, 8],
  [81, 9],
  [90, 10],
  [56, 7],
  [64, 8],
];

const mediumGenerated = mediumCalcSeeds.map(([a, b]) => {
  const answer = a / b;
  const numeric = buildNumericChoices(answer, 1, -1, 2);
  return {
    text: `Combien font ${a} / ${b} ?`,
    choices: numeric.choices,
    answerIndex: numeric.answerIndex,
  };
});

const hardFixed = [
  {
    text: "Quel roi de Juda a trouve le livre de la loi au temple ?",
    choices: ["Ezechias", "Josias", "Roboam", "Manasse"],
    answerIndex: 1,
  },
  {
    text: "Quel est le nom de la montagne ou Moise a recu la loi ?",
    choices: ["Carmel", "Sinai", "Tabor", "Hermon"],
    answerIndex: 1,
  },
  {
    text: "Dans Actes, qui est le premier martyr chretien ?",
    choices: ["Etienne", "Barnabas", "Timothee", "Silas"],
    answerIndex: 0,
  },
  {
    text: "Quelle est l'unite SI de la force ?",
    choices: ["Pascal", "Joule", "Newton", "Watt"],
    answerIndex: 2,
  },
  {
    text: "Quel est le plus grand ocean en superficie ?",
    choices: ["Atlantique", "Indien", "Pacifique", "Arctique"],
    answerIndex: 2,
  },
  {
    text: "Qui a interprete les reves de Pharaon en Egypte ?",
    choices: ["Aaron", "Joseph", "Moise", "Daniel"],
    answerIndex: 1,
  },
  {
    text: "Combien de livres compte le Nouveau Testament ?",
    choices: ["24", "27", "29", "31"],
    answerIndex: 1,
  },
  {
    text: "Quelle est la capitale de la Mongolie ?",
    choices: ["Astana", "Bichkek", "Oulan-Bator", "Douchanbe"],
    answerIndex: 2,
  },
  {
    text: "Quelle loi de la thermodynamique introduit l'entropie ?",
    choices: ["Premiere", "Deuxieme", "Troisieme", "Aucune"],
    answerIndex: 1,
  },
  {
    text: "Dans quel livre biblique trouve-t-on la vision des ossements desseches ?",
    choices: ["Esaie", "Jeremie", "Ezechiel", "Daniel"],
    answerIndex: 2,
  },
  {
    text: "Quel est le resultat de 17 x 13 ?",
    choices: ["201", "211", "221", "231"],
    answerIndex: 2,
  },
  {
    text: "Quel pays a pour capitale Addis-Abeba ?",
    choices: ["Erythree", "Ethiopie", "Somalie", "Soudan"],
    answerIndex: 1,
  },
  {
    text: "Quel juge d'Israel etait connu pour sa force ?",
    choices: ["Gedeon", "Samson", "Debora", "Jephte"],
    answerIndex: 1,
  },
  {
    text: "Combien de lettres contient l'alphabet grec classique ?",
    choices: ["22", "23", "24", "26"],
    answerIndex: 2,
  },
  {
    text: "Quel prophete a confronte les prophetes de Baal au mont Carmel ?",
    choices: ["Elie", "Elisee", "Osee", "Amos"],
    answerIndex: 0,
  },
];

const hardGenerated = [
  { a: 11, b: 9, c: 20 },
  { a: 14, b: 7, c: 25 },
  { a: 17, b: 6, c: 28 },
  { a: 19, b: 5, c: 31 },
  { a: 23, b: 4, c: 37 },
  { a: 29, b: 3, c: 41 },
  { a: 31, b: 2, c: 43 },
  { a: 13, b: 8, c: 21 },
  { a: 16, b: 11, c: 30 },
  { a: 18, b: 9, c: 27 },
].map(({ a, b, c }) => {
  const answer = a + b - c;
  const numeric = buildNumericChoices(answer, 2, -2, 4);
  return {
    text: `Calculez ${a} + ${b} - ${c}.`,
    choices: numeric.choices,
    answerIndex: numeric.answerIndex,
  };
});

const questionPoolsFr = {
  easy: [...easyFixed, ...easyGenerated],
  medium: [...mediumFixed, ...mediumGenerated],
  hard: [...hardFixed, ...hardGenerated],
};

const easyFixedEn = [
  {
    text: "Who built the ark in the Bible?",
    choices: ["Moses", "Noah", "Abraham", "Paul"],
    answerIndex: 1,
  },
  {
    text: "How many continents are there on Earth?",
    choices: ["5", "6", "7", "8"],
    answerIndex: 2,
  },
  {
    text: "What is the capital city of Canada?",
    choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answerIndex: 2,
  },
  {
    text: "Which color do you get by mixing blue and yellow?",
    choices: ["Red", "Green", "Orange", "Purple"],
    answerIndex: 1,
  },
  {
    text: "Which gas do plants mainly absorb?",
    choices: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"],
    answerIndex: 3,
  },
  {
    text: "How many days are there in a week?",
    choices: ["5", "6", "7", "8"],
    answerIndex: 2,
  },
  {
    text: "Which ocean borders West Africa?",
    choices: ["Atlantic", "Pacific", "Indian", "Arctic"],
    answerIndex: 0,
  },
  {
    text: "Who received the Ten Commandments?",
    choices: ["David", "Moses", "Peter", "Samuel"],
    answerIndex: 1,
  },
  {
    text: "In which city was Jesus born according to the Bible?",
    choices: ["Nazareth", "Jerusalem", "Bethlehem", "Jericho"],
    answerIndex: 2,
  },
  {
    text: "What is the largest land animal?",
    choices: ["Giraffe", "Elephant", "Rhinoceros", "Bison"],
    answerIndex: 1,
  },
  {
    text: "How many minutes are in one hour?",
    choices: ["45", "50", "60", "90"],
    answerIndex: 2,
  },
  {
    text: "Which instrument points to the north?",
    choices: ["Compass", "Thermometer", "Barometer", "Counter"],
    answerIndex: 0,
  },
  {
    text: "Which biblical king was known for wisdom?",
    choices: ["Saul", "David", "Solomon", "Joash"],
    answerIndex: 2,
  },
  {
    text: "Which planet is known as the red planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    answerIndex: 1,
  },
  {
    text: "What is 10 - 4?",
    choices: ["4", "5", "6", "7"],
    answerIndex: 2,
  },
  {
    text: "What is the first book of the Bible?",
    choices: ["Exodus", "Genesis", "Psalms", "Matthew"],
    answerIndex: 1,
  },
  {
    text: "How many months are in a year?",
    choices: ["10", "11", "12", "13"],
    answerIndex: 2,
  },
  {
    text: "What is water at 0 degrees C?",
    choices: ["Liquid", "Gas", "Ice", "Plasma"],
    answerIndex: 2,
  },
  {
    text: "What is the main official language of Brazil?",
    choices: ["Spanish", "Portuguese", "French", "English"],
    answerIndex: 1,
  },
  {
    text: "How many animals of each kind did Noah take in the ark (simple version)?",
    choices: ["1", "2", "3", "7"],
    answerIndex: 1,
  },
];

const easyGeneratedEn = easyMathSeeds.map(([a, b]) => {
  const answer = a + b;
  const numeric = buildNumericChoices(answer, 1, -1, 2);
  return {
    text: `What is ${a} + ${b}?`,
    choices: numeric.choices,
    answerIndex: numeric.answerIndex,
  };
});

const mediumFixedEn = [
  {
    text: "Who wrote most of the Psalms?",
    choices: ["David", "Moses", "Isaiah", "Paul"],
    answerIndex: 0,
  },
  {
    text: "Which is often considered the longest river in the world?",
    choices: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    answerIndex: 0,
  },
  {
    text: "In which year did World War I begin?",
    choices: ["1912", "1914", "1916", "1918"],
    answerIndex: 1,
  },
  {
    text: "Which apostle denied Jesus three times?",
    choices: ["John", "James", "Peter", "Andrew"],
    answerIndex: 2,
  },
  {
    text: "What is the chemical formula of water?",
    choices: ["CO2", "O2", "H2O", "NaCl"],
    answerIndex: 2,
  },
  {
    text: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    answerIndex: 2,
  },
  {
    text: "Who was Isaac's father?",
    choices: ["Jacob", "Abraham", "Noah", "Joseph"],
    answerIndex: 1,
  },
  {
    text: "Canberra is the capital of which country?",
    choices: ["New Zealand", "Australia", "South Africa", "Canada"],
    answerIndex: 1,
  },
  {
    text: "How many players are on a soccer team on the field?",
    choices: ["9", "10", "11", "12"],
    answerIndex: 2,
  },
  {
    text: "Which gospel writer was a physician by tradition?",
    choices: ["Mark", "Luke", "Matthew", "John"],
    answerIndex: 1,
  },
  {
    text: "Which sea did Moses cross with Israel?",
    choices: ["Dead Sea", "Red Sea", "Black Sea", "Arabian Sea"],
    answerIndex: 1,
  },
  {
    text: "What is 12 x 8?",
    choices: ["88", "92", "96", "108"],
    answerIndex: 2,
  },
  {
    text: "Which element has the symbol Fe?",
    choices: ["Fluorine", "Iron", "Francium", "Fermium"],
    answerIndex: 1,
  },
  {
    text: "How many chapters are in Proverbs?",
    choices: ["21", "31", "41", "51"],
    answerIndex: 1,
  },
  {
    text: "What is the capital of Egypt?",
    choices: ["Cairo", "Alexandria", "Rabat", "Tripoli"],
    answerIndex: 0,
  },
  {
    text: "What is the largest hot desert in the world?",
    choices: ["Gobi", "Kalahari", "Sahara", "Atacama"],
    answerIndex: 2,
  },
  {
    text: "Who was swallowed by a great fish?",
    choices: ["Elijah", "Jonah", "Jeremiah", "Amos"],
    answerIndex: 1,
  },
  {
    text: "Which atmospheric layer mostly contains ozone?",
    choices: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
    answerIndex: 1,
  },
  {
    text: "Which country is called the Land of the Rising Sun?",
    choices: ["Korea", "China", "Japan", "Thailand"],
    answerIndex: 2,
  },
  {
    text: "What is 9 squared?",
    choices: ["72", "81", "99", "108"],
    answerIndex: 1,
  },
];

const mediumGeneratedEn = mediumCalcSeeds.map(([a, b]) => {
  const answer = a / b;
  const numeric = buildNumericChoices(answer, 1, -1, 2);
  return {
    text: `What is ${a} / ${b}?`,
    choices: numeric.choices,
    answerIndex: numeric.answerIndex,
  };
});

const hardFixedEn = [
  {
    text: "Which king of Judah found the book of the law in the temple?",
    choices: ["Hezekiah", "Josiah", "Rehoboam", "Manasseh"],
    answerIndex: 1,
  },
  {
    text: "What is the mountain where Moses received the law?",
    choices: ["Carmel", "Sinai", "Tabor", "Hermon"],
    answerIndex: 1,
  },
  {
    text: "In Acts, who is the first Christian martyr?",
    choices: ["Stephen", "Barnabas", "Timothy", "Silas"],
    answerIndex: 0,
  },
  {
    text: "What is the SI unit of force?",
    choices: ["Pascal", "Joule", "Newton", "Watt"],
    answerIndex: 2,
  },
  {
    text: "Which is the largest ocean by surface area?",
    choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answerIndex: 2,
  },
  {
    text: "Who interpreted Pharaoh's dreams in Egypt?",
    choices: ["Aaron", "Joseph", "Moses", "Daniel"],
    answerIndex: 1,
  },
  {
    text: "How many books are in the New Testament?",
    choices: ["24", "27", "29", "31"],
    answerIndex: 1,
  },
  {
    text: "What is the capital of Mongolia?",
    choices: ["Astana", "Bishkek", "Ulaanbaatar", "Dushanbe"],
    answerIndex: 2,
  },
  {
    text: "Which law of thermodynamics introduces entropy?",
    choices: ["First", "Second", "Third", "None"],
    answerIndex: 1,
  },
  {
    text: "In which biblical book is the vision of dry bones found?",
    choices: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
    answerIndex: 2,
  },
  {
    text: "What is 17 x 13?",
    choices: ["201", "211", "221", "231"],
    answerIndex: 2,
  },
  {
    text: "Addis Ababa is the capital of which country?",
    choices: ["Eritrea", "Ethiopia", "Somalia", "Sudan"],
    answerIndex: 1,
  },
  {
    text: "Which judge of Israel was known for strength?",
    choices: ["Gideon", "Samson", "Deborah", "Jephthah"],
    answerIndex: 1,
  },
  {
    text: "How many letters are in the classical Greek alphabet?",
    choices: ["22", "23", "24", "26"],
    answerIndex: 2,
  },
  {
    text: "Which prophet challenged the prophets of Baal on Mount Carmel?",
    choices: ["Elijah", "Elisha", "Hosea", "Amos"],
    answerIndex: 0,
  },
];

const hardGeneratedEn = [
  { a: 11, b: 9, c: 20 },
  { a: 14, b: 7, c: 25 },
  { a: 17, b: 6, c: 28 },
  { a: 19, b: 5, c: 31 },
  { a: 23, b: 4, c: 37 },
  { a: 29, b: 3, c: 41 },
  { a: 31, b: 2, c: 43 },
  { a: 13, b: 8, c: 21 },
  { a: 16, b: 11, c: 30 },
  { a: 18, b: 9, c: 27 },
].map(({ a, b, c }) => {
  const answer = a + b - c;
  const numeric = buildNumericChoices(answer, 2, -2, 4);
  return {
    text: `Compute ${a} + ${b} - ${c}.`,
    choices: numeric.choices,
    answerIndex: numeric.answerIndex,
  };
});

const questionPoolsEn = {
  easy: [...easyFixedEn, ...easyGeneratedEn],
  medium: [...mediumFixedEn, ...mediumGeneratedEn],
  hard: [...hardFixedEn, ...hardGeneratedEn],
};

const questionPoolsByLanguage = {
  fr: questionPoolsFr,
  en: questionPoolsEn,
};

const totalQuestionsFr =
  questionPoolsFr.easy.length +
  questionPoolsFr.medium.length +
  questionPoolsFr.hard.length;

const totalQuestionsEn =
  questionPoolsEn.easy.length +
  questionPoolsEn.medium.length +
  questionPoolsEn.hard.length;

if (totalQuestionsFr !== 100 || totalQuestionsEn !== 100) {
  throw new Error(
    `Le total de questions doit etre 100 en FR et EN. Recu: FR=${totalQuestionsFr}, EN=${totalQuestionsEn}`,
  );
}

export {
  CUSTOM_QUESTION_COUNTS,
  DIFFICULTY_CONFIG,
  I18N,
  buildNumericChoices,
  questionPoolsByLanguage,
  shuffleQuestions,
  totalQuestionsEn,
  totalQuestionsFr,
};
