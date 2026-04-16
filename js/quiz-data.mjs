export const GameState = Object.freeze({
  START: "START",
  PLAYING: "PLAYING",
  END: "END",
});

const CUSTOM_QUESTION_COUNTS = Object.freeze([10, 20, 30]);

const THEME_OPTIONS = Object.freeze([
  "all",
  "geography",
  "history",
  "science",
  "arts",
  "sports",
  "bible",
  "technology",
  "civics",
]);

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
    title: "Quiz Culture Generale",
    headerTitle: "Quiz Culture Generale",
    tagline: "1000 questions aleatoires, sans calcul, 100% local.",
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
    questionThemeLabel: "Theme des questions",
    themeAll: "Tous",
    themeGeography: "Geographie",
    themeHistory: "Histoire",
    themeScience: "Sciences",
    themeArts: "Arts et litterature",
    themeSports: "Sports",
    themeBible: "Bible",
    themeTechnology: "Technologie",
    themeCivics: "Institutions et citoyennete",
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
    title: "General Knowledge Quiz",
    headerTitle: "General Knowledge Quiz",
    tagline: "1000 random no-math questions, fully local.",
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
    questionThemeLabel: "Question theme",
    themeAll: "All",
    themeGeography: "Geography",
    themeHistory: "History",
    themeScience: "Science",
    themeArts: "Arts and literature",
    themeSports: "Sports",
    themeBible: "Bible",
    themeTechnology: "Technology",
    themeCivics: "Civics and institutions",
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

const CONTINENT_LABELS = {
  fr: {
    africa: "Afrique",
    europe: "Europe",
    asia: "Asie",
    northAmerica: "Amerique du Nord",
    southAmerica: "Amerique du Sud",
    oceania: "Oceanie",
  },
  en: {
    africa: "Africa",
    europe: "Europe",
    asia: "Asia",
    northAmerica: "North America",
    southAmerica: "South America",
    oceania: "Oceania",
  },
};

