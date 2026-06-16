function playAgain() {

    if (
        typeof stopTimer ===
        "function"
    ) {

        stopTimer();

    }

    if (
        typeof resetScores ===
        "function"
    ) {

        resetScores();

    }

    if (
        typeof resetTeams ===
        "function"
    ) {

        resetTeams();

    }

    if (
        typeof resetGameData ===
        "function"
    ) {

        resetGameData();

    }

    showScreen(
        menuScreen
    );

}
