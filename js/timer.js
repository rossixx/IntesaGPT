/* ===================================== */
/* TIMER.JS */
/* ===================================== */
function tick() {
    console.log("Tick ricevuto! Tempo corrente:", timeLeft); // <--- AGGIUNGI QUESTO

    if (timerPaused) {
        console.log("Il timer è in pausa, esco."); // <--- AGGIUNGI QUESTO
        return;
    }

    timeLeft--;
    console.log("Tempo decrementato a:", timeLeft); // <--- AGGIUNGI QUESTO
    
    updateTimerDisplay();

    if (timeLeft <= 0) {
        console.log("Tempo scaduto!"); // <--- AGGIUNGI QUESTO
        handleTimeout();
    }
}
// Variabili globali
const DEFAULT_TIME = 60;
let timerInterval = null;
let timeLeft = 60;
let timerPaused = true;
let timerValue = null; // Dichiarata come null all'inizio

document.addEventListener("DOMContentLoaded", function() {
    initTimerModule(); 
});

function initTimerModule() {
    // Ora che il DOM è pronto, cerchiamo l'elemento
    timerValue = document.getElementById("timerValue");
    console.log("Timer inizializzato correttamente.");
}

/* ===================================== */
/* START */
/* ===================================== */

function startTimer() {
    stopTimer();
    timeLeft = DEFAULT_TIME;
    timerPaused = false;
    updateTimerDisplay();
    timerInterval = setInterval(tick, 1000);
}

/* ===================================== */
/* TICK */
/* ===================================== */

function tick() {
    if (timerPaused) return;

    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
        handleTimeout();
    }
}

/* ===================================== */
/* TIMEOUT */
/* ===================================== */

function handleTimeout() {
    stopTimer();
    let winner = "Partita Terminata";
    if (typeof getWinnerName === "function") {
        winner = getWinnerName();
    }
    if (typeof endGame === "function") {
        endGame(winner);
    }
}

/* ===================================== */
/* UPDATE UI */
/* ===================================== */

function updateTimerDisplay() {
    // Se timerValue non è stato ancora trovato, non fare nulla
    if (!timerValue) return;

    timerValue.textContent = timeLeft;

    timerValue.classList.remove("timer-warning", "timer-danger");

    if (timeLeft <= 20 && timeLeft > 10) {
        timerValue.classList.add("timer-warning");
    }

    if (timeLeft <= 10) {
        timerValue.classList.add("timer-danger");
    }
}

/* ===================================== */
/* FUNZIONI DI CONTROLLO */
/* ===================================== */

function pauseTimer() { timerPaused = true; }
function resumeTimer() { timerPaused = false; }
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
function resetTimer() {
    stopTimer();
    timeLeft = DEFAULT_TIME;
    updateTimerDisplay();
}
function getTimeLeft() { return timeLeft; }