const COUNTRY_FACTS = [
  { fr: "Algerie", en: "Algeria", capital: "Alger", continent: "africa" },
  { fr: "Allemagne", en: "Germany", capital: "Berlin", continent: "europe" },
  { fr: "Angola", en: "Angola", capital: "Luanda", continent: "africa" },
  {
    fr: "Argentine",
    en: "Argentina",
    capital: "Buenos Aires",
    continent: "southAmerica",
  },
  {
    fr: "Australie",
    en: "Australia",
    capital: "Canberra",
    continent: "oceania",
  },
  { fr: "Autriche", en: "Austria", capital: "Vienna", continent: "europe" },
  { fr: "Belgique", en: "Belgium", capital: "Brussels", continent: "europe" },
  { fr: "Benin", en: "Benin", capital: "Porto-Novo", continent: "africa" },
  { fr: "Bolivie", en: "Bolivia", capital: "Sucre", continent: "southAmerica" },
  {
    fr: "Bresil",
    en: "Brazil",
    capital: "Brasilia",
    continent: "southAmerica",
  },
  { fr: "Bulgarie", en: "Bulgaria", capital: "Sofia", continent: "europe" },
  {
    fr: "Burkina Faso",
    en: "Burkina Faso",
    capital: "Ouagadougou",
    continent: "africa",
  },
  { fr: "Burundi", en: "Burundi", capital: "Gitega", continent: "africa" },
  { fr: "Cameroun", en: "Cameroon", capital: "Yaounde", continent: "africa" },
  { fr: "Canada", en: "Canada", capital: "Ottawa", continent: "northAmerica" },
  { fr: "Chili", en: "Chile", capital: "Santiago", continent: "southAmerica" },
  { fr: "Chine", en: "China", capital: "Beijing", continent: "asia" },
  {
    fr: "Colombie",
    en: "Colombia",
    capital: "Bogota",
    continent: "southAmerica",
  },
  {
    fr: "Coree du Sud",
    en: "South Korea",
    capital: "Seoul",
    continent: "asia",
  },
  {
    fr: "Costa Rica",
    en: "Costa Rica",
    capital: "San Jose",
    continent: "northAmerica",
  },
  {
    fr: "Cote d'Ivoire",
    en: "Ivory Coast",
    capital: "Yamoussoukro",
    continent: "africa",
  },
  { fr: "Croatie", en: "Croatia", capital: "Zagreb", continent: "europe" },
  { fr: "Cuba", en: "Cuba", capital: "Havana", continent: "northAmerica" },
  { fr: "Danemark", en: "Denmark", capital: "Copenhagen", continent: "europe" },
  { fr: "Egypte", en: "Egypt", capital: "Cairo", continent: "africa" },
  {
    fr: "Emirats arabes unis",
    en: "United Arab Emirates",
    capital: "Abu Dhabi",
    continent: "asia",
  },
  {
    fr: "Equateur",
    en: "Ecuador",
    capital: "Quito",
    continent: "southAmerica",
  },
  { fr: "Espagne", en: "Spain", capital: "Madrid", continent: "europe" },
  { fr: "Estonie", en: "Estonia", capital: "Tallinn", continent: "europe" },
  {
    fr: "Etats-Unis",
    en: "United States",
    capital: "Washington, D.C.",
    continent: "northAmerica",
  },
  {
    fr: "Ethiopie",
    en: "Ethiopia",
    capital: "Addis Ababa",
    continent: "africa",
  },
  { fr: "Finlande", en: "Finland", capital: "Helsinki", continent: "europe" },
  { fr: "France", en: "France", capital: "Paris", continent: "europe" },
  { fr: "Gabon", en: "Gabon", capital: "Libreville", continent: "africa" },
  { fr: "Ghana", en: "Ghana", capital: "Accra", continent: "africa" },
  { fr: "Grece", en: "Greece", capital: "Athens", continent: "europe" },
  {
    fr: "Guatemala",
    en: "Guatemala",
    capital: "Guatemala City",
    continent: "northAmerica",
  },
  { fr: "Guinee", en: "Guinea", capital: "Conakry", continent: "africa" },
  {
    fr: "Haiti",
    en: "Haiti",
    capital: "Port-au-Prince",
    continent: "northAmerica",
  },
  { fr: "Hongrie", en: "Hungary", capital: "Budapest", continent: "europe" },
  { fr: "Inde", en: "India", capital: "New Delhi", continent: "asia" },
  { fr: "Indonesie", en: "Indonesia", capital: "Jakarta", continent: "asia" },
  { fr: "Irak", en: "Iraq", capital: "Baghdad", continent: "asia" },
  { fr: "Irlande", en: "Ireland", capital: "Dublin", continent: "europe" },
  { fr: "Islande", en: "Iceland", capital: "Reykjavik", continent: "europe" },
  { fr: "Israel", en: "Israel", capital: "Jerusalem", continent: "asia" },
  { fr: "Italie", en: "Italy", capital: "Rome", continent: "europe" },
  { fr: "Japon", en: "Japan", capital: "Tokyo", continent: "asia" },
  { fr: "Jordanie", en: "Jordan", capital: "Amman", continent: "asia" },
  { fr: "Kenya", en: "Kenya", capital: "Nairobi", continent: "africa" },
  { fr: "Laos", en: "Laos", capital: "Vientiane", continent: "asia" },
  { fr: "Lettonie", en: "Latvia", capital: "Riga", continent: "europe" },
  { fr: "Liban", en: "Lebanon", capital: "Beirut", continent: "asia" },
  { fr: "Liberia", en: "Liberia", capital: "Monrovia", continent: "africa" },
  { fr: "Libye", en: "Libya", capital: "Tripoli", continent: "africa" },
  { fr: "Lituanie", en: "Lithuania", capital: "Vilnius", continent: "europe" },
  {
    fr: "Madagascar",
    en: "Madagascar",
    capital: "Antananarivo",
    continent: "africa",
  },
  {
    fr: "Malaisie",
    en: "Malaysia",
    capital: "Kuala Lumpur",
    continent: "asia",
  },
  { fr: "Mali", en: "Mali", capital: "Bamako", continent: "africa" },
  { fr: "Maroc", en: "Morocco", capital: "Rabat", continent: "africa" },
  {
    fr: "Mexique",
    en: "Mexico",
    capital: "Mexico City",
    continent: "northAmerica",
  },
  {
    fr: "Mozambique",
    en: "Mozambique",
    capital: "Maputo",
    continent: "africa",
  },
  { fr: "Namibie", en: "Namibia", capital: "Windhoek", continent: "africa" },
  { fr: "Nepal", en: "Nepal", capital: "Kathmandu", continent: "asia" },
  { fr: "Niger", en: "Niger", capital: "Niamey", continent: "africa" },
  { fr: "Nigeria", en: "Nigeria", capital: "Abuja", continent: "africa" },
  { fr: "Norvege", en: "Norway", capital: "Oslo", continent: "europe" },
  {
    fr: "Nouvelle-Zelande",
    en: "New Zealand",
    capital: "Wellington",
    continent: "oceania",
  },
  { fr: "Ouganda", en: "Uganda", capital: "Kampala", continent: "africa" },
  { fr: "Pakistan", en: "Pakistan", capital: "Islamabad", continent: "asia" },
  {
    fr: "Panama",
    en: "Panama",
    capital: "Panama City",
    continent: "northAmerica",
  },
  {
    fr: "Paraguay",
    en: "Paraguay",
    capital: "Asuncion",
    continent: "southAmerica",
  },
  {
    fr: "Pays-Bas",
    en: "Netherlands",
    capital: "Amsterdam",
    continent: "europe",
  },
  { fr: "Perou", en: "Peru", capital: "Lima", continent: "southAmerica" },
  {
    fr: "Philippines",
    en: "Philippines",
    capital: "Manila",
    continent: "asia",
  },
  { fr: "Pologne", en: "Poland", capital: "Warsaw", continent: "europe" },
  { fr: "Portugal", en: "Portugal", capital: "Lisbon", continent: "europe" },
  { fr: "Qatar", en: "Qatar", capital: "Doha", continent: "asia" },
  { fr: "Roumanie", en: "Romania", capital: "Bucharest", continent: "europe" },
  {
    fr: "Royaume-Uni",
    en: "United Kingdom",
    capital: "London",
    continent: "europe",
  },
  { fr: "Russie", en: "Russia", capital: "Moscow", continent: "europe" },
  { fr: "Rwanda", en: "Rwanda", capital: "Kigali", continent: "africa" },
  { fr: "Senegal", en: "Senegal", capital: "Dakar", continent: "africa" },
  { fr: "Serbie", en: "Serbia", capital: "Belgrade", continent: "europe" },
  { fr: "Singapour", en: "Singapore", capital: "Singapore", continent: "asia" },
  {
    fr: "Slovaquie",
    en: "Slovakia",
    capital: "Bratislava",
    continent: "europe",
  },
  { fr: "Slovenie", en: "Slovenia", capital: "Ljubljana", continent: "europe" },
  { fr: "Soudan", en: "Sudan", capital: "Khartoum", continent: "africa" },
  {
    fr: "Sri Lanka",
    en: "Sri Lanka",
    capital: "Sri Jayawardenepura Kotte",
    continent: "asia",
  },
  { fr: "Suede", en: "Sweden", capital: "Stockholm", continent: "europe" },
  { fr: "Suisse", en: "Switzerland", capital: "Bern", continent: "europe" },
  { fr: "Tanzanie", en: "Tanzania", capital: "Dodoma", continent: "africa" },
  {
    fr: "Tchequie",
    en: "Czech Republic",
    capital: "Prague",
    continent: "europe",
  },
  { fr: "Thailande", en: "Thailand", capital: "Bangkok", continent: "asia" },
  { fr: "Tunisie", en: "Tunisia", capital: "Tunis", continent: "africa" },
  { fr: "Turquie", en: "Turkey", capital: "Ankara", continent: "asia" },
  { fr: "Ukraine", en: "Ukraine", capital: "Kyiv", continent: "europe" },
  {
    fr: "Uruguay",
    en: "Uruguay",
    capital: "Montevideo",
    continent: "southAmerica",
  },
  {
    fr: "Venezuela",
    en: "Venezuela",
    capital: "Caracas",
    continent: "southAmerica",
  },
  { fr: "Vietnam", en: "Vietnam", capital: "Hanoi", continent: "asia" },
];

