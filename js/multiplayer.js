/* ===================================== */
/* MULTIPLAYER.JS */
/* ===================================== */

let multiplayerMode = false;

let activeTeam = 1;

let team1Name = "Squadra 1";

let team2Name = "Squadra 2";

/* ===================================== */
/* DOM */
/* ===================================== */

const activeTeamLabel =
    document.getElementById(
        "activeTeamLabel"
    );

const team1NameEl =
    document.getElementById(
        "team1Name"
    );

const team2NameEl =
    document.getElementById(
        "team2Name"
    );

const bannerTeam1 =
    document.getElementById(
        "bannerTeam1"
    );

const bannerTeam2 =
    document.getElementById(
        "bannerTeam2"
    );

const team1Panel =
    document.getElementById(
        "team1Panel"
    );

const team2Panel =
    document.getElementById(
        "team2Panel"
    );

const switchTeamBtn =
    document.getElementById(
        "switchTeamBtn"
    );

/* ===================================== */
/* INIT */
/* ===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            switchTeamBtn
        ) {

            switchTeamBtn.addEventListener(
                "click",
                switchTeam
            );

        }

    }
);

/* ===================================== */
/* MODE */
/* ===================================== */

function setMultiplayer(value) {

    multiplayerMode =
        value;

    updateMultiplayerUI();

}

function isMultiplayer() {

    return multiplayerMode;

}

/* ===================================== */
/* TEAM NAMES */
/* ===================================== */

function setTeamNames(
    team1,
    team2
) {

    team1Name = team1;

    team2Name = team2;

    updateTeamNamesUI();

}

function updateTeamNamesUI() {

    if (
        team1NameEl
    ) {

        team1NameEl.textContent =
            team1Name;

    }

    if (
        team2NameEl
    ) {

        team2NameEl.textContent =
            team2Name;

    }

    if (
        bannerTeam1
    ) {

        bannerTeam1.textContent =
            team1Name;

    }

    if (
        bannerTeam2
    ) {

        bannerTeam2.textContent =
            team2Name;

    }

    updateActiveTeamUI();

}

/* ===================================== */
/* ACTIVE TEAM */
/* ===================================== */

function switchTeam() {

    if (
        !multiplayerMode
    ) {

        return;

    }

    activeTeam =
        activeTeam === 1
            ? 2
            : 1;

    updateActiveTeamUI();

}

function updateActiveTeamUI() {

    if (
        activeTeamLabel
    ) {

        activeTeamLabel.textContent =
            activeTeam === 1
                ? team1Name
                : team2Name;

    }

    if (
        team1Panel
    ) {

        team1Panel.classList.remove(
            "active-team"
        );

    }

    if (
        team2Panel
    ) {

        team2Panel.classList.remove(
            "active-team"
        );

    }

    if (
        activeTeam === 1 &&
        team1Panel
    ) {

        team1Panel.classList.add(
            "active-team"
        );

    }

    if (
        activeTeam === 2 &&
        team2Panel
    ) {

        team2Panel.classList.add(
            "active-team"
        );

    }

}

/* ===================================== */
/* RESET */
/* ===================================== */

function resetTeams() {

    activeTeam = 1;

    updateActiveTeamUI();

}

/* ===================================== */
/* UI */
/* ===================================== */

function updateMultiplayerUI() {

    if (
        switchTeamBtn
    ) {

        switchTeamBtn.style.display =
            multiplayerMode
                ? "inline-block"
                : "none";

    }

}

/* ===================================== */
/* GETTERS */
/* ===================================== */

function getActiveTeam() {

    return activeTeam;

}

function getTeam1Name() {

    return team1Name;

}

function getTeam2Name() {

    return team2Name;

}
