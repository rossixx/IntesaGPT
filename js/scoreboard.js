/* ===================================== */
/* SCOREBOARD.JS */
/* ===================================== */

let scoreTeam1 = 0;

let scoreTeam2 = 0;

/* ===================================== */
/* DOM */
/* ===================================== */

const team1ScoreEl =
    document.getElementById(
        "team1Score"
    );

const team2ScoreEl =
    document.getElementById(
        "team2Score"
    );

const bannerScore1 =
    document.getElementById(
        "bannerScore1"
    );

const bannerScore2 =
    document.getElementById(
        "bannerScore2"
    );

/* ===================================== */
/* UPDATE */
/* ===================================== */

function updateScoresUI() {

    if (
        team1ScoreEl
    ) {

        team1ScoreEl.textContent =
            scoreTeam1;

    }

    if (
        team2ScoreEl
    ) {

        team2ScoreEl.textContent =
            scoreTeam2;

    }

    if (
        bannerScore1
    ) {

        bannerScore1.textContent =
            scoreTeam1;

    }

    if (
        bannerScore2
    ) {

        bannerScore2.textContent =
            scoreTeam2;

    }

}

/* ===================================== */
/* ADD POINT */
/* ===================================== */

function addPoint() {

    if (
        typeof isMultiplayer ===
        "function" &&
        isMultiplayer()
    ) {

        if (
            getActiveTeam() === 1
        ) {

            scoreTeam1++;

        } else {

            scoreTeam2++;

        }

    } else {

        scoreTeam1++;

    }

    updateScoresUI();

}

/* ===================================== */
/* REMOVE POINT */
/* ===================================== */

function removePoint() {

    if (
        typeof isMultiplayer ===
        "function" &&
        isMultiplayer()
    ) {

        if (
            getActiveTeam() === 1
        ) {

            scoreTeam1--;

        } else {

            scoreTeam2--;

        }

    } else {

        scoreTeam1--;

    }

    updateScoresUI();

}

/* ===================================== */
/* RESET */
/* ===================================== */

function resetScores() {

    scoreTeam1 = 0;

    scoreTeam2 = 0;

    updateScoresUI();

}

/* ===================================== */
/* GETTERS */
/* ===================================== */

function getScoreTeam1() {

    return scoreTeam1;

}

function getScoreTeam2() {

    return scoreTeam2;

}

/* ===================================== */
/* WINNER */
/* ===================================== */

function getWinnerName() {

    if (
        typeof isMultiplayer ===
        "function" &&
        isMultiplayer()
    ) {

        if (
            scoreTeam1 >
            scoreTeam2
        ) {

            return getTeam1Name();

        }

        if (
            scoreTeam2 >
            scoreTeam1
        ) {

            return getTeam2Name();

        }

        return "Pareggio";

    }

    return (
        "Punteggio: " +
        scoreTeam1
    );

}