const HISTORY_FACTS = [
  {
    prompt: {
      fr: "Debut de la Premiere Guerre mondiale",
      en: "Start of World War I",
    },
    answer: { fr: "1914", en: "1914" },
  },
  {
    prompt: {
      fr: "Fin de la Premiere Guerre mondiale",
      en: "End of World War I",
    },
    answer: { fr: "1918", en: "1918" },
  },
  {
    prompt: {
      fr: "Debut de la Seconde Guerre mondiale",
      en: "Start of World War II",
    },
    answer: { fr: "1939", en: "1939" },
  },
  {
    prompt: {
      fr: "Fin de la Seconde Guerre mondiale",
      en: "End of World War II",
    },
    answer: { fr: "1945", en: "1945" },
  },
  {
    prompt: { fr: "Prise de la Bastille", en: "Storming of the Bastille" },
    answer: { fr: "1789", en: "1789" },
  },
  {
    prompt: {
      fr: "Independance des Etats-Unis",
      en: "US Declaration of Independence",
    },
    answer: { fr: "1776", en: "1776" },
  },
  {
    prompt: { fr: "Tombee du mur de Berlin", en: "Fall of the Berlin Wall" },
    answer: { fr: "1989", en: "1989" },
  },
  {
    prompt: {
      fr: "Arrivee de Christophe Colomb en Amerique",
      en: "Columbus reaches the Americas",
    },
    answer: { fr: "1492", en: "1492" },
  },
  {
    prompt: {
      fr: "Couronnement de Charlemagne",
      en: "Coronation of Charlemagne",
    },
    answer: { fr: "800", en: "800" },
  },
  {
    prompt: { fr: "Creation de l'ONU", en: "Founding of the United Nations" },
    answer: { fr: "1945", en: "1945" },
  },
  {
    prompt: { fr: "Traite de Versailles", en: "Treaty of Versailles" },
    answer: { fr: "1919", en: "1919" },
  },
  {
    prompt: { fr: "Revolution russe", en: "Russian Revolution" },
    answer: { fr: "1917", en: "1917" },
  },
  {
    prompt: { fr: "Signature de la Magna Carta", en: "Signing of Magna Carta" },
    answer: { fr: "1215", en: "1215" },
  },
  {
    prompt: {
      fr: "Arrivee au pouvoir de Napoleon comme empereur",
      en: "Napoleon becomes emperor",
    },
    answer: { fr: "1804", en: "1804" },
  },
  {
    prompt: {
      fr: "Premier pas sur la Lune",
      en: "First human step on the Moon",
    },
    answer: { fr: "1969", en: "1969" },
  },
  {
    prompt: {
      fr: "Debut de la guerre de Cent Ans",
      en: "Start of the Hundred Years' War",
    },
    answer: { fr: "1337", en: "1337" },
  },
  {
    prompt: {
      fr: "Fin de la guerre de Cent Ans",
      en: "End of the Hundred Years' War",
    },
    answer: { fr: "1453", en: "1453" },
  },
  {
    prompt: {
      fr: "Invention de l'imprimerie par Gutenberg",
      en: "Gutenberg printing press",
    },
    answer: { fr: "vers 1450", en: "around 1450" },
  },
  {
    prompt: {
      fr: "Creation de l'Union europeenne (Maastricht)",
      en: "European Union creation (Maastricht)",
    },
    answer: { fr: "1993", en: "1993" },
  },
  {
    prompt: {
      fr: "Abolition de l'esclavage en France (Deuxieme Republique)",
      en: "Abolition of slavery in France (Second Republic)",
    },
    answer: { fr: "1848", en: "1848" },
  },
];

const SCIENCE_FACTS = [
  {
    prompt: {
      fr: "Planete la plus proche du Soleil",
      en: "Planet closest to the Sun",
    },
    answer: { fr: "Mercure", en: "Mercury" },
  },
  {
    prompt: { fr: "Planete rouge", en: "Red planet" },
    answer: { fr: "Mars", en: "Mars" },
  },
  {
    prompt: {
      fr: "Formule chimique de l'eau",
      en: "Chemical formula of water",
    },
    answer: { fr: "H2O", en: "H2O" },
  },
  {
    prompt: {
      fr: "Gaz essentiel a la respiration humaine",
      en: "Gas essential for human breathing",
    },
    answer: { fr: "Oxygene", en: "Oxygen" },
  },
  {
    prompt: { fr: "Symbole chimique du fer", en: "Chemical symbol of iron" },
    answer: { fr: "Fe", en: "Fe" },
  },
  {
    prompt: { fr: "Symbole chimique de l'or", en: "Chemical symbol of gold" },
    answer: { fr: "Au", en: "Au" },
  },
  {
    prompt: {
      fr: "Plus grand organe du corps humain",
      en: "Largest organ of the human body",
    },
    answer: { fr: "La peau", en: "Skin" },
  },
  {
    prompt: { fr: "Organe qui pompe le sang", en: "Organ that pumps blood" },
    answer: { fr: "Le coeur", en: "Heart" },
  },
  {
    prompt: {
      fr: "Partie de la plante qui fait la photosynthese",
      en: "Plant part responsible for photosynthesis",
    },
    answer: { fr: "La feuille", en: "Leaf" },
  },
  {
    prompt: {
      fr: "Etat de l'eau a 100 degres C",
      en: "State of water at 100 degrees C",
    },
    answer: { fr: "Gazeux", en: "Gas" },
  },
  {
    prompt: { fr: "Unite SI de la force", en: "SI unit of force" },
    answer: { fr: "Newton", en: "Newton" },
  },
  {
    prompt: { fr: "Unite SI de l'energie", en: "SI unit of energy" },
    answer: { fr: "Joule", en: "Joule" },
  },
  {
    prompt: {
      fr: "Centre du systeme solaire",
      en: "Center of the solar system",
    },
    answer: { fr: "Le Soleil", en: "The Sun" },
  },
  {
    prompt: {
      fr: "Planete geante gazeuse avec anneaux celebres",
      en: "Gas giant famous for its rings",
    },
    answer: { fr: "Saturne", en: "Saturn" },
  },
  {
    prompt: {
      fr: "Science qui etudie les roches",
      en: "Science studying rocks",
    },
    answer: { fr: "Geologie", en: "Geology" },
  },
  {
    prompt: {
      fr: "Science qui etudie les etres vivants",
      en: "Science studying living organisms",
    },
    answer: { fr: "Biologie", en: "Biology" },
  },
  {
    prompt: {
      fr: "Science qui etudie les etoiles",
      en: "Science studying stars",
    },
    answer: { fr: "Astronomie", en: "Astronomy" },
  },
  {
    prompt: {
      fr: "Molecule qui porte l'information genetique",
      en: "Molecule carrying genetic information",
    },
    answer: { fr: "ADN", en: "DNA" },
  },
  {
    prompt: {
      fr: "Nombre de planetes dans le systeme solaire",
      en: "Number of planets in the solar system",
    },
    answer: { fr: "8", en: "8" },
  },
  {
    prompt: {
      fr: "Metal liquide a temperature ambiante",
      en: "Metal liquid at room temperature",
    },
    answer: { fr: "Mercure", en: "Mercury" },
  },
];

