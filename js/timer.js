/* ===================================== */
/* TIMER.JS - Versione "Cerca-sempre"    */
/* ===================================== */

// Variabili globali
const DEFAULT_TIME = 60;
let timerInterval = null;
let timeLeft = 60;
let timerPaused = true;

/* ===================================== */
/* LOGICA DI AGGIORNAMENTO UI */
/* ===================================== */

function updateTimerDisplay() {
    // Cerchiamo l'elemento ogni volta che dobbiamo aggiornare.
    // Così siamo sicuri di scrivere nell'HTML corretto.
    const timerValue = document.getElementById("timerValue");

    if (!timerValue) {
        console.warn("⚠️ ERRORE: Elemento con id='timerValue' non trovato nell'HTML!");
        return;
    }

    timerValue.textContent = timeLeft;

    // Gestione colori
    timerValue.classList.remove("timer-warning", "timer-danger");
    if (timeLeft <= 10) {
        timerValue.classList.add("timer-danger");
    } else if (timeLeft <= 20) {
        timerValue.classList.add("timer-warning");
    }
}

/* ===================================== */
/* LOGICA INTERNA */
/* ===================================== */

function tick() {
    if (timerPaused) return;

    timeLeft--;
    
    // Aggiorniamo la UI
    updateTimerDisplay();

    // Debug: se vedi questo nella console ma non sullo schermo, 
    // allora il problema è nel tuo HTML/CSS, non nel JavaScript!
    console.log("Timer ticking:", timeLeft);

    if (timeLeft <= 0) {
        handleTimeout();
    }
}

function handleTimeout() {
    window.stopTimer();
    if (typeof endGame === "function") {
        let winner = (typeof getWinnerName === "function") ? getWinnerName() : "Partita Terminata";
        endGame(winner);
    }
}

/* ===================================== */
/* API PUBBLICHE (Per game.js) */
/* ===================================== */

window.startTimer = function() {
    console.log("Timer: Avvio richiesto");
    window.stopTimer(); 
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
    console.log("Timer: pausa impostata a", timerPaused);
};

window.resetTimer = function() {
    window.stopTimer();
    timeLeft = DEFAULT_TIME;
    updateTimerDisplay();
};

window.getTimeLeft = function() {
    return timeLeft;
};
