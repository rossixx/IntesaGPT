/* ===================================== */
/* GAME.JS - Logica di Gioco Corretta    */
/* ===================================== */

let doubleMode = false;
let usedWords = [];
let currentWord = "";

// Nuove variabili di stato per le feature richieste
let isMultiplayerMode = false;
let singleplayerWordPosition = "center"; 
let isTimerPaused = false;

/* ===================================== */
/* DOM */
/* ===================================== */
const wordDisplay = document.getElementById("wordDisplay");
const historyList = document.getElementById("historyList");
const toggleDoubleBtn = document.getElementById("toggleDoubleBtn");
const respondBtn = document.getElementById("respondBtn");
const passBtn = document.getElementById("passBtn");
const correctBtn = document.getElementById("correctBtn");
const wrongBtn = document.getElementById("wrongBtn");
const newWordBtn = document.getElementById("newWordBtn");

/* ===================================== */
/* INIT */
/* ===================================== */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGame);
} else {
    initGame();
}

function initGame() {
    bindGameEvents();
    bindGlobalKeyEvents(); // Inizializza l'ascolto dello spazio
    updateDoubleButton();

    // Rileva il cambio di posizione dal menu (se hai aggiunto la select nell'HTML)
    const positionSelect = document.getElementById("wordPositionSelect");
    if (positionSelect) {
        singleplayerWordPosition = positionSelect.value;
        positionSelect.addEventListener("change", (e) => {
            singleplayerWordPosition = e.target.value;
            applyWordLayout();
        });
    }
}

/* ===================================== */
/* EVENTS */
/* ===================================== */
function bindGameEvents() {
    if (toggleDoubleBtn) {
        toggleDoubleBtn.addEventListener("click", toggleDoubleMode);
    }

    if (respondBtn) {
        respondBtn.addEventListener("click", handleRespond);
    }

    if (passBtn) {
        passBtn.addEventListener("click", handlePass);
    }

    if (correctBtn) {
        correctBtn.addEventListener("click", handleCorrect);
    }

    if (wrongBtn) {
        wrongBtn.addEventListener("click", handleWrong);
    }

    if (newWordBtn) {
        newWordBtn.addEventListener("click", newWord);
    }
}

/* Ascoltatore Globale della Tastiera (Barra Spaziatrice) */
function bindGlobalKeyEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            // Se l'utente sta digitando un nome di una squadra negli input, lo spazio deve funzionare normalmente
            if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
                return;
            }

            const gameScreenEl = document.getElementById("gameScreen");
            // Gestisce la pausa solo se la schermata di gioco è attualmente visibile attiva
            if (gameScreenEl && !gameScreenEl.classList.contains("hidden")) {
                e.preventDefault(); // Blocca lo scroll della pagina verso il basso
                toggleTimerPause();
            }
        }
    });
}

/* ===================================== */
/* MULTIPLAYER / SINGLEPLAYER STATE CONFIG */
/* ===================================== */
function setMultiplayer(value) {
    isMultiplayerMode = value;
    isTimerPaused = false; // Reset dello stato di pausa ad ogni nuova partita

    // Gestione Feature: Mostra/Nascondi Nomi Squadra
    // Nota: Cerca un id comune come teamNamesContainer o turnDisplay. Cambialo se usi un id diverso nell'HTML.
    const teamContainer = document.getElementById("teamNamesContainer") || document.getElementById("turnDisplay");
    if (teamContainer) {
        if (isMultiplayerMode) {
            teamContainer.classList.remove("hidden");
        } else {
            teamContainer.classList.add("hidden");
        }
    }

    applyWordLayout();
}

/* Gestione Feature: Spostamento Parole (Lati / Centro) */
function applyWordLayout() {
    if (!wordDisplay) return;

    // Prende il container genitore delle parole (es. wordsContainer)
    const container = document.getElementById("wordsContainer") || wordDisplay.parentElement;
    if (!container) return;

    container.classList.remove("words-sides", "words-center");

    if (isMultiplayerMode) {
        container.classList.add("words-sides"); // Sempre ai lati in multi
    } else {
        if (singleplayerWordPosition === "sides") {
            container.classList.add("words-sides");
        } else {
            container.classList.add("words-center"); // Centro in singleplayer di base
        }
    }
}