const ARTS_FACTS = [
  {
    prompt: { fr: "Auteur de Les Miserables", en: "Author of Les Miserables" },
    answer: { fr: "Victor Hugo", en: "Victor Hugo" },
  },
  {
    prompt: { fr: "Peintre de La Joconde", en: "Painter of Mona Lisa" },
    answer: { fr: "Leonard de Vinci", en: "Leonardo da Vinci" },
  },
  {
    prompt: {
      fr: "Compositeur de la 9e symphonie",
      en: "Composer of the 9th Symphony",
    },
    answer: { fr: "Beethoven", en: "Beethoven" },
  },
  {
    prompt: {
      fr: "Auteur de Roméo et Juliette",
      en: "Author of Romeo and Juliet",
    },
    answer: { fr: "Shakespeare", en: "Shakespeare" },
  },
  {
    prompt: { fr: "Mouvement de Picasso", en: "Art movement of Picasso" },
    answer: { fr: "Cubisme", en: "Cubism" },
  },
  {
    prompt: { fr: "Auteur de L'Odysee", en: "Author of The Odyssey" },
    answer: { fr: "Homere", en: "Homer" },
  },
  {
    prompt: {
      fr: "Auteure de Orgueil et Prejuges",
      en: "Author of Pride and Prejudice",
    },
    answer: { fr: "Jane Austen", en: "Jane Austen" },
  },
  {
    prompt: {
      fr: "Compositeur de La Flute enchantee",
      en: "Composer of The Magic Flute",
    },
    answer: { fr: "Mozart", en: "Mozart" },
  },
  {
    prompt: { fr: "Auteur de Don Quichotte", en: "Author of Don Quixote" },
    answer: { fr: "Cervantes", en: "Cervantes" },
  },
  {
    prompt: {
      fr: "Peintre de La Nuit etoilee",
      en: "Painter of The Starry Night",
    },
    answer: { fr: "Van Gogh", en: "Van Gogh" },
  },
  {
    prompt: { fr: "Auteure de Harry Potter", en: "Author of Harry Potter" },
    answer: { fr: "J.K. Rowling", en: "J.K. Rowling" },
  },
  {
    prompt: {
      fr: "Auteur de Le Petit Prince",
      en: "Author of The Little Prince",
    },
    answer: { fr: "Antoine de Saint-Exupery", en: "Antoine de Saint-Exupery" },
  },
  {
    prompt: { fr: "Auteure de Frankenstein", en: "Author of Frankenstein" },
    answer: { fr: "Mary Shelley", en: "Mary Shelley" },
  },
  {
    prompt: { fr: "Peintre de Guernica", en: "Painter of Guernica" },
    answer: { fr: "Picasso", en: "Picasso" },
  },
  {
    prompt: {
      fr: "Auteure de Le Comte de Monte-Cristo",
      en: "Author of The Count of Monte Cristo",
    },
    answer: { fr: "Alexandre Dumas", en: "Alexandre Dumas" },
  },
  {
    prompt: { fr: "Auteur de L'Etranger", en: "Author of The Stranger" },
    answer: { fr: "Albert Camus", en: "Albert Camus" },
  },
  {
    prompt: {
      fr: "Mouvement artistique de Monet",
      en: "Art movement of Monet",
    },
    answer: { fr: "Impressionnisme", en: "Impressionism" },
  },
  {
    prompt: { fr: "Auteure de Madame Bovary", en: "Author of Madame Bovary" },
    answer: { fr: "Gustave Flaubert", en: "Gustave Flaubert" },
  },
  {
    prompt: {
      fr: "Auteur de La Divine Comedie",
      en: "Author of The Divine Comedy",
    },
    answer: { fr: "Dante", en: "Dante" },
  },
  {
    prompt: {
      fr: "Compositeur des Quatre Saisons",
      en: "Composer of The Four Seasons",
    },
    answer: { fr: "Vivaldi", en: "Vivaldi" },
  },
];

