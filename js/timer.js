/* ===================================== */
/* TIMER.JS - Versione Completa e Corretta */
/* ===================================== */

// Variabili globali interne
const DEFAULT_TIME = 60;
let timerInterval = null;
let timeLeft = 60;
let timerPaused = true;
let timerValue = null;

// Assicuriamoci che il DOM sia pronto prima di cercare l'elemento
document.addEventListener("DOMContentLoaded", () => {
    timerValue = document.getElementById("timerValue");
    console.log("Timer.js: Inizializzazione completata. Elemento trovato:", !!timerValue);
});

/* ===================================== */
/* LOGICA INTERNA */
/* ===================================== */

function tick() {
    if (timerPaused) return;

    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
        handleTimeout();
    }
}

function handleTimeout() {
    stopTimer();
    // Verifica se esistono funzioni globali per finire il gioco
    if (typeof endGame === "function") {
        let winner = (typeof getWinnerName === "function") ? getWinnerName() : "Tempo scaduto";
        endGame(winner);
    }
}

function updateTimerDisplay() {
    if (!timerValue) return;
    
    timerValue.textContent = timeLeft;

    // Reset classi CSS
    timerValue.classList.remove("timer-warning", "timer-danger");

    // Logica colori
    if (timeLeft <= 10) {
        timerValue.classList.add("timer-danger");
    } else if (timeLeft <= 20) {
        timerValue.classList.add("timer-warning");
    }
}

/* ===================================== */
/* API PUBBLICA (Esposta per game.js) */
/* ===================================== */

window.startTimer = function() {
    console.log("Timer: Avvio richiesto");
    window.stopTimer(); // Pulisci sempre prima di partire
    timeLeft = DEFAULT_TIME;
    timerPaused = false;
    updateTimerDisplay();
    timerInterval = setInterval(tick, 1000);
};

window.stopTimer = function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
};

window.toggleTimerPause = function() {
    timerPaused = !timerPaused;
    console.log("Timer: toggle (pausa è ora: " + timerPaused + ")");
};

window.resetTimer = function() {
    window.stopTimer();
    timeLeft = DEFAULT_TIME;
    updateTimerDisplay();
};

window.getTimeLeft = function() {
    return timeLeft;
};
