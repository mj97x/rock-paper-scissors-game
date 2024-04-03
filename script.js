
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function getRoundResult(playerSelection, computerSelection) {
    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
        )
    {
        return 2;
    } else if (playerSelection === computerSelection) {
        return 1;
    } else {
        return 0;  
    }
}

async function playRound() {
    let winText;
    
    await updateComputerChoice();
    await delay(300);
    let roundResult = getRoundResult(playerChoice, computerChoice);
    if (roundResult === 2) {
        playerScore++;
    } else if (roundResult === 0) {
        computerScore++;
    }
    setScores(playerScore, computerScore);

    await resetRound();

    if (playerScore == winScore) {
        winText = "You won!";
        winCondition = true;
        overlayBox.style.setProperty('box-shadow', 'rgba(255, 255, 255, 0.815) 0px 20px 50px, #e78fb3 -10px -20px 50px, #9656a1 20px 10px 100px');
    }
    if (computerScore == winScore) {
        winText = "You lose...";
        winCondition = true;
        overlayBox.style.setProperty('box-shadow', 'rgba(255, 255, 255, 0.644) 0px 10px 50px');
    }

    if (winCondition) {
        activateOverlay();
        overlayText.innerHTML = winText;  
    }
}

async function activateOverlay() {
    overlay.style.setProperty('display', 'flex');
}

async function deactivateOverlay() {
    overlay.style.setProperty('display', 'none');
}

async function updateComputerChoice() {
    await delay((Math.random() * 350) + 250);

    computerChoice = getComputerChoice();
    gameButtons.forEach((gameButton) => {
        if (
            gameButton.id.startsWith('computer') && 
            gameButton.id.endsWith(computerChoice)
            ) 
        {
            gameButton.classList.add('selected');
        }
    });
}

async function resetRound() {
    await delay(700);

    enableButtons();


    playerChoice = undefined;
    computerChoice = undefined;
}

async function newGame(number) {
    let useButton;
    
    if (number === 1) {
        useButton = newGameButton;
    } else {
        useButton = newGameButton2;
    }


    disableButtons();


    playerChoice = undefined;
    computerChoice = undefined;

    winScore = selectedScore;

    await delay(200);
    
    useButton.textContent = 'New Game.';
    await delay(200);
    
    useButton.textContent = 'New Game..';
    await delay(200);
    
    useButton.textContent = 'New Game...';
    await delay(400);
    
    useButton.textContent = 'New Game';


    winCondition = false;
    playerScore = 0;
    computerScore = 0;
    setScores();
    
    if (2) {
        deactivateOverlay();
    }
    

    useButton.classList.remove('selected');


    enableButtons();
}


function setScores() {
    const playerScoreDisplay = document.querySelector('.score-amount.player');
    const computerScoreDisplay = document.querySelector('.score-amount.computer');
    const winScoreDisplays = document.querySelectorAll('.win-amount');

    playerScoreDisplay.textContent = `${playerScore}`;
    computerScoreDisplay.textContent = `${computerScore}`;

    winScoreDisplays.forEach((winScoreDisplay) => {
        winScoreDisplay.textContent = ` / ${winScore}`;
    });
}

function delay(ms) {
    return new Promise((resolution) => {setTimeout(() => resolution('done!'), ms)});
}

function disableButtons() {

    gameButtons.forEach((gameButton) => {
        gameButton.disabled = true;
    });

    slider.disabled = true;
    newGameButton.disabled = true;
    newGameButton2.disabled = true;
}

function enableButtons() {
    gameButtons.forEach((gameButton) => {
        gameButton.classList.remove('selected');
        gameButton.disabled = false;
    });

    slider.disabled = false;
    newGameButton.disabled = false;
    newGameButton2.disabled = false;
}

function executeGame() {
    slider.addEventListener('change', () => {
        selectedScore = slider.value;
        selectedScoreDisplay.textContent = `${selectedScore}`;
    });

    gameButtons.forEach((gameButton) => {
        if (!gameButton.id.startsWith("computer")) {
            gameButton.addEventListener('click', () => {
                playerChoice = `${gameButton.id}`;
                gameButton.classList.add('selected');
                

                gameButtons.forEach((gB) => {
                    if (gB !== gameButton) {
                        gB.classList.remove('selected');
                    }
                });

                disableButtons();
  
                playRound();
            });
        }  
    });

    newGameButton.addEventListener('click', () => {
        newGameButton.classList.add('selected');
        newGame(1);
    });

    newGameButton2.addEventListener('click', () => {
        newGameButton2.classList.add('selected');
        newGame(2);
    });
}


const slider = document.querySelector('#score-slider');
let selectedScore = slider.value; 
const selectedScoreDisplay = document.querySelector('#selected-score');
selectedScoreDisplay.textContent = `${selectedScore}`;

let winScore = selectedScore; 


const overlay = document.querySelector('.overlay');
const overlayBox = document.querySelector('.overlay-box');
const overlayText = document.querySelector('.overlay-text');


let playerScore = 0;
let computerScore = 0;
let playerChoice;
let computerChoice;
let result;
let winCondition = false;

setScores();


const gameButtons = document.querySelectorAll('.game-button');
const newGameButton = document.querySelector('#reset');
const newGameButton2 = document.querySelector('#reset2');

executeGame();





