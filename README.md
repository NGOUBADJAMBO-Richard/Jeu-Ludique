# Mini-Jeu-Web

Mini-jeu de quiz (Bible + culture generale) realise en HTML/CSS/JavaScript natif, sans framework.
Le jeu fonctionne 100% en local dans le navigateur.

## Apercu

- Quiz bilingue: francais et anglais.
- Themes clair/sombre avec preference sauvegardee.
- Mode 1 joueur et mode 2 joueurs local (alternance des tours).
- Difficulte configurable (easy/medium/hard) avec temps par question adapte.
- Questions melangees a chaque partie.
- Option de nombre de questions automatique (selon pool) ou personnalise (10/20/30).

## Fonctionnalites principales

- Gestion d'etat de partie: START -> PLAYING -> END.
- Minuteur par question avec gestion du timeout.
- Calcul de score en temps reel (score global + scoreboard 2 joueurs).
- Interface reactive sans rechargement de page.
- Donnees de quiz integrees au projet (pas d'API distante).

## Stack technique

- HTML5
- CSS3
- JavaScript ES Modules (.mjs)
- Tests smoke via Node.js (module assert)

## Structure du projet

```text
Mini-jeu web/
|- index.html
|- css/
|  |- style.css
|- js/
|  |- game.js
|  |- game-dom.mjs
|  |- game-engine.mjs
|  |- game-renderer.mjs
|  |- game-state.mjs
|  |- quiz-data.mjs
|- tests/
|  |- smoke.mjs
|  |- run-smoke.ps1
|- assets/
|  |- site.webmanifest
```

## Lancer le jeu en local

1. Ouvrir le dossier du projet dans VS Code.
2. Lancer un serveur statique (ex: extension Five Server ou Live Server).
3. Ouvrir `index.html` dans le navigateur via ce serveur.

Note: le jeu est en modules ES. Evite d'ouvrir le fichier en double-clic `file://` pour prevenir les soucis de chargement de modules selon la configuration du navigateur.

## Lancer les tests smoke

Prerequis: Node.js installe.

Depuis la racine du projet:

```powershell
node tests/smoke.mjs
```

Ou avec le script PowerShell fourni:

```powershell
./tests/run-smoke.ps1
```

Les tests verifient notamment:

- la presence et la coherence des pools de questions (100 FR + 100 EN),
- les fonctions utilitaires de normalisation,
- les regles de temps,
- les transitions d'etat autorisees,
- le rendu des textes de fin de partie.

## Logique de difficulte

- easy: 20s/question
- medium: 14s/question
- hard: 9s/question

En mode automatique, le nombre de questions suit la taille du pool de difficulte.
En mode personnalise, la valeur est limitee au pool disponible.

## Roadmap (suggestions)

- Ajouter un ecran de statistiques (precision, temps moyen de reponse).
- Ajouter un mode "best-of" multi-manches.
- Ajouter une persistence locale des meilleurs scores.
