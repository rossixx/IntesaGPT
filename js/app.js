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
/* INPUTS */
/* ===================================== */

const team1Input =
    document.getElementById(
        "team1Input"
    );

const team2Input =
    document.getElementById(
        "team2Input"
    );

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

    bindEvents();

    showScreen(
        menuScreen
    );

}

/* ===================================== */
/* EVENTS */
/* ===================================== */

function bindEvents() {

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

    if (menuScreen)
        menuScreen.classList.add(
            "hidden"
        );

    if (setupScreen)
        setupScreen.classList.add(
            "hidden"
        );

    if (gameScreen)
        gameScreen.classList.add(
            "hidden"
        );

    if (winnerScreen)
        winnerScreen.classList.add(
            "hidden"
        );

    if (target)
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
        team1Input
            ? team1Input.value.trim()
            : "";

    let team2 =
        team2Input
            ? team2Input.value.trim()
            : "";

    if (!team1)
        team1 =
            "Squadra 1";

    if (!team2)
        team2 =
            "Squadra 2";

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

    if (
        winnerName
    ) {

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

        stopTimer();

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
