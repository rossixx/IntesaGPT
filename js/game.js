/* ===================================== */
/* GAME.JS - Logica di Gioco Corretta    */
/* ===================================== */

let doubleMode = false;
let usedWords = [];
let currentWord = "";

// Variabili di stato per le feature dinamiche
let isMultiplayerMode = false;
let singleplayerWordPosition = "center"; // Centro di default in singleplayer
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

    // Rileva il cambio di posizione dal menu (se hai aggiunto la select con questo ID)
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
            // Se l'utente scrive negli input dei nomi, la barra spaziatrice deve fare uno spazio normale
            if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
                return;
            }

            const gameScreenEl = document.getElementById("gameScreen");
            // Gestisce la pausa solo se la schermata di gioco è visibile
            if (gameScreenEl && !gameScreenEl.classList.contains("hidden")) {
                e.preventDefault(); // Evita lo scroll della pagina indotto dal tasto spazio
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

    // Cerca tutti gli elementi HTML che hanno la classe "multiplayer-only"
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
/* Gestione Spostamento Parole (Lati / Centro) */
function applyWordLayout() {
    if (!wordDisplay) return;

    // Rimuoviamo tutte le classi di layout per fare pulizia
    wordDisplay.classList.remove("words-sides", "words-center", "multiplayer-rotate");

    if (isMultiplayerMode) {
        // Multiplayer: Ai lati e ruotate (2 parole)
        wordDisplay.classList.add("words-sides", "multiplayer-rotate");
    } else {
        // Singleplayer: Al centro e piatte (1 parola)
        wordDisplay.classList.add("words-center");
    }
    
    // Rinfresca la visualizzazione della parola se già a schermo
    if (currentWord) {
        showWord(currentWord);
    }
}

/* ===================================== */
/* DISPLAY */
/* ===================================== */
function showWord(word) {
    // Assicurati che 'wordDisplay' sia l'ID corretto nel tuo HTML
    const wordElement = document.getElementById("wordDisplay");

    // 1. Rimuoviamo la classe dell'animazione per resettare lo stato
    wordElement.classList.remove("fade-in");

    // 2. Aggiorniamo il testo con la parola passata alla funzione
    wordElement.textContent = word;

    // 3. IL TRUCCO DEL REFLOW
    // Obblighiamo il browser a ricalcolare l'elemento per "dimenticare" l'animazione precedente
    void wordElement.offsetWidth;

    // 4. Riapplichiamo la classe: ora l'animazione riparte fluidamente
    wordElement.classList.add("fade-in");
}

    wordDisplay.classList.add("wordAppear");
}
/* Interruttore Play/Pausa del Timer */
function toggleTimerPause() {
    if (isTimerPaused) {
        if (typeof resumeTimer === "function") {
            resumeTimer();
        }
        isTimerPaused = false;
    } else {
        if (typeof pauseTimer === "function") {
            pauseTimer();
        }
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
    if (!wordDisplay) return;

    wordDisplay.classList.remove("wordAppear");
    void wordDisplay.offsetWidth; // Trigger di reflow hardware per resettare le animazioni CSS

    // Se siamo ai lati sdoppiamo la stringa in due span separati, altrimenti ne usiamo uno solo al centro
    const isSides = isMultiplayerMode || singleplayerWordPosition === "sides";

    if (isSides) {
        wordDisplay.innerHTML = `<span class="word-item">${word}</span><span class="word-item">${word}</span>`;
    } else {
        wordDisplay.innerHTML = `<span class="word-item">${word}</span>`;
    }

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
    if (!wordDisplay) return;

    wordDisplay.classList.add("correctFlash");

    setTimeout(() => {
        wordDisplay.classList.remove("correctFlash");
    }, 500);
}

function flashWrong() {
    if (!wordDisplay) return;

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