const SPORTS_FACTS = [
  {
    prompt: { fr: "Sport pratique en NBA", en: "Sport played in the NBA" },
    answer: { fr: "Basketball", en: "Basketball" },
  },
  {
    prompt: {
      fr: "Pays d'origine du judo",
      en: "Country where judo originated",
    },
    answer: { fr: "Japon", en: "Japan" },
  },
  {
    prompt: {
      fr: "Nombre de joueurs sur le terrain en football",
      en: "Players on the field per soccer team",
    },
    answer: { fr: "11", en: "11" },
  },
  {
    prompt: {
      fr: "Tournoi majeur sur gazon au Royaume-Uni",
      en: "Major grass tennis tournament in the UK",
    },
    answer: { fr: "Wimbledon", en: "Wimbledon" },
  },
  {
    prompt: {
      fr: "Sport de Tour de France",
      en: "Sport of the Tour de France",
    },
    answer: { fr: "Cyclisme", en: "Cycling" },
  },
  {
    prompt: {
      fr: "Pays de la Coupe du monde 2010",
      en: "Host country of the 2010 World Cup",
    },
    answer: { fr: "Afrique du Sud", en: "South Africa" },
  },
  {
    prompt: {
      fr: "Sport de Serena Williams",
      en: "Sport played by Serena Williams",
    },
    answer: { fr: "Tennis", en: "Tennis" },
  },
  {
    prompt: {
      fr: "Sport des All Blacks",
      en: "Sport played by the All Blacks",
    },
    answer: { fr: "Rugby", en: "Rugby" },
  },
  {
    prompt: {
      fr: "Distance officielle du marathon",
      en: "Official marathon distance",
    },
    answer: { fr: "42,195 km", en: "42.195 km" },
  },
  {
    prompt: {
      fr: "Sport de Michael Phelps",
      en: "Sport played by Michael Phelps",
    },
    answer: { fr: "Natation", en: "Swimming" },
  },
  {
    prompt: {
      fr: "Competition entre clubs europeens de football",
      en: "Top European club football competition",
    },
    answer: { fr: "Ligue des champions", en: "Champions League" },
  },
  {
    prompt: { fr: "Sport de la Formule 1", en: "Sport of Formula 1" },
    answer: { fr: "Sport automobile", en: "Motorsport" },
  },
  {
    prompt: {
      fr: "Pays d'origine du taekwondo",
      en: "Country where taekwondo originated",
    },
    answer: { fr: "Coree du Sud", en: "South Korea" },
  },
  {
    prompt: { fr: "Sport du biathlon", en: "Main mixed skills in biathlon" },
    answer: {
      fr: "Ski de fond et tir",
      en: "Cross-country skiing and shooting",
    },
  },
  {
    prompt: { fr: "Sport de Rafael Nadal", en: "Sport played by Rafael Nadal" },
    answer: { fr: "Tennis", en: "Tennis" },
  },
  {
    prompt: {
      fr: "Pays d'origine du cricket moderne",
      en: "Country where modern cricket originated",
    },
    answer: { fr: "Royaume-Uni", en: "United Kingdom" },
  },
  {
    prompt: {
      fr: "Sport avec un ring et des rounds",
      en: "Sport with a ring and rounds",
    },
    answer: { fr: "Boxe", en: "Boxing" },
  },
  {
    prompt: {
      fr: "Sport ou l'on utilise un shuttlecock",
      en: "Sport that uses a shuttlecock",
    },
    answer: { fr: "Badminton", en: "Badminton" },
  },
  {
    prompt: {
      fr: "Sport principal des Jeux olympiques d'hiver en descente",
      en: "Winter Olympic downhill sport",
    },
    answer: { fr: "Ski alpin", en: "Alpine skiing" },
  },
  {
    prompt: {
      fr: "Sport collectif avec six joueurs et un filet",
      en: "Team sport with six players and a net",
    },
    answer: { fr: "Volleyball", en: "Volleyball" },
  },
];

const BIBLE_FACTS = [
  {
    prompt: { fr: "Constructeur de l'arche", en: "Builder of the ark" },
    answer: { fr: "Noe", en: "Noah" },
  },
  {
    prompt: { fr: "Leader de l'Exode", en: "Leader of the Exodus" },
    answer: { fr: "Moise", en: "Moses" },
  },
  {
    prompt: { fr: "Roi connu pour sa sagesse", en: "King known for wisdom" },
    answer: { fr: "Salomon", en: "Solomon" },
  },
  {
    prompt: { fr: "Ville de naissance de Jesus", en: "Birth city of Jesus" },
    answer: { fr: "Bethleem", en: "Bethlehem" },
  },
  {
    prompt: { fr: "Pere d'Isaac", en: "Father of Isaac" },
    answer: { fr: "Abraham", en: "Abraham" },
  },
  {
    prompt: {
      fr: "Prophete avale par un grand poisson",
      en: "Prophet swallowed by a great fish",
    },
    answer: { fr: "Jonas", en: "Jonah" },
  },
  {
    prompt: {
      fr: "Disciple qui a renie Jesus trois fois",
      en: "Disciple who denied Jesus three times",
    },
    answer: { fr: "Pierre", en: "Peter" },
  },
  {
    prompt: { fr: "Premier livre de la Bible", en: "First book of the Bible" },
    answer: { fr: "Genese", en: "Genesis" },
  },
  {
    prompt: {
      fr: "Dernier livre du Nouveau Testament",
      en: "Last book of the New Testament",
    },
    answer: { fr: "Apocalypse", en: "Revelation" },
  },
  {
    prompt: { fr: "Frere de Moise", en: "Brother of Moses" },
    answer: { fr: "Aaron", en: "Aaron" },
  },
  {
    prompt: {
      fr: "Lieu ou Moise recoit la loi",
      en: "Place where Moses receives the law",
    },
    answer: { fr: "Mont Sinai", en: "Mount Sinai" },
  },
  {
    prompt: { fr: "Premier roi d'Israel", en: "First king of Israel" },
    answer: { fr: "Saul", en: "Saul" },
  },
  {
    prompt: { fr: "Geant vaincu par David", en: "Giant defeated by David" },
    answer: { fr: "Goliath", en: "Goliath" },
  },
  {
    prompt: { fr: "Mere de Samuel", en: "Mother of Samuel" },
    answer: { fr: "Anne", en: "Hannah" },
  },
  {
    prompt: {
      fr: "Ville des murailles tombees avec Josue",
      en: "City whose walls fell with Joshua",
    },
    answer: { fr: "Jericho", en: "Jericho" },
  },
  {
    prompt: { fr: "Juge connu pour sa force", en: "Judge known for strength" },
    answer: { fr: "Samson", en: "Samson" },
  },
  {
    prompt: {
      fr: "Nom de l'apotre Paul avant sa conversion",
      en: "Apostle Paul's name before conversion",
    },
    answer: { fr: "Saul de Tarse", en: "Saul of Tarsus" },
  },
  {
    prompt: {
      fr: "Roi qui a compose de nombreux psaumes",
      en: "King who composed many psalms",
    },
    answer: { fr: "David", en: "David" },
  },
  {
    prompt: {
      fr: "Discipline du sermon sur la montagne",
      en: "Main speaker of the Sermon on the Mount",
    },
    answer: { fr: "Jesus", en: "Jesus" },
  },
  {
    prompt: {
      fr: "Apotre surnomme le disciple bien-aime",
      en: "Apostle called the beloved disciple",
    },
    answer: { fr: "Jean", en: "John" },
  },
];

