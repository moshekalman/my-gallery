'use strict';

var gFirstCoord;


//cell clicked functions
function cellclicked(ev, elCell) {
    ev = ev || window.event;
    var cellCoord = getCellCoord(elCell.id);
    var currCell = gBoard[cellCoord.i][cellCoord.j];
    if (gIsManual) {
        setMinesManually(elCell);
        return;
    }
    if (gIsFirstClick) {
        saveMemento();
        gFirstCoord = cellCoord;
        gStartingTime = Date.now();
        gTimerInterval = setInterval(setTimer, 30);
        firstClick();
        gGame.isOn = true;
    }
    if (!gGame.isOn) return;
    switch ((ev.which)) {
        case 1: //mouse left click
            if (currCell.isShown || currCell.isMarked) return;
            if (gIsHint && gHintsCount > 0) {
                activateHint(gBoard, cellCoord.i, cellCoord.j);
                return;
            } else {
                saveMemento();
                gElEmoji.innerText = DOUBT_EMO;
                if (currCell.isMine) {
                    gElEmoji.innerText = EXPLODE_EMO;
                    elCell.classList.add('exploded');
                    if (gLivesCount > 1) {
                        gEmoInterval = setTimeout(function () { gElEmoji.innerText = NORMAL_EMO; }, 200);
                        gLivesCount--;
                        currCell.isShown = true;
                        elCell.innerText = MINE;
                        switch (gLivesCount) {
                            case 2:
                                gElLives.innerText = `${LIVE + LIVE + LIVE_DOWN}`;
                                break;
                            case 1:
                                gElLives.innerText = `${LIVE + LIVE_DOWN + LIVE_DOWN}`;
                                break;

                        }
                    } else {
                        gElLives.innerText = `${LIVE_DOWN + LIVE_DOWN + LIVE_DOWN}`;
                        showMines();
                        clearInterval(gTimerInterval);
                        toggleGameOver();
                    }
                } else {
                    setTimeout(function () { 
                        gElEmoji.innerText = NORMAL_EMO; 
                    }, 100);
                    gGame.shownCount++;
                    gBoard[cellCoord.i][cellCoord.j].isShown = true;
                    elCell.classList.add('shown');
                    expandShown(gBoard, elCell, cellCoord.i, cellCoord.j);
                }
            }
            break;
        case 3: // mouse right click
            if (currCell.isShown && !currCell.isMine) return;
            if (!currCell.isMarked) {
                elCell.innerText = FLAG;
                currCell.isMarked = true;
                if (currCell.isMine) gGame.markedCount++;
            } else {
                elCell.innerText = EMPTY;
                currCell.isMarked = false;
                if (currCell.isMine) gGame.markedCount--;
            }
            break;
    }
    checkVictory();
}

//gets coordinates form the cell id
function getCellCoord(strCellId) {
    var parts = strCellId.split('-');
    var coord = {
        i: +parts[1],
        j: +parts[2],
    };
    return coord;

}

//expands if needed
function expandShown(board, elCell, rowIdx, colIdx) {
    var currCell = board[rowIdx][colIdx];
    if (currCell.minesAroundCount > 0) {
        elCell.innerText = currCell.minesAroundCount;
        console.log(currCell.minesAroundCount);
    } else {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i >= board.length) continue;
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (j < 0 || j >= board[0].length) continue;
                if (i === rowIdx && j === colIdx) continue;
                var thisCell = board[i][j];
                // cellclicked(null, currElCell)
                if (thisCell.isMine) continue;
                if (thisCell.isShown) continue;
                if (thisCell.isMarked) continue;
                var currElCell = document.querySelector(`#cell-${i}-${j}`);
                currElCell.classList.add('shown');
                board[i][j].isShown = true;
                if (thisCell.minesAroundCount === 0) {
                    expandShown(board, currElCell, i, j);
                    currElCell.innerText = EMPTY;
                } else {
                    currElCell.innerText = thisCell.minesAroundCount;
                }
                gGame.shownCount++;

            }
        }
        return;
    }
}

function getSafeClick() {
    var elSpan = document.querySelector('.helpers .safe-clicks');
    elSpan.innerText = gSafeClicksCount - 1;
    if (gSafeClicksCount === 0) return;
    var clearCells = getPossibleCells(gBoard);
    if (!clearCells[0]) return;
    var randIdx = getRandomIntInclusive(0, clearCells.length - 1);
    var randCell = clearCells[randIdx];
    console.log(randCell);
    var elRandCell = document.querySelector(`#cell-${randCell.i}-${randCell.j}`);
    elRandCell.classList.add('safe');
    setTimeout(function () { elRandCell.classList.remove('safe'); }, 3000);
    gSafeClicksCount--;
}

function getHint() {
    gIsHint = true;
    if (gHintsCount - 1 === 0) {
        gElHints.innerText = 'No Hints Left!';
    } else {
        gElHints.innerText = 'Hints: ';
        for (var i = 0; i < gHintsCount - 1; i++) {
            gElHints.innerText += HINT;
        }
    }
}

function hideCell(elCell) {
    setTimeout(function () { elCell.innerText = EMPTY; }, 1000);
    console.elCell;
}

function activateHint(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            var thisCell = board[i][j];
            var currElCell = document.querySelector(`#cell-${i}-${j}`);
            if (currElCell.classList.contains('shown') || thisCell.isMarked) continue;
            if (thisCell.isMine) {
                currElCell.innerText = MINE;
            } else {
                currElCell.innerText = thisCell.minesAroundCount;
            }
            if (!currElCell.classList.contains('shown')) {
                hideCell(currElCell);
            }
        }
    }
    gIsHint = false;
    gHintsCount--;
    return;
}


function firstClick() {
    if (!gTotalMinesCount) setMines(gBoard, gLevel.SIZE);
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j].minesAroundCount = getMinesNegsCount(gBoard, i, j);
        }
    }
    gIsFirstClick = false;
    return gBoard;
}

