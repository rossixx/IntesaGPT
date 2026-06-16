/* ===================================== */
/* STORAGE.JS */
/* ===================================== */

const STORAGE_KEYS = {

    team1Score:
        "intesa_team1_score",

    team2Score:
        "intesa_team2_score",

    team1Name:
        "intesa_team1_name",

    team2Name:
        "intesa_team2_name"

};

/* ===================================== */
/* SAVE */
/* ===================================== */

function saveGameState() {

    try {

        if (
            typeof getScoreTeam1 ===
            "function"
        ) {

            localStorage.setItem(
                STORAGE_KEYS.team1Score,
                getScoreTeam1()
            );

        }

        if (
            typeof getScoreTeam2 ===
            "function"
        ) {

            localStorage.setItem(
                STORAGE_KEYS.team2Score,
                getScoreTeam2()
            );

        }

        if (
            typeof getTeam1Name ===
            "function"
        ) {

            localStorage.setItem(
                STORAGE_KEYS.team1Name,
                getTeam1Name()
            );

        }

        if (
            typeof getTeam2Name ===
            "function"
        ) {

            localStorage.setItem(
                STORAGE_KEYS.team2Name,
                getTeam2Name()
            );

        }

    } catch (error) {

        console.error(
            "Errore salvataggio:",
            error
        );

    }

}

/* ===================================== */
/* LOAD */
/* ===================================== */

function loadGameState() {

    try {

        const savedTeam1 =
            localStorage.getItem(
                STORAGE_KEYS.team1Name
            );

        const savedTeam2 =
            localStorage.getItem(
                STORAGE_KEYS.team2Name
            );

        if (
            savedTeam1 &&
            savedTeam2 &&
            typeof setTeamNames ===
                "function"
        ) {

            setTeamNames(
                savedTeam1,
                savedTeam2
            );

        }

    } catch (error) {

        console.error(
            "Errore caricamento:",
            error
        );

    }

}

/* ===================================== */
/* CLEAR */
/* ===================================== */

function clearGameState() {

    try {

        Object.values(
            STORAGE_KEYS
        ).forEach(
            key => {

                localStorage.removeItem(
                    key
                );

            }
        );

    } catch (error) {

        console.error(
            "Errore reset:",
            error
        );

    }

}
