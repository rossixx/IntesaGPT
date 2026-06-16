/* ===================================== */
/* TIMER.JS */
/* ===================================== */

const DEFAULT_TIME = 60;

let timerInterval = null;

let timeLeft = DEFAULT_TIME;

let timerPaused = false;

/* ===================================== */
/* DOM */
/* ===================================== */

const timerValue =
    document.getElementById(
        "timerValue"
    );

/* ===================================== */
/* START */
/* ===================================== */

function startTimer() {

    stopTimer();

    timeLeft =
        DEFAULT_TIME;

    timerPaused =
        false;

    updateTimerDisplay();

    timerInterval =
        setInterval(
            tick,
            1000
        );

}

/* ===================================== */
/* TICK */
/* ===================================== */

function tick() {

    if (
        timerPaused
    ) {

        return;

    }

    timeLeft--;

    updateTimerDisplay();

    if (
        timeLeft <= 0
    ) {

        handleTimeout();

    }

}

/* ===================================== */
/* TIMEOUT */
/* ===================================== */

function handleTimeout() {

    stopTimer();

    let winner =
        "Partita Terminata";

    if (
        typeof getWinnerName ===
        "function"
    ) {

        winner =
            getWinnerName();

    }

    if (
        typeof endGame ===
        "function"
    ) {

        endGame(
            winner
        );

    }

}

/* ===================================== */
/* UPDATE UI */
/* ===================================== */

function updateTimerDisplay() {

    if (
        !timerValue
    ) {

        return;

    }

    timerValue.textContent =
        timeLeft;

    timerValue.classList.remove(
        "timer-warning",
        "timer-danger"
    );

    if (
        timeLeft <= 20 &&
        timeLeft > 10
    ) {

        timerValue.classList.add(
            "timer-warning"
        );

    }

    if (
        timeLeft <= 10
    ) {

        timerValue.classList.add(
            "timer-danger"
        );

    }

}

/* ===================================== */
/* PAUSE */
/* ===================================== */

function pauseTimer() {

    timerPaused =
        true;

}

/* ===================================== */
/* RESUME */
/* ===================================== */

function resumeTimer() {

    timerPaused =
        false;

}

/* ===================================== */
/* STOP */
/* ===================================== */

function stopTimer() {

    if (
        timerInterval
    ) {

        clearInterval(
            timerInterval
        );

        timerInterval =
            null;

    }

}

/* ===================================== */
/* RESET */
/* ===================================== */

function resetTimer() {

    stopTimer();

    timeLeft =
        DEFAULT_TIME;

    updateTimerDisplay();

}

/* ===================================== */
/* GETTERS */
/* ===================================== */

function getTimeLeft() {

    return timeLeft;

}
