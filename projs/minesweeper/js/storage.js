'use strict';

const PLAYER_NAME = document.getElementById('name');
const BTN_INSERT = document.getElementById('btnInsert');
const BEST_SCORES = document.getElementById('best');
var bestScores = {
    easy: Infinity,
    medium: Infinity,
    hard: Infinity
};

BTN_INSERT.onclick = function () {
    hideNameFieldset();
    const CURR_NAME = PLAYER_NAME.value;
    const CURR_LEVEL = gCurrLevel;
    const SCORE = gTimer;
    if (localStorage.getItem(`${CURR_NAME}-${CURR_LEVEL}`)) {
        var currValue = localStorage.getItem(`${CURR_NAME}-${CURR_LEVEL}`);
        if (+currValue < SCORE) return;
    }
    localStorage.setItem(`${CURR_NAME}-${CURR_LEVEL}`, SCORE);
    for (var i = 0; i < localStorage.length; i++) {
        const KEY = localStorage.key(i);
        var parts = KEY.split('-');
        if (parts[1] !== currLevel) continue;
        const VALUE = localStorage.getItem(KEY);
        if (+VALUE < bestScores[`${CURR_LEVEL}`]) {
            bestScores[`${CURR_LEVEL}`] = +VALUE;
            var elCurrLevel = document.getElementById(`${CURR_LEVEL}`);
            elCurrLevel.innerText = `${CURR_NAME}- ${VALUE}s`;
        }
    }
};

function showNameFieldset() {
    var elFieldset = document.querySelector('.player-name');
    elFieldset.classList.add('show');
}

function hideNameFieldset() {
    var elFieldset = document.querySelector('.player-name');
    elFieldset.classList.remove('show');
}

function printBestScore() {
    for (var i = 0; i < 3; i++) {
        var currLevel;
        switch (i) {
            case 0: currLevel = 'easy';
                break;
            case 1: currLevel = 'medium';
                break;
            case 2: currLevel = 'hard';
                break;

        }
        for (var j = 0; j < localStorage.length; j++) {
            const KEY = localStorage.key(j);
            var parts = KEY.split('-');
            if (parts[1] !== currLevel) continue;
            const VALUE = localStorage.getItem(KEY);
            if (+VALUE < bestScores[`${currLevel}`]) {
                bestScores[`${currLevel}`] = +VALUE;
                var elCurrLevel = document.getElementById(`${currLevel}`);

                elCurrLevel.innerText = `${parts[0]}- ${VALUE}s`;
            }
        }
    }
}