const TECHNOLOGY_FACTS = [
  {
    prompt: { fr: "Entreprise derriere Windows", en: "Company behind Windows" },
    answer: { fr: "Microsoft", en: "Microsoft" },
  },
  {
    prompt: { fr: "Entreprise derriere iPhone", en: "Company behind iPhone" },
    answer: { fr: "Apple", en: "Apple" },
  },
  {
    prompt: {
      fr: "Createur du World Wide Web",
      en: "Inventor of the World Wide Web",
    },
    answer: { fr: "Tim Berners-Lee", en: "Tim Berners-Lee" },
  },
  {
    prompt: {
      fr: "Langage principal du web cote style",
      en: "Main web styling language",
    },
    answer: { fr: "CSS", en: "CSS" },
  },
  {
    prompt: {
      fr: "Langage principal du web cote structure",
      en: "Main web structure language",
    },
    answer: { fr: "HTML", en: "HTML" },
  },
  {
    prompt: {
      fr: "Langage courant du web cote interaction",
      en: "Common web interaction language",
    },
    answer: { fr: "JavaScript", en: "JavaScript" },
  },
  {
    prompt: {
      fr: "Entreprise de recherche avec Android",
      en: "Search company behind Android",
    },
    answer: { fr: "Google", en: "Google" },
  },
  {
    prompt: {
      fr: "Systeme de controle de version le plus utilise",
      en: "Most used version control system",
    },
    answer: { fr: "Git", en: "Git" },
  },
  {
    prompt: {
      fr: "Plateforme d'hebergement de depots Git tres connue",
      en: "Famous Git repository hosting platform",
    },
    answer: { fr: "GitHub", en: "GitHub" },
  },
  {
    prompt: {
      fr: "Type de stockage persistant dans le navigateur",
      en: "Persistent storage in the browser",
    },
    answer: { fr: "localStorage", en: "localStorage" },
  },
  {
    prompt: {
      fr: "Protocole principal des pages web",
      en: "Main protocol for web pages",
    },
    answer: { fr: "HTTPS", en: "HTTPS" },
  },
  {
    prompt: {
      fr: "Extension des modules JavaScript modernes",
      en: "Extension of modern JavaScript modules",
    },
    answer: { fr: ".mjs", en: ".mjs" },
  },
  {
    prompt: {
      fr: "Moteur de base de donnees relationnelle populaire",
      en: "Popular relational database engine",
    },
    answer: { fr: "PostgreSQL", en: "PostgreSQL" },
  },
  {
    prompt: {
      fr: "Format standard d'echange de donnees leger",
      en: "Lightweight standard data exchange format",
    },
    answer: { fr: "JSON", en: "JSON" },
  },
  {
    prompt: {
      fr: "Outil de mise en conteneurisation celebre",
      en: "Well-known containerization tool",
    },
    answer: { fr: "Docker", en: "Docker" },
  },
  {
    prompt: {
      fr: "Systeme d'exploitation libre base sur Unix",
      en: "Free Unix-like operating system",
    },
    answer: { fr: "Linux", en: "Linux" },
  },
  {
    prompt: {
      fr: "Langage principalement utilise pour l'IA scientifique",
      en: "Language widely used in scientific AI",
    },
    answer: { fr: "Python", en: "Python" },
  },
  {
    prompt: {
      fr: "Methode HTTP pour lire une ressource",
      en: "HTTP method to read a resource",
    },
    answer: { fr: "GET", en: "GET" },
  },
  {
    prompt: {
      fr: "Methode HTTP pour creer une ressource",
      en: "HTTP method to create a resource",
    },
    answer: { fr: "POST", en: "POST" },
  },
  {
    prompt: {
      fr: "Type de composant qui cache les donnees temporaires",
      en: "Component type that caches temporary data",
    },
    answer: { fr: "Cache", en: "Cache" },
  },
];

