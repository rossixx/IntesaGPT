/* ===================================== */
/* GAME.JS */
/* ===================================== */

let doubleMode = false;

let usedWords = [];

let currentWord = "";

/* ===================================== */
/* DOM */
/* ===================================== */

const wordDisplay =
    document.getElementById(
        "wordDisplay"
    );

const historyList =
    document.getElementById(
        "historyList"
    );

const toggleDoubleBtn =
    document.getElementById(
        "toggleDoubleBtn"
    );

const respondBtn =
    document.getElementById(
        "respondBtn"
    );

const passBtn =
    document.getElementById(
        "passBtn"
    );

const correctBtn =
    document.getElementById(
        "correctBtn"
    );

const wrongBtn =
    document.getElementById(
        "wrongBtn"
    );

const newWordBtn =
    document.getElementById(
        "newWordBtn"
    );

/* ===================================== */
/* INIT */
/* ===================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initGame
    );

} else {

    initGame();

}
);

function initGame() {

    bindGameEvents();

    updateDoubleButton();

}

/* ===================================== */
/* EVENTS */
/* ===================================== */

function bindGameEvents() {

    if (toggleDoubleBtn) {

        toggleDoubleBtn.addEventListener(
            "click",
            toggleDoubleMode
        );

    }

    if (respondBtn) {

        respondBtn.addEventListener(
            "click",
            handleRespond
        );

    }

    if (passBtn) {

        passBtn.addEventListener(
            "click",
            handlePass
        );

    }

    if (correctBtn) {

        correctBtn.addEventListener(
            "click",
            handleCorrect
        );

    }

    if (wrongBtn) {

        wrongBtn.addEventListener(
            "click",
            handleWrong
        );

    }

    if (newWordBtn) {

        newWordBtn.addEventListener(
            "click",
            newWord
        );

    }

}

/* ===================================== */
/* WORD POOL */
/* ===================================== */

function getCurrentPool() {

    if (doubleMode) {

        return phrases;

    }

    return words;

}

/* ===================================== */
/* NEW WORD */
/* ===================================== */

function newWord() {

    const pool =
        getCurrentPool();

    if (
        !pool ||
        pool.length === 0
    ) {

        showWord(
            "NESSUNA PAROLA"
        );

        return;

    }

    let available =
        pool.filter(
            item =>
                !usedWords.includes(
                    item
                )
        );

    if (
        available.length === 0
    ) {

        usedWords = [];

        available = [...pool];

    }

    const randomIndex =
        Math.floor(
            Math.random() *
            available.length
        );

    currentWord =
        available[
            randomIndex
        ];

    usedWords.push(
        currentWord
    );

    showWord(
        currentWord
    );

    addToHistory(
        currentWord
    );

}

/* ===================================== */
/* DISPLAY */
/* ===================================== */

function showWord(word) {

    if (!wordDisplay) {

        return;

    }

    wordDisplay.classList.remove(
        "wordAppear"
    );

    void wordDisplay.offsetWidth;

    wordDisplay.textContent =
        word;

    wordDisplay.classList.add(
        "wordAppear"
    );

}

function addToHistory(word) {

    if (!historyList) {

        return;

    }

    const li =
        document.createElement(
            "li"
        );

    li.textContent =
        word;

    historyList.prepend(
        li
    );

    while (
        historyList.children
            .length > 20
    ) {

        historyList.removeChild(
            historyList.lastChild
        );

    }

}

/* ===================================== */
/* DOUBLE MODE */
/* ===================================== */

function toggleDoubleMode() {

    doubleMode =
        !doubleMode;

    updateDoubleButton();

}

function updateDoubleButton() {

    if (
        !toggleDoubleBtn
    ) {

        return;

    }

    toggleDoubleBtn.textContent =
        doubleMode
            ? "PAROLE NORMALI"
            : "RADDOPPIA";

}

/* ===================================== */
/* RESPONDI */
/* ===================================== */

function handleRespond() {

    if (
        typeof pauseTimer ===
        "function"
    ) {

        pauseTimer();

    }

}

/* ===================================== */
/* PASSO */
/* ===================================== */

function handlePass() {

    newWord();

    if (
        typeof resumeTimer ===
        "function"
    ) {

        resumeTimer();

    }

}

/* ===================================== */
/* GIUSTA */
/* ===================================== */

function handleCorrect() {

    if (
        typeof addPoint ===
        "function"
    ) {

        addPoint();

    }

    flashCorrect();

    newWord();

    if (
        typeof resumeTimer ===
        "function"
    ) {

        resumeTimer();

    }

}

/* ===================================== */
/* SBAGLIATA */
/* ===================================== */

function handleWrong() {

    if (
        typeof removePoint ===
        "function"
    ) {

        removePoint();

    }

    flashWrong();

    newWord();

    if (
        typeof resumeTimer ===
        "function"
    ) {

        resumeTimer();

    }

}

/* ===================================== */
/* EFFECTS */
/* ===================================== */

function flashCorrect() {

    if (!wordDisplay) {

        return;

    }

    wordDisplay.classList.add(
        "correctFlash"
    );

    setTimeout(
        () => {

            wordDisplay.classList.remove(
                "correctFlash"
            );

        },
        500
    );

}

function flashWrong() {

    if (!wordDisplay) {

        return;

    }

    wordDisplay.classList.add(
        "wrongFlash"
    );

    setTimeout(
        () => {

            wordDisplay.classList.remove(
                "wrongFlash"
            );

        },
        500
    );

}

/* ===================================== */
/* RESET */
/* ===================================== */

function resetGameData() {

    usedWords = [];

    currentWord = "";

    if (
        historyList
    ) {

        historyList.innerHTML =
            "";

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

console.log("GAME INIT");
initGame();
