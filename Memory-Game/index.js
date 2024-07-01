const main = document.getElementById("main");
const welcomePage = document.getElementById('welcome-page');
const scoreWindow = document.getElementById('window-score');
const inputName = document.getElementById('input-name');
const btnStart = document.getElementById('btn-start');
const btnRefresh = document.getElementById('btn-refresh');
const btnScore = document.getElementById('btn-score');
const btnCloseScore = document.getElementById('btn-close-score');
const btnInstruction = document.getElementById('btn-instruction');
const instructionWindow = document.getElementById('instruction-window');
const audioMusic = document.getElementById('audio-music');
const audioClick = document.getElementById('audio-click');
const audioCongratulation = document.getElementById('audio-congratulation');
const audioShuffle = document.getElementById('audio-shuffle');
const audioComplete = document.getElementById('audio-complete');
const messageWindow = document.getElementById('message');
const salutGif = document.getElementById('salut');
const resultsContainer = document.getElementById('results-container');

let timerId;

let newMoves = true;
let moves = 0;
let count = 0;
let card1;
let card2;
let endGame = 0;

let userName = '';
const arrImages = [0,0,0,0,1,1,2,2,3,3,3,3,4,4,4,4,5,5,5,5];

instructionWindow.classList.add('instruction-show');
setTimeout(() => {
  instructionWindow.classList.remove('instruction-show');
  inputName.focus();
}, 5000)

btnInstruction.addEventListener('click', () => {
  instructionWindow.classList.add('instruction-show');
});

inputName.addEventListener('input', () => {
  if (inputName.value.length > 0 && /\S/.test(inputName.value)) btnStart.disabled = false;
});

welcomePage.addEventListener('keyup', () => {
  if (event.key === 'Enter' && inputName.value.length > 0 && /\S/.test(inputName.value)) startGame();
});

btnStart.addEventListener('click', () => { startGame(); });

btnRefresh.addEventListener('click', () => {
  audioShuffle.play();
  deleteCards();
});

btnScore.addEventListener('click', () => {
  scoreWindow.classList.add('score__show');
  if (resultsContainer.getElementsByTagName('p').length > 0) {
    for (let i = resultsContainer.getElementsByTagName('p').length - 1; i >= 0; i--) {
      resultsContainer.getElementsByTagName('p')[i].remove();
    }
  }
  if (localStorage.scores) {
    let arr = JSON.parse(localStorage.scores);
    for (let i = 0; i < arr.length; i++) {
      resultsContainer.append(document.createElement('p'));
      resultsContainer.getElementsByTagName('p')[resultsContainer.getElementsByTagName('p').length - 1].textContent = arr[i].name + ': ' + arr[i].score + ' moves'; 
    }
  } else {
    resultsContainer.append(document.createElement('p'));
    resultsContainer.getElementsByTagName('p')[resultsContainer.getElementsByTagName('p').length - 1].textContent = "You don't have any games played yet"; 
  }
});

btnCloseScore.addEventListener('click', () => {
  scoreWindow.classList.remove('score__show');
});

document.body.addEventListener('click', () => {
  if (scoreWindow.className === 'score score__show' && event.target.id !== 'btn-score') {
    scoreWindow.classList.remove('score__show');
  }
  if (instructionWindow.className === 'instruction instruction-show' && event.target.id !== 'btn-instruction') {
    instructionWindow.classList.remove('instruction-show');
    if (welcomePage.classList.value !== 'welcome hide unvisible') inputName.focus();
  }
});

function startGame() {
  createLamps();
  setTimeout(() => {
    document.getElementsByTagName('footer')[0].classList.add('show');
    document.getElementsByTagName('footer')[0].classList.remove('unvisible');
  }, 1000);
  userName = inputName.value;
  welcomePage.classList.add('hide');
  setTimeout(() => {
    welcomePage.classList.add('unvisible');
    createCards();
    audioMusic.play();
  }, 600);
}