const CIVICS_FACTS = [
  {
    prompt: {
      fr: "Institution qui vote les lois en France",
      en: "Institution that votes laws in France",
    },
    answer: { fr: "Parlement", en: "Parliament" },
  },
  {
    prompt: {
      fr: "Chef de l'Etat en regime presidentiel",
      en: "Head of state in a presidential system",
    },
    answer: { fr: "President", en: "President" },
  },
  {
    prompt: {
      fr: "Texte fondateur des droits fondamentaux en France (1789)",
      en: "Foundational French rights text (1789)",
    },
    answer: {
      fr: "Declaration des droits de l'homme et du citoyen",
      en: "Declaration of the Rights of Man and of the Citizen",
    },
  },
  {
    prompt: {
      fr: "Organisation chargee de la paix et de la cooperation internationale",
      en: "Organization for international peace and cooperation",
    },
    answer: { fr: "ONU", en: "UN" },
  },
  {
    prompt: {
      fr: "Institution judiciaire supreme en France pour l'ordre administratif",
      en: "Top French administrative court",
    },
    answer: { fr: "Conseil d'Etat", en: "Council of State" },
  },
  {
    prompt: {
      fr: "Ville siege principal de l'Union europeenne",
      en: "Main seat city of the European Union",
    },
    answer: { fr: "Bruxelles", en: "Brussels" },
  },
  {
    prompt: {
      fr: "Monnaie officielle de la zone euro",
      en: "Official currency of the euro area",
    },
    answer: { fr: "Euro", en: "Euro" },
  },
  {
    prompt: {
      fr: "Droit de choisir ses representants",
      en: "Right to choose representatives",
    },
    answer: { fr: "Droit de vote", en: "Right to vote" },
  },
  {
    prompt: {
      fr: "Organisation responsable de la sante mondiale",
      en: "Organization responsible for global health",
    },
    answer: { fr: "OMS", en: "WHO" },
  },
  {
    prompt: {
      fr: "Principale mission de la justice",
      en: "Main mission of justice",
    },
    answer: { fr: "Appliquer la loi", en: "Apply the law" },
  },
  {
    prompt: {
      fr: "Nom de l'assemblee basse du Parlement francais",
      en: "Name of the lower house of French Parliament",
    },
    answer: { fr: "Assemblee nationale", en: "National Assembly" },
  },
  {
    prompt: {
      fr: "Nom de l'assemblee haute du Parlement francais",
      en: "Name of the upper house of French Parliament",
    },
    answer: { fr: "Senat", en: "Senate" },
  },
  {
    prompt: {
      fr: "Mode de gouvernement fonde sur la souverainete du peuple",
      en: "System based on popular sovereignty",
    },
    answer: { fr: "Democratie", en: "Democracy" },
  },
  {
    prompt: {
      fr: "Ressource prelevee pour financer les services publics",
      en: "Levy used to finance public services",
    },
    answer: { fr: "Impot", en: "Tax" },
  },
  {
    prompt: {
      fr: "Institution qui emet l'euro",
      en: "Institution issuing the euro",
    },
    answer: { fr: "Banque centrale europeenne", en: "European Central Bank" },
  },
  {
    prompt: {
      fr: "Texte qui organise les pouvoirs d'un Etat",
      en: "Text organizing powers of a state",
    },
    answer: { fr: "Constitution", en: "Constitution" },
  },
  {
    prompt: {
      fr: "Action de saisir un tribunal",
      en: "Action of bringing a case before a court",
    },
    answer: { fr: "Recours", en: "Appeal" },
  },
  {
    prompt: {
      fr: "Instance internationale de justice de l'ONU",
      en: "UN international judicial body",
    },
    answer: {
      fr: "Cour internationale de Justice",
      en: "International Court of Justice",
    },
  },
  {
    prompt: {
      fr: "Principe de separation entre religions et Etat en France",
      en: "Principle separating religions and state in France",
    },
    answer: { fr: "Laicite", en: "Secularism" },
  },
  {
    prompt: {
      fr: "Acte par lequel une loi est officiellement validee",
      en: "Act by which a law is officially validated",
    },
    answer: { fr: "Promulgation", en: "Promulgation" },
  },
];

const NON_GEO_THEME_FACTS = {
  history: HISTORY_FACTS,
  science: SCIENCE_FACTS,
  arts: ARTS_FACTS,
  sports: SPORTS_FACTS,
  bible: BIBLE_FACTS,
  technology: TECHNOLOGY_FACTS,
  civics: CIVICS_FACTS,
};

const THEME_LABELS = {
  fr: {
    history: "Histoire",
    science: "Sciences",
    arts: "Arts et litterature",
    sports: "Sports",
    bible: "Bible",
    technology: "Technologie",
    civics: "Institutions et citoyennete",
  },
  en: {
    history: "History",
    science: "Science",
    arts: "Arts and literature",
    sports: "Sports",
    bible: "Bible",
    technology: "Technology",
    civics: "Civics and institutions",
  },
};

function getThemeLabel(lang, theme) {
  return THEME_LABELS[lang]?.[theme] || theme;
}

function pickDistinctIndices(size, current, seedBase, count) {
  const picked = [];
  let cursor = seedBase % size;

  while (picked.length < count) {
    cursor = (cursor + 7) % size;
    if (cursor === current || picked.includes(cursor)) {
      continue;
    }
    picked.push(cursor);
  }

  return picked;
}

function rotateChoices(choices, answerIndexSeed) {
  const answerIndex = answerIndexSeed % 4;
  const rotated = [...choices];
  [rotated[0], rotated[answerIndex]] = [rotated[answerIndex], rotated[0]];
  return { choices: rotated, answerIndex };
}

function buildBasicChoices({
  correct,
  pool,
  currentIndex,
  seedBase,
  answerIndexSeed,
}) {
  const wrongIndices = pickDistinctIndices(
    pool.length,
    currentIndex,
    seedBase,
    3,
  );
  const wrong = wrongIndices.map((index) => pool[index]);
  return rotateChoices([correct, ...wrong], answerIndexSeed);
}

function buildPairChoices({
  prompt,
  answer,
  facts,
  currentIndex,
  lang,
  answerIndexSeed,
}) {
  const right = `${prompt} -> ${answer}`;

  const wrongIndices = pickDistinctIndices(
    facts.length,
    currentIndex,
    currentIndex + 19,
    3,
  );
  const wrong = wrongIndices.map((index) => {
    const wrongFact = facts[index];
    return `${wrongFact.prompt[lang]} -> ${answer}`;
  });

  return rotateChoices([right, ...wrong], answerIndexSeed);
}

function buildPromptAnswerStatementChoices({
  prompt,
  answer,
  facts,
  currentIndex,
  lang,
  answerIndexSeed,
}) {
  const wrongIndices = pickDistinctIndices(
    facts.length,
    currentIndex,
    currentIndex + 31,
    3,
  );
  const wrong = wrongIndices.map(
    (index) => `${prompt} -> ${facts[index].answer[lang]}`,
  );

  return rotateChoices([`${prompt} -> ${answer}`, ...wrong], answerIndexSeed);
}

function buildCountryCapitalPairChoices({ facts, currentIndex, lang, answerIndexSeed }) {
  const country = lang === "fr" ? facts[currentIndex].fr : facts[currentIndex].en;
  const right = `${country} - ${facts[currentIndex].capital}`;

  const wrongIndices = pickDistinctIndices(
    facts.length,
    currentIndex,
    currentIndex + 37,
    3,
  );
  const wrong = wrongIndices.map((index) => `${country} - ${facts[index].capital}`);

  return rotateChoices([right, ...wrong], answerIndexSeed);
}

