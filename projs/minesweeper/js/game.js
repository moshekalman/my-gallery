'use strict';
const MINE = '💣';
const FLAG = '🚩';
const EMPTY = ' ';
const HINT = '💡';

const LOSE_EMO = '💀';
const WIN_EMO = '😎';
const DOUBT_EMO = '😯';
const NORMAL_EMO = '🙂';
const LIVE = '💖';
const LIVE_DOWN = '💔';
const EXPLODE_EMO = '🤯';

var gGameCopy;
var gBoardCopy;

var gCurrLevel = 'easy';
var gTotalMinesCount;
var gIsManual;
var gElEmoji = document.querySelector('.emoji');
var gElLives = document.querySelector('.lives');
var gElHints;
var gEmoInterval; //to clear doubt face after win
var gBoard;
var gGame;
var gIsHint;
var gSafeClicksCount;
var gLivesCount;
var gHintsCount;
var gStartingTime;
var gTimerInterval;
var gTimer;
var gElTimer = document.querySelector('.timer');
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gIsFirstClick;
var gPrevLevel = gLevel;


function init() {
    printBestScore();
    gTimer = 0;
    //dissable right click
    document.addEventListener('contextmenu', event => event.preventDefault());
    gIsFirstClick = true;
    gLivesCount = 3;
    gHintsCount = 3;
    gElHints = document.querySelector('.hints');
    gElHints.innerText = `Hints: ${HINT + HINT + HINT}`;
    gSafeClicksCount = 3;
    var elSpan = document.querySelector('.helpers .safe-clicks');
    elSpan.innerText = gSafeClicksCount;
    gElLives.innerText = `${LIVE + LIVE + LIVE}`;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard, '.board-container');
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    gTotalMinesCount = null;
    gGameCopy = deepCopyGame(gGame);
    gBoardCopy = deepCopyBoard(gBoard);
    saveMemento();
}

// resets init with the chosen diff
function resetGame(elCell) {
    hideNameFieldset();
    gCurrLevel = elCell.innerText.toLowerCase();
    clearInterval(gTimerInterval);
    hideModal();
    gElEmoji.innerText = NORMAL_EMO;
    switch (elCell.innerText.toLowerCase()) {
        case 'easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 'medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            break;
        case 'hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            break;
        default:
            gLevel.SIZE = gPrevLevel.SIZE;
            gLevel.MINES = gPrevLevel.MINES;
    }
    gPrevLevel = gLevel;
    init();

}



function buildBoard(SIZE = 4) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }
    return board;
}

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            // var cell = (mat[i][j].isMine) ? MINE : mat[i][j].minesAroundCount; //dev cheats
            var cellCoord = `cell-${i}-${j}`;
            strHTML += `<td class="cell" id="${cellCoord}" onmouseup="cellclicked(event, this)"></td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}



//some modals
function toggleGameOver() {
    clearInterval(gTimerInterval);
    var elModal = document.querySelector('.game-over');
    elModal.classList.toggle('show');
    elModal = document.querySelector('.game-over span');
    elModal.innerText = 'YOU LOST!';
    gGame.isOn = false;
    gElEmoji.innerText = LOSE_EMO;
}

function toggleVictory() {
    console.log('time interval', gTimerInterval);
    clearInterval(gEmoInterval);
    clearInterval(gTimerInterval);
    var elModal = document.querySelector('.game-over');
    elModal.classList.toggle('show');
    elModal = document.querySelector('.game-over span');
    elModal.innerText = 'YOU WON!';
    gElEmoji.innerText = WIN_EMO;
    gGame.isOn = false;
    gElTimer.innerText = `Final Time: ${gTimer}s`;
    showNameFieldset();
}

function hideModal() {
    var elModal = document.querySelector('.game-over');
    elModal.classList.remove('show');

}

function checkVictory() {
    var maxShown = (gLevel.SIZE ** 2) - gLevel.MINES;
    if (gGame.shownCount === maxShown && gGame.markedCount === gLevel.MINES) {
        toggleVictory();
    }
    return;
}

function setTimer() {
    var currTime = Date.now();
    gTimer = (currTime - gStartingTime) / 1000;
    gElTimer.innerText = `Time: ${gTimer}s`;
}