function createCards() {
  shuffleCards(arrImages);
  for (let i = 0; i < 20; i++) {
    main.append(document.createElement('div'));
    main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].classList.add('card');

    main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].append(document.createElement('img'));
    main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].getElementsByTagName('img')[main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].getElementsByTagName('img').length - 1].classList.add('card__front');
    main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].getElementsByTagName('img')[main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].getElementsByTagName('img').length - 1].src = 'assets/imges/'+ arrImages[i] +'.jpg';

    main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].append(document.createElement('img'));
    main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].getElementsByTagName('img')[main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].getElementsByTagName('img').length - 1].src = 'assets/imges/lamp.jpg';
  }
  main.classList.add('show');
  main.classList.remove('unvisible');
  timerId = setTimeout(() => {turnCards();}, 7000);
}

function deleteCards() {
  clearTimeout(timerId);
  main.classList.remove('show');
  main.classList.add('hide');
  document.getElementsByTagName('footer')[0].classList.remove('show');
  document.getElementsByTagName('footer')[0].classList.add('hide');
  const cards = main.getElementsByClassName('card');
  for (let i = cards.length - 1; i >= 0; i--) {
    setTimeout(() => {cards[i].remove();}, 500);
  }
  setTimeout(() => {
    createCards();
    document.getElementsByTagName('footer')[0].classList.add('show');
  }, 600);
}

function shuffleCards(arr) {
  arr.sort(() => Math.random() - 0.5);
  moves = 0;
  endGame = 0;
}

function turnCards() {
  const cards = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('turn');

    document.getElementsByClassName('card')[i].addEventListener('click', () => {
      if (newMoves === true) {
        
        if (count === 0 && document.getElementsByClassName('card')[i].classList.value === 'card turn') {
          audioClick.play();
          document.getElementsByClassName('card')[i].classList.remove('turn');
          card1 = document.getElementsByClassName('card')[i];
          count += 1;
          moves += 1;
        }
        if (count === 1 && document.getElementsByClassName('card')[i] !== card1 && document.getElementsByClassName('card')[i].classList.value === 'card turn') {
          audioClick.play();
          document.getElementsByClassName('card')[i].classList.remove('turn');
          card2 = document.getElementsByClassName('card')[i];
          checkCards();
          count += 1;
          moves += 1;
        }
      };
    });

  }
}

function checkCards() {
  newMoves = false;
  setTimeout(() => {
    if (card1.getElementsByClassName('card__front')[0].src === card2.getElementsByClassName('card__front')[0].src) {
      count = 0
      card1 = undefined;
      card2 = undefined;
      newMoves = true;
      audioCongratulation.play();
      endGame += 1;
      if (endGame >= 10) {
        addToLocalStorageScore();
        messageWindow.innerHTML = `Congratulations!<br>You have passed the game.<br>Total moves spent: ${moves}`;
        salutGif.classList.remove('unvisible');
        messageWindow.classList.remove('unvisible');
        setTimeout(() => {audioComplete.play();}, 500);
        setTimeout(() => {
          salutGif.classList.add('unvisible');
          document.body.addEventListener('click', () => {
            if (messageWindow.classList.value === 'message') messageWindow.classList.add('unvisible');
          });
        }, 3000);
      }
    } else {
      card1.classList.add('turn');
      card2.classList.add('turn');
      count = 0
      card1 = undefined;
      card2 = undefined;
      newMoves = true;
    }
  }, 1000);
}

function addToLocalStorageScore() {
  if (localStorage.getItem('scores') === null) {
    let arr = [
      {
        name: userName,
        score: moves,
      },
    ];
    localStorage.scores = JSON.stringify(arr);
  } else {
    let arrAdd = JSON.parse(localStorage.scores);
    arrAdd.push({
      name: userName,
      score: moves,
    });
    arrAdd.sort((x, y) => x.score - y.score);
    if (arrAdd.length >= 10) arrAdd.length = 10;
    localStorage.scores = JSON.stringify(arrAdd);
  }
}

function createLamps() {
  document.body.prepend(document.createElement('div'));
  document.getElementsByTagName('div')[0].classList.add('window-lamps');
  document.getElementsByTagName('div')[0].append(document.createElement('ul'));
  document.getElementsByTagName('ul')[0].classList.add('lamps');
  let lamps = document.getElementsByClassName('lamps')[0];

  for (let i = 0; i < 12; i++) {
    lamps.append(document.createElement('li'));
  }
}
