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
