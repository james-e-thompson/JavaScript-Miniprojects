let keyboardResponse = null;

let guessAWord = function() {
  const wordArray = ['apple', 'bear'];
  function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  return function() {
    if (wordArray.length > 0) {
      let index = randomInt(wordArray.length - 1);
      chosenWord = wordArray[index];
      wordArray.splice(index, 1);
      return chosenWord;
    } else {
      return undefined;
    }
  }
}();

const MAX_WRONG_GUESSES = 6;

class Game {
  init() {
    this.word = guessAWord();
    if (!this.word) {
      this.displayEndMessage();
      return this;
    }
    this.letters = this.word.split('');
    this.incorrectGuessCount = 0;
    this.guesses = [];
    this.blanks = '_'.repeat(this.word.length).split('');
    document.body.style.backgroundColor = 'white';
    this.updateBlanks();
    this.updateGuesses();
    this.updateApples();
    document.addEventListener('keypress', keyboardResponse);
  }

  addKeyboardListener() {

  }

  updateBlanks() {
    let spaceHolder = document.querySelector('#spaces');
    spaceHolder.textContent = this.blanks.join(' ');
  }

  updateGuesses() {
    let guessesHolder = document.querySelector('#guesses');
    guessesHolder.textContent = this.guesses.sort().join(' ');
  }

  displayEndMessage() {
    alert('Sorry, out of words!');
  }

  insertLetter(letter) {
    for (let index = 0; index < this.letters.length; index++) {
      if (this.letters[index] === letter) {
        this.blanks[index] = letter;
      }
    }
  }

  updateApples() {
    let apples = document.querySelector('#apples')
    apples.classList.add(`guess_${this.incorrectGuessCount}`);
  }

  checkForGameEnd() {
    if (!this.blanks.includes('_')) {
      document.body.style.backgroundColor = 'blue';
      document.removeEventListener('keypress', keyboardResponse);
    } else if (this.incorrectGuessCount == 6) {
      document.body.style.backgroundColor = 'red';
      document.removeEventListener('keypress', keyboardResponse);
    }
  }

  addLetter(letter) {
    if (!this.guesses.includes(letter)) {
      this.guesses.push(letter);
      if (this.letters.includes(letter)) {
        this.insertLetter(letter);
        this.updateBlanks();
      } else {
        this.incorrectGuessCount += 1;
        this.updateApples();
      }
      this.updateGuesses();
      this.checkForGameEnd();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let currentGame = new Game();

  keyboardResponse = function(event) {
    let key = event.key;
    if ('a' <= key && key <= 'z') {
      currentGame.addLetter(key);
    }
  }

  currentGame.init();
  document.querySelector('#replay').addEventListener('click', event => {
    event.preventDefault();
    currentGame = new Game();
    currentGame.init();
  })
});
