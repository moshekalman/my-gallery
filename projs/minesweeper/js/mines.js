'use strict';

//set mins at random locations
function setMines(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var emptyCells = getPossibleMineCells(board);
        var randNum = getRandomIntInclusive(0, emptyCells.length - 1);
        var randCell = emptyCells[randNum];
        board[randCell.i][randCell.j].isMine = true;
    }
}

// counts negs for minesAroundCount
function getMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (!board[i][j].isMine) continue;
            count++;
        }
    }
    return count;
}

//gets empty cells for set mines
function getPossibleCells(board) {
    if (!board) return;
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < board[0].length; j++) {
            var cell = row[j];
            var coord = { i, j };
            if (!cell.isMine && !cell.isShown) {
                emptyCells.push(coord);
            }
        }
    }
    return emptyCells;
}

//shows all mines on board
function showMines() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        var row = gBoard[i];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = row[j];
            var elCell = document.querySelector(`#cell-${i}-${j}`);
            if (currCell.isMine) {
                elCell.innerText = MINE;
            }
        }
    }
}

function getMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (!board[i][j].isMine) continue;
            count++;
        }
    }
    return count;
}

function getPossibleMineCells(board) {
    if (!board) return;
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < board[0].length; j++) {
            if (i === gFirstCoord.i && j === gFirstCoord.j) continue;
            var cell = row[j];
            var coord = { i, j };
            if (!cell.isMine && !cell.isShown) {
                emptyCells.push(coord);
            }
        }
    }
    return emptyCells;
}