function buildGeographyQuestions(lang) {
  const isFr = lang === "fr";
  const countries = COUNTRY_FACTS.map((item) => (isFr ? item.fr : item.en));
  const capitals = COUNTRY_FACTS.map((item) => item.capital);

  const easy = [];
  const medium = [];
  const hard = [];

  COUNTRY_FACTS.forEach((fact, index) => {
    const country = isFr ? fact.fr : fact.en;
    const capitalChoices = buildBasicChoices({
      correct: fact.capital,
      pool: capitals,
      currentIndex: index,
      seedBase: index + 3,
      answerIndexSeed: index,
    });

    const countryChoices = buildBasicChoices({
      correct: country,
      pool: countries,
      currentIndex: index,
      seedBase: index + 11,
      answerIndexSeed: index + 1,
    });

    const pairChoices = buildCountryCapitalPairChoices({
      facts: COUNTRY_FACTS,
      currentIndex: index,
      lang,
      answerIndexSeed: index + 2,
    });

    easy.push({
      theme: "geography",
      text: isFr
        ? `Quelle est la capitale de ${country} ?`
        : `What is the capital of ${country}?`,
      choices: capitalChoices.choices,
      answerIndex: capitalChoices.answerIndex,
    });

    medium.push({
      theme: "geography",
      text: isFr
        ? `${fact.capital} est la capitale de quel pays ?`
        : `${fact.capital} is the capital of which country?`,
      choices: countryChoices.choices,
      answerIndex: countryChoices.answerIndex,
    });

    hard.push({
      theme: "geography",
      text: isFr
        ? `Quelle association pays-capitale est correcte pour ${country} ?`
        : `Which country-capital association is correct for ${country}?`,
      choices: pairChoices.choices,
      answerIndex: pairChoices.answerIndex,
    });
  });

  return { easy, medium, hard };
}

function buildThemeQuestions(theme, facts, lang) {
  const isFr = lang === "fr";
  const themeLabel = getThemeLabel(lang, theme);
  const easy = [];
  const medium = [];
  const hard = [];

  const prompts = facts.map((fact) => fact.prompt[lang]);
  const answers = facts.map((fact) => fact.answer[lang]);

  facts.forEach((fact, index) => {
    const prompt = fact.prompt[lang];
    const answer = fact.answer[lang];

    const answerChoicesA = buildBasicChoices({
      correct: answer,
      pool: answers,
      currentIndex: index,
      seedBase: index + 5,
      answerIndexSeed: index,
    });

    const answerChoicesB = buildBasicChoices({
      correct: answer,
      pool: answers,
      currentIndex: index,
      seedBase: index + 13,
      answerIndexSeed: index + 1,
    });

    const promptChoices = buildBasicChoices({
      correct: prompt,
      pool: prompts,
      currentIndex: index,
      seedBase: index + 21,
      answerIndexSeed: index + 2,
    });

    const pairChoices = buildPairChoices({
      prompt,
      answer,
      facts,
      currentIndex: index,
      lang,
      answerIndexSeed: index + 3,
    });

    const statementChoices = buildPromptAnswerStatementChoices({
      prompt,
      answer,
      facts,
      currentIndex: index,
      lang,
      answerIndexSeed: index + 4,
    });

    const easyTemplatesFr = [
      `Theme ${themeLabel} - ${prompt} :`,
      `${themeLabel} - question de base: ${prompt}`,
      `Repere essentiel (${themeLabel}) - ${prompt}`,
      `${prompt} (niveau introductif ${themeLabel})`,
    ];
    const easyTemplatesEn = [
      `${themeLabel} theme - ${prompt}:`,
      `${themeLabel} - core question: ${prompt}`,
      `Key reference (${themeLabel}) - ${prompt}`,
      `${prompt} (${themeLabel} intro level)`,
    ];

    easy.push({
      theme,
      text: isFr
        ? easyTemplatesFr[index % easyTemplatesFr.length]
        : easyTemplatesEn[index % easyTemplatesEn.length],
      choices: answerChoicesA.choices,
      answerIndex: answerChoicesA.answerIndex,
    });

    easy.push({
      theme,
      text: isFr
        ? `Choisissez la bonne reponse (${themeLabel}) pour: ${prompt}`
        : `Choose the correct answer for: ${prompt}`,
      choices: answerChoicesB.choices,
      answerIndex: answerChoicesB.answerIndex,
    });

    medium.push({
      theme,
      text: isFr
        ? `Quel enonce de ${themeLabel} correspond a la reponse ${answer} ?`
        : `Which prompt matches the answer ${answer}?`,
      choices: promptChoices.choices,
      answerIndex: promptChoices.answerIndex,
    });

    medium.push({
      theme,
      text: isFr
        ? `Dans ${themeLabel}, quelle association est correcte ?`
        : `Which association is correct?`,
      choices: pairChoices.choices,
      answerIndex: pairChoices.answerIndex,
    });

    hard.push({
      theme,
      text: isFr
        ? `Niveau avance ${themeLabel}: associez precisement cet enonce -> ${prompt}`
        : `Advanced ${themeLabel}: accurately match this statement -> ${prompt}`,
      choices: statementChoices.choices,
      answerIndex: statementChoices.answerIndex,
    });
  });

  return { easy, medium, hard };
}

function buildQuestionPoolsForLanguage(lang) {
  const geography = buildGeographyQuestions(lang);

  const nonGeoPools = Object.entries(NON_GEO_THEME_FACTS).map(
    ([theme, facts]) => buildThemeQuestions(theme, facts, lang),
  );

  const easy = [...geography.easy];
  const medium = [...geography.medium];
  const hard = [...geography.hard];

  nonGeoPools.forEach((pool) => {
    easy.push(...pool.easy);
    medium.push(...pool.medium);
    hard.push(...pool.hard);
  });

  return { easy, medium, hard };
}

const questionPoolsFr = buildQuestionPoolsForLanguage("fr");
const questionPoolsEn = buildQuestionPoolsForLanguage("en");

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

if (totalQuestionsFr !== 1000 || totalQuestionsEn !== 1000) {
  throw new Error(
    `Le total de questions doit etre 1000 en FR et EN. Recu: FR=${totalQuestionsFr}, EN=${totalQuestionsEn}`,
  );
}

export {
  CUSTOM_QUESTION_COUNTS,
  DIFFICULTY_CONFIG,
  I18N,
  THEME_OPTIONS,
  questionPoolsByLanguage,
  shuffleQuestions,
  totalQuestionsEn,
  totalQuestionsFr,
};
