/* ===================================== */
/* GAME.JS - Versione Completa e Fixata  */
/* ===================================== */

let doubleMode = false;
let usedWords = [];
let currentWord = "";

// Variabili di stato per le feature dinamiche
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
    bindGlobalKeyEvents(); 
    updateDoubleButton();

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
    if (toggleDoubleBtn) toggleDoubleBtn.addEventListener("click", toggleDoubleMode);
    if (respondBtn) respondBtn.addEventListener("click", handleRespond);
    if (passBtn) passBtn.addEventListener("click", handlePass);
    if (correctBtn) correctBtn.addEventListener("click", handleCorrect);
    if (wrongBtn) wrongBtn.addEventListener("click", handleWrong);
    if (newWordBtn) newWordBtn.addEventListener("click", newWord);
}

function bindGlobalKeyEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
            const gameScreenEl = document.getElementById("gameScreen");
            if (gameScreenEl && !gameScreenEl.classList.contains("hidden")) {
                e.preventDefault();
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
    isTimerPaused = false; 

    const multiElements = document.querySelectorAll('.multiplayer-only');
    multiElements.forEach(el => {
        if (isMultiplayerMode) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });

    applyWordLayout();
}

function applyWordLayout() {
    if (!wordDisplay) return;

    wordDisplay.classList.remove("words-sides", "words-center", "multiplayer-rotate");

    if (isMultiplayerMode) {
        wordDisplay.classList.add("words-sides", "multiplayer-rotate");
    } else {
        wordDisplay.classList.add("words-center");
    }
    
    if (currentWord) {
        showWord(currentWord);
    }
}

/* ===================================== */
/* DISPLAY E ANIMAZIONE (FIXATA)         */
/* ===================================== */
function showWord(word) {
    if (!wordDisplay) return;

    // 1. Rimuoviamo la classe per resettare lo stato
    wordDisplay.classList.remove("wordAppear");

    // 2. IL TRUCCO DEL REFLOW (Forza il browser a resettare l'animazione)
    void wordDisplay.offsetWidth; 

    // 3. Logica visualizzazione (Singola o Doppia)
    const isSides = isMultiplayerMode || singleplayerWordPosition === "sides";
    if (isSides) {
        wordDisplay.innerHTML = `<span class="word-item">${word}</span><span class="word-item">${word}</span>`;
    } else {
        wordDisplay.innerHTML = `<span class="word-item">${word}</span>`;
    }

    // 4. Riapplichiamo la classe per far partire l'animazione
    wordDisplay.classList.add("wordAppear");
}

/* Interruttore Play/Pausa del Timer */
function toggleTimerPause() {
    if (isTimerPaused) {
        if (typeof resumeTimer === "function") resumeTimer();
        isTimerPaused = false;
    } else {
        if (typeof pauseTimer === "function") pauseTimer();
        isTimerPaused = true;
    }
}

/* ===================================== */
/* WORD POOL */
/* ===================================== */
function getCurrentPool() {
    if (doubleMode) {
        return typeof phrases !== "undefined" ? phrases : [];
    }
    return typeof words !== "undefined" ? words : [];
}

function newWord() {
    const pool = getCurrentPool();
    if (!pool || pool.length === 0) {
        showWord("NESSUNA PAROLA");
        return;
    }

    let available = pool.filter(item => !usedWords.includes(item));
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

function addToHistory(word) {
    if (!historyList) return;
    const li = document.createElement("li");
    li.textContent = word;
    historyList.prepend(li);
    while (historyList.children.length > 20) {
        historyList.removeChild(historyList.lastChild);
    }
}

/* ===================================== */
/* ALTRE FUNZIONI (DOUBLE MODE, SCORE)   */
/* ===================================== */
function toggleDoubleMode() {
    doubleMode = !doubleMode;
    updateDoubleButton();
}

function updateDoubleButton() {
    if (!toggleDoubleBtn) return;
    toggleDoubleBtn.textContent = doubleMode ? "PAROLE NORMALI" : "RADDOPPIA";
}

function handleRespond() {
    if (typeof pauseTimer === "function") {
        pauseTimer();
        isTimerPaused = true;
    }
}

function handlePass() {
    newWord();
    if (typeof resumeTimer === "function") {
        resumeTimer();
        isTimerPaused = false;
    }
}

function handleCorrect() {
    if (typeof addPoint === "function") addPoint();
    flashCorrect();
    newWord();
    if (typeof resumeTimer === "function") {
        resumeTimer();
        isTimerPaused = false;
    }
}

function handleWrong() {
    if (typeof removePoint === "function") removePoint();
    flashWrong();
    newWord();
    if (typeof resumeTimer === "function") {
        resumeTimer();
        isTimerPaused = false;
    }
}

function flashCorrect() {
    if (!wordDisplay) return;
    wordDisplay.classList.add("correctFlash");
    setTimeout(() => wordDisplay.classList.remove("correctFlash"), 500);
}

function flashWrong() {
    if (!wordDisplay) return;
    wordDisplay.classList.add("wrongFlash");
    setTimeout(() => wordDisplay.classList.remove("wrongFlash"), 500);
}

function resetGameData() {
    usedWords = [];
    currentWord = "";
    isTimerPaused = false;
    if (historyList) historyList.innerHTML = "";
}

function getCurrentWord() { return currentWord; }
function isDoubleMode() { return doubleMode; }
