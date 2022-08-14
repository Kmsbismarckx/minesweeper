import {gameOver} from "../gameOver/gameOver.js";
import {bombsAround} from "../bombsAround/bombsAround.js";
import {gameWinCheck} from "../gameWinCheck/gameWinCheck.js";
import {gameWin} from "../gameWin/gameWin.js";

export function setField(size) {
    const mines = Math.round(Math.pow(size, 1.5));
    const field = document.querySelector('.field');
    const cellsCount = Math.pow(size, 2);
    field.innerHTML = '<button class="cell"></button>'.repeat(cellsCount);
    field.style.gridTemplateColumns = `repeat(${size}, 40px)`;

    let isGameOver = false;
    let isGameWin = false;

    let cells = [...field.children];

    const bombs = [...Array(cellsCount).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, mines)
        .map((item) => item + 1)
        .sort((a, b) => a - b);
    const flags = [];

    cells.forEach((button, i) => {
        button.id = `${i + 1}`;

        button.addEventListener('click', (event) => {
            let cell = event.target;

            if (cell.tagName !== 'BUTTON') {
                return;
            }

            if (bombs.includes(+cell.id)) {
                isGameOver = true;
                gameOver(bombs, cells, field);
                cells.forEach((item) => item.disabled = true);
            } else if (!cell.classList.contains('flag')) {
                cell.innerHTML = bombsAround(+cell.id, size, bombs);
                cell.disabled = true;
            }

            if (gameWinCheck(cells, bombs, flags)) {
                gameWin(isGameWin, field);
            }
        })

        button.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            let cell = event.target;

            if (cell.tagName !== 'BUTTON' || cell.textContent !== '' || isGameOver || isGameWin) {
                return;
            }

            if (flags.includes(+cell.id)) {
                cell.classList.remove('flag');
                flags.splice(flags.indexOf(+cell.id), 1);
            } else {
                cell.classList.add('flag');
                flags.push(+cell.id);
            }

            if (gameWinCheck(cells, bombs, flags)) {
                gameWin(isGameWin, field);
            }
        })
    });
}