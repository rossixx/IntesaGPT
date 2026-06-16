/* ===================================== */
/* APP.JS */
/* ===================================== */

const menuScreen =
    document.getElementById(
        "menuScreen"
    );

const setupScreen =
    document.getElementById(
        "setupScreen"
    );

const gameScreen =
    document.getElementById(
        "gameScreen"
    );

const winnerScreen =
    document.getElementById(
        "winnerScreen"
    );

/* ===================================== */
/* BUTTONS */
/* ===================================== */

const singleBtn =
    document.getElementById(
        "singleBtn"
    );

const multiBtn =
    document.getElementById(
        "multiBtn"
    );

const startMatchBtn =
    document.getElementById(
        "startMatchBtn"
    );

const backToMenuBtn =
    document.getElementById(
        "backToMenuBtn"
    );

const playAgainBtn =
    document.getElementById(
        "playAgainBtn"
    );

/* ===================================== */
/* MULTIPLAYER INPUTS */
/* ===================================== */

const team1Input =
    document.getElementById(
        "team1Input"
    );

const team2Input =
    document.getElementById(
        "team2Input"
    );

/* ===================================== */
/* WINNER */
/* ===================================== */

const winnerName =
    document.getElementById(
        "winnerName"
    );

/* ===================================== */
/* INIT */
/* ===================================== */

document.addEventListener(
    "DOMContentLoaded",
    initApp
);

function initApp() {

    bindAppEvents();

    showScreen(
        menuScreen
    );

}

/* ===================================== */
/* EVENTS */
/* ===================================== */

function bindAppEvents() {

    if (singleBtn) {

        singleBtn.addEventListener(
            "click",
            startSinglePlayer
        );

    }

    if (multiBtn) {

        multiBtn.addEventListener(
            "click",
            openMultiplayerSetup
        );

    }

    if (startMatchBtn) {

        startMatchBtn.addEventListener(
            "click",
            startMultiplayerGame
        );

    }

    if (backToMenuBtn) {

        backToMenuBtn.addEventListener(
            "click",
            backToMenu
        );

    }

    if (playAgainBtn) {

        playAgainBtn.addEventListener(
            "click",
            playAgain
        );

    }

}

/* ===================================== */
/* SCREENS */
/* ===================================== */

function showScreen(target) {

    menuScreen.classList.add(
        "hidden"
    );

    setupScreen.classList.add(
        "hidden"
    );

    gameScreen.classList.add(
        "hidden"
    );

    winnerScreen.classList.add(
        "hidden"
    );

    target.classList.remove(
        "hidden"
    );

}

/* ===================================== */
/* FULLSCREEN */
/* ===================================== */

function enterFullscreen() {

    const el =
        document.documentElement;

    if (
        el.requestFullscreen
    ) {

        el.requestFullscreen();

    }

}

/* ===================================== */
/* SINGLEPLAYER */
/* ===================================== */

function startSinglePlayer() {

    if (
        typeof setMultiplayer ===
        "function"
    ) {

        setMultiplayer(
            false
        );

    }

    if (
        typeof resetScores ===
        "function"
    ) {

        resetScores();

    }

    if (
        typeof resetGameData ===
        "function"
    ) {

        resetGameData();

    }

    showScreen(
        gameScreen
    );

    enterFullscreen();

    if (
        typeof startTimer ===
        "function"
    ) {

        startTimer();

    }

    if (
        typeof newWord ===
        "function"
    ) {

        newWord();

    }

}

/* ===================================== */
/* MULTIPLAYER */
/* ===================================== */

function openMultiplayerSetup() {

    showScreen(
        setupScreen
    );

}

function startMultiplayerGame() {

    let team1 =
        team1Input.value.trim();

    let team2 =
        team2Input.value.trim();

    if (team1 === "") {

        team1 =
            "Squadra 1";

    }

    if (team2 === "") {

        team2 =
            "Squadra 2";

    }

    if (
        typeof setMultiplayer ===
        "function"
    ) {

        setMultiplayer(
            true
        );

    }

    if (
        typeof setTeamNames ===
        "function"
    ) {

        setTeamNames(
            team1,
            team2
        );

    }

    if (
        typeof resetScores ===
        "function"
    ) {

        resetScores();

    }

    if (
        typeof resetTeams ===
        "function"
    ) {

        resetTeams();

    }

    if (
        typeof resetGameData ===
        "function"
    ) {

        resetGameData();

    }

    showScreen(
        gameScreen
    );

    enterFullscreen();

    if (
        typeof startTimer ===
        "function"
    ) {

        startTimer();

    }

    if (
        typeof newWord ===
        "function"
    ) {

        newWord();

    }

}

/* ===================================== */
/* MENU */
/* ===================================== */

function backToMenu() {

    if (
        typeof stopTimer ===
        "function"
    ) {

        stopTimer();

    }

    showScreen(
        menuScreen
    );

}

/* ===================================== */
/* GAME OVER */
/* ===================================== */

function endGame(winner) {

    if (
        typeof stopTimer ===
        "function"
    ) {

        stopTimer();

    }

    if (winnerName) {

        winnerName.textContent =
            winner;

    }

    showScreen(
        winnerScreen
    );

}

