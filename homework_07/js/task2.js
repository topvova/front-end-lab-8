'use strict';

console.log(playGame());

function playGame(prize = 0, range = 5, possiblePrizes = [10, 5, 2]) {

    const agreed = window.confirm('Do you want to play a game?');

    if (!agreed && !prize) { //when user refuses to play
        return 'You did not become a millionaire';
    } else if (agreed) { //when user agrees to play
        const numberToGuess = Math.floor(Math.random() * range + 1);
        const attempts = 3;

        for (let i = 0; i < attempts; i++) {

            const promptMessage = `Enter a number (from 0 to ${range})\n` +
                `Attempts left: ${attempts - i - 1}\n` +
                `Total prize: ${prize}$\n` +
                `Possible prize on current attempt: ${possiblePrizes[i]}$\n`;

            const enteredNumber = window.prompt(promptMessage);

            if (enteredNumber === null) {
                break;
            }//when user agrees to play but then press 'Cancel' button

            if (Number(enteredNumber) === numberToGuess) {
                prize += possiblePrizes[i];
                possiblePrizes = possiblePrizes.map((el) => Math.round(el * 3));
                return playGame(prize, range * 2, possiblePrizes);
            }
        }
        //user did not guess the number, starting new game with default values
        console.log(`Thank you for a game. Your prize is: ${prize}$`);
        return playGame();
    }
    //user won the game
    return `Thank you for a game. Your prize is: ${prize}$`;
}
