'use strict';

const MEMENTOS = [];
const BOARD = document.querySelector('.board-container');
const BOARD_MEMENTOS = [];
const GAME_MEMENTOS = [];
const FIRST_CLICK_MEMENTOS = [];

function saveMemento() {
    gGameCopy = deepCopyGame(gGame);
    gBoardCopy = deepCopyBoard(gBoard);
    MEMENTOS.push(BOARD.innerHTML);
    BOARD_MEMENTOS.push(gBoardCopy);
    GAME_MEMENTOS.push(gGameCopy);
    FIRST_CLICK_MEMENTOS.push(gIsFirstClick);
}

function getUndo() {
    if (!gGame.isOn) return;
    const LAST_MEMENTOS = MEMENTOS.pop();
    const LAST_G_GAME = GAME_MEMENTOS.pop();
    const LAST_BOARD = BOARD_MEMENTOS.pop();
    const LAST_CLICK = FIRST_CLICK_MEMENTOS.pop();
    BOARD.innerHTML = LAST_MEMENTOS ? LAST_MEMENTOS : BOARD.innerHTML;
    gIsFirstClick = LAST_CLICK ? LAST_CLICK : gIsFirstClick;
    gGame = LAST_G_GAME ? deepCopyGame(LAST_G_GAME) : gGame;
    gBoard = LAST_BOARD ? deepCopyBoard(LAST_BOARD) : gBoard;
}

function deepCopyBoard(board) {
    var newMat = [];
    for (var i = 0; i < board.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            newMat[i][j] = {
                minesAroundCount: currCell.minesAroundCount,
                isShown: currCell.isShown,
                isMine: currCell.isMine,
                isMarked: currCell.isMarked
            };
        }
    }
    return newMat;
}

function deepCopyGame(game) {
    var newGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    newGame.isOn = game.isOn;
    newGame.shownCount = game.shownCount;
    newGame.markedCount = game.markedCount;
    newGame.secsPassed = game.secsPassed;
    return newGame;
}

function getManual() {
    if (gGame.isOn) return;
    alert(`You can now place your ${gLevel.MINES} mines manually!`)
    gIsManual = true;
    gTotalMinesCount = 0;
}

function setMinesManually(elCell) {
    var currIdx = getCellCoord(elCell.id);
    if (gBoard[currIdx.i][currIdx.j].isMine) return;
    gBoard[currIdx.i][currIdx.j].isMine = true;
    gTotalMinesCount++;
    if (gTotalMinesCount === gLevel.MINES) {
        gIsManual = false;
    }
}