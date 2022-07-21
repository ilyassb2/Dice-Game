'use strict';
// SELECTING ELEMENTS :
const player1SectionEl = document.querySelector('.player--0');
const player2SectionEl = document.querySelector('.player--1');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const scorePlayer1El = document.querySelector('#score--0');
const scorePlayer2El = document.getElementById('score--1'); //You can use getElementByID for IDs as well.
const currScore1 = document.querySelector('#current--0');
const currScore2 = document.querySelector('#current--1');
const diceImage = document.querySelector('.dice');
const switchPlayerFnct = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // we reset the current score for the current player which is still at this point the first player.
  currentScore = 0; // the switch is only made in the next line
  activePlayer = activePlayer === 0 ? 1 : 0; // if active player is 0 then switch to 1 else switch to 0 .
  player1SectionEl.classList.toggle('player--active');
  player2SectionEl.classList.toggle('player--active');
}; // we will use this code multiple times , that's why we put it into a function.

let totalScores, currentScore, activePlayer, playing;
//STARTING CONDITION OF THE GAME:
const Init = function () {
  totalScores = [0, 0];
  currentScore = 0; // we always need the variable in our code not only display it through the DOM by assigning text content to dice variable.
  activePlayer = 0; /* we need this var to keep track of the active player , we start assign it to 0 first
because we always start the game with the first player*/
  playing = true;

  scorePlayer1El.textContent = 0;
  scorePlayer2El.textContent = 0;
  currScore1.textContent = 0;
  currScore2.textContent = 0;

  diceImage.classList.add('hidden');
  player1SectionEl.classList.remove('player--winner');
  player2SectionEl.classList.remove('player--winner');
  player2SectionEl.classList.remove('player--active');
  // 2- Set player 1 as the active player.
  player1SectionEl.classList.add('player--active');
}; // Function used for Play again button to not repeat code.

Init();

//Rolling dice functionality :
rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // 1- generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2- display dice
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${dice}.png`;
    // 3- check for rolled 1 : if true , switch to next player
    if (dice !== 1) {
      // Adding to current dice roll:
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // displays current score for active player dynamically based on who is the active player now.
    } else {
      // Switch to next player:
      switchPlayerFnct();
    }
  }
});

// Hold button functionality

holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score.
    totalScores[activePlayer] += currentScore; //we use activePlayer to affect both cases dynamically of both players , whoever is the active one.
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer]; // we displaying it in the big score.
    // 2. Check If player's score is >= 100 .
    if (totalScores[activePlayer] >= 50) {
      //so finish the game .
      playing = false;
      diceImage.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // If lower than 100 switch player.
      switchPlayerFnct();
    }
  }
});

newGameBtn.addEventListener('click', Init);