/* ===================================== */
/* PLAY AGAIN */
/* ===================================== */

function playAgain() {

    if (
        typeof stopTimer ===
        "function"
    ) {

        stopTimer();<!DOCTYPE html>
<html lang="it">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Intesa Vincente</title>

    <link
        rel="stylesheet"
        href="css/style.css">

    <link
        rel="stylesheet"
        href="css/game.css">

    <link
        rel="stylesheet"
        href="css/animations.css">

</head>

<body>

    <!-- MENU -->

    <section
        id="menuScreen"
        class="screen">

        <h1 class="game-title">

            INTESA VINCENTE

        </h1>

        <div class="menu-buttons">

            <button
                id="singleBtn"
                class="main-button">

                GIOCA DA SOLO

            </button>

            <button
                id="multiBtn"
                class="main-button">

                MULTIPLAYER

            </button>

        </div>

    </section>

    <!-- SETUP MULTIPLAYER -->

    <section
        id="setupScreen"
        class="screen hidden">

        <h2>

            NOMI SQUADRE

        </h2>

        <input
            id="team1Input"
            type="text"
            placeholder="Squadra 1">

        <input
            id="team2Input"
            type="text"
            placeholder="Squadra 2">

        <div class="setup-buttons">

            <button
                id="startMatchBtn"
                class="main-button">

                INIZIA PARTITA

            </button>

            <button
                id="backToMenuBtn"
                class="main-button">

                INDIETRO

            </button>

        </div>

    </section>

    <!-- PARTITA -->

    <section
        id="gameScreen"
        class="screen hidden">

        <!-- VS BAR -->

        <div id="matchBanner">

            <span id="bannerTeam1">

                Squadra 1

            </span>

            <span id="bannerScore1">

                0

            </span>

            <span class="vs-text">

                VS

            </span>

            <span id="bannerScore2">

                0

            </span>

            <span id="bannerTeam2">

                Squadra 2

            </span>

        </div>

        <!-- TURNO -->

        <div id="activeTeamContainer">

            Turno:

            <span id="activeTeamLabel">

                Squadra 1

            </span>

        </div>

        <!-- TIMER -->

        <div id="timerContainer">

            <div id="timerValue">

                60

            </div>

        </div>

        <!-- PAROLE LATERALI -->

        <div id="leftWord"></div>

        <div id="rightWord"></div>

        <!-- PAROLA CENTRALE -->

        <div id="wordDisplay">

            PREMI NUOVA

        </div>

        <!-- PANNELLI SQUADRE -->

        <div id="scorePanels">

            <div
                id="team1Panel"
                class="team-panel active-team">

                <div
                    id="team1Name">

                    Squadra 1

                </div>

                <div
                    id="team1Score">

                    0

                </div>

            </div>

            <div
                id="team2Panel"
                class="team-panel">

                <div
                    id="team2Name">

                    Squadra 2

                </div>

                <div
                    id="team2Score">

                    0

                </div>

            </div>

        </div>

        <!-- CONTROLLI -->

        <div class="controls">

            <button
                id="newWordBtn"
                class="control-button">

                🎲 NUOVA

            </button>

            <button
                id="toggleDoubleBtn"
                class="control-button">

                🔁 RADDOPPIA

            </button>

            <button
                id="respondBtn"
                class="control-button">

                🛑 RISPONDI

            </button>

            <button
                id="correctBtn"
                class="control-button">

                ✅ GIUSTA

            </button>

            <button
                id="wrongBtn"
                class="control-button">

                ❌ SBAGLIATA

            </button>

            <button
                id="passBtn"
                class="control-button">

                ⏭ PASSO

            </button>

            <button
                id="switchTeamBtn"
                class="control-button">

                🔄 CAMBIA TURNO

            </button>

        </div>

        <!-- STORICO -->

        <div id="historyContainer">

            <h3>

                STORICO

            </h3>

            <ul id="historyList">

            </ul>

        </div>

    </section>

    <!-- VINCITORE -->

    <section
        id="winnerScreen"
        class="screen hidden">

        <h2>

            VINCITORE

        </h2>

        <h1 id="winnerName">

        </h1>

        <div class="winner-buttons">

            <button
                id="playAgainBtn"
                class="main-button">

                NUOVA PARTITA

            </button>

        </div>

    </section>

    <!-- SCRIPTS -->

    <script src="data/words.js"></script>

    <script src="data/phrases.js"></script>

    <script src="js/storage.js"></script>

    <script src="js/timer.js"></script>

    <script src="js/multiplayer.js"></script>

    <script src="js/scoreboard.js"></script>

    <script src="js/game.js"></script>

    <script src="js/app.js"></script>

</body>

</html>

    }

    if (
        typeof resetScores ===
        "function"
    ) {

        resetScores();

    }

    if (
        typeof resetTeams ===
        "function"
    ) {

        resetTeams();

    }

    if (
        typeof resetGameData ===
        "function"
    ) {

        resetGameData();

    }

    showScreen(
        menuScreen
    );

}