/* Gestione Feature: Interruttore Play/Pausa del Timer */
function toggleTimerPause() {
    if (isTimerPaused) {
        if (typeof resumeTimer === "function") {
            resumeTimer();
        }
        isTimerPaused = false;
        console.log("Gioco Ripreso");
    } else {
        if (typeof pauseTimer === "function") {
            pauseTimer();
        }
        isTimerPaused = true;
        console.log("Gioco in Pausa");
    }
}

/* ===================================== */
/* WORD POOL */
/* ===================================== */
function getCurrentPool() {
    // Sicurezza anti-bug: controlliamo che i vettori globali esistano prima di leggerli
    if (doubleMode) {
        return typeof phrases !== "undefined" ? phrases : [];
    }
    return typeof words !== "undefined" ? words : [];
}

/* ===================================== */
/* NEW WORD */
/* ===================================== */
function newWord() {
    const pool = getCurrentPool();

    if (!pool || pool.length === 0) {
        showWord("NESSUNA PAROLA");
        return;
    }

    let available = pool.filter(
        item => !usedWords.includes(item)
    );

    if (available.length === 0) {
        usedWords = [];
        available = [...pool];
    }

    const randomIndex = Math.floor(Math.random() * available.length);

    currentWord = available[randomIndex];
    usedWords.push(currentWord);

    showWord(currentWord);
    addToHistory(currentWord);
}

/* ===================================== */
/* DISPLAY */
/* ===================================== */
function showWord(word) {
    if (!wordDisplay) {
        return;
    }

    wordDisplay.classList.remove("wordAppear");
    void wordDisplay.offsetWidth; // Forza il reflow grafico per far resettare le animazioni CSS

    wordDisplay.textContent = word;
    wordDisplay.classList.add("wordAppear");
}

function addToHistory(word) {
    if (!historyList) {
        return;
    }

    const li = document.createElement("li");
    li.textContent = word;
    historyList.prepend(li);

    while (historyList.children.length > 20) {
        historyList.removeChild(historyList.lastChild);
    }
}

/* ===================================== */
/* DOUBLE MODE */
/* ===================================== */
function toggleDoubleMode() {
    doubleMode = !doubleMode;
    updateDoubleButton();
}

function updateDoubleButton() {
    if (!toggleDoubleBtn) {
        return;
    }

    toggleDoubleBtn.textContent = doubleMode ? "PAROLE NORMALI" : "RADDOPPIA";
}

/* ===================================== */
/* RESPONDI */
/* ===================================== */
function handleRespond() {
    if (typeof pauseTimer === "function") {
        pauseTimer();
        isTimerPaused = true;
    }
}

/* ===================================== */
/* PASSO */
/* ===================================== */
function handlePass() {
    newWord();

    if (typeof resumeTimer === "function") {
        resumeTimer();
        isTimerPaused = false;
    }
}

/* ===================================== */
/* GIUSTA */
/* ===================================== */
function handleCorrect() {
    if (typeof addPoint === "function") {
        addPoint();
    }

    flashCorrect();
    newWord();

    if (typeof resumeTimer === "function") {
        resumeTimer();
        isTimerPaused = false;
    }
}

/* ===================================== */
/* SBAGLIATA */
/* ===================================== */
function handleWrong() {
    if (typeof removePoint === "function") {
        removePoint();
    }

    flashWrong();
    newWord();

    if (typeof resumeTimer === "function") {
        resumeTimer();
        isTimerPaused = false;
    }
}

/* ===================================== */
/* EFFECTS */
/* ===================================== */
function flashCorrect() {
    if (!wordDisplay) {
        return;
    }

    wordDisplay.classList.add("correctFlash");

    setTimeout(() => {
        wordDisplay.classList.remove("correctFlash");
    }, 500);
}

function flashWrong() {
    if (!wordDisplay) {
        return;
    }

    wordDisplay.classList.add("wrongFlash");

    setTimeout(() => {
        wordDisplay.classList.remove("wrongFlash");
    }, 500);
}

/* ===================================== */
/* RESET */
/* ===================================== */
function resetGameData() {
    usedWords = [];
    currentWord = "";
    isTimerPaused = false;

    if (historyList) {
        historyList.innerHTML = "";
    }
}

/* ===================================== */
/* HELPERS */
/* ===================================== */
function getCurrentWord() {
    return currentWord;
}

function isDoubleMode() {
    return doubleMode;
}
