// const playerGuess;   // if player guess  === guess end game else count plus one and put guess in box
// const GoButton = document.activeElement.
// function guess(){
//     // Return number from 1 - 100
//     return Math.floor((Math.random() * 100) + 1);
// }

// I want a gameOver screen and a gameWin screen 
// needs to be mobile optimized
// hint button looks at last guess and tells if its higher or lower 
// 
function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

let game = new Game();

function generateWinningNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

function shuffle(arr) {
    let arrLen = arr.length;
    let temp;
    let i ;
    while (arrLen) {
        i = Math.floor(Math.random() * arrLen--);
        temp = arr[arrLen];
        arr[arrLen] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
Game.prototype.difference = function () {
    return Math.abs(this.winningNumber - this.playersGuess);
};
Game.prototype.isLower = function () {
    if (this.playersGuess < this.winningNumber) return true;
    return false;
};
Game.prototype.playersGuessSubmission = function (guess) {
    if (typeof guess == 'number' && guess > 0 && guess <= 100) {
        this.playersGuess = guess;
        return this.checkGuess();
    } else {
        throw 'That is an invalid guess.';
    }
};
Game.prototype.checkGuess = function () {
    if (this.playersGuess === this.winningNumber) return 'You Win!';
    if (this.pastGuesses.indexOf(this.playersGuess) !== -1) return 'You have already guessed that number.';
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === 5) return 'You Lose.';
    if (this.difference() < 10) return 'You\'re burning up!';
    if (this.difference() < 25) return 'You\'re lukewarm.';
    if (this.difference() < 50) return 'You\'re a bit chilly.';
    return 'You\'re ice cold!';
};

function newGame() {
    game = new Game;
    return game;
}
Game.prototype.provideHint = function () {
    const hintArr = [];
    hintArr.push(this.winningNumber);
    hintArr.push(generateWinningNumber());
    hintArr.push(generateWinningNumber());
    return shuffle(hintArr);
};
let listCounter = 1;
$(document).ready(function () {
    $('#submit').click(function () {
        let input = $('#playerInput').val();
        let guess = game.playersGuessSubmission(+input);
        $(`ul li:nth-child(${listCounter})`).text(game.pastGuesses[listCounter - 1]);
        listCounter++;
        if (listCounter > game.pastGuesses.length) listCounter = game.pastGuesses.length + 1;
        $('#hints').text(guess);
        if (game.winningNumber === +input){
        $(this).prop('disabled', true);
        $('body').addClass('win'); //add class remove class
        $('#hints').addClass('endGame');
        }
        if (game.pastGuesses.length === 5){
           $('body').addClass('lose');
           $(this).prop('disabled', true);
           $('#hints').addClass('endGame');
        }

    });
    $('#reset').click(function () {
        game = newGame();
        listCounter = 1;
        $('li').text('-');
        $('#playerInput').val('');
        $('#hints').text('');
        $('#threeHints').remove();
        $('#submit').prop('disabled', false);
        $('#hint').prop('disabled', false);
        $('body').removeClass('win');
        $('body').removeClass('lose');
        $('#hints').removeClass('endGame');
        // change backgroud to defalut
        //confirm
    });
    $('#hint').click(function () {
        $('#headers').append(`<h1 id = 'threeHints'>${game.provideHint()}</h1>`);
        $(this).prop('disabled', true);
    });
});

// you lose number was
// hide and unhide everything except you lose! or win