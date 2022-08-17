import {gameOver} from "../../gameOver/gameOver.js";
import {bombsAround} from "../../bombsAround/bombsAround.js";
import {greed} from "../../greed/greed.js";
import {gameWinCheck} from "../../gameWinCheck/gameWinCheck.js";
import {gameWin} from "../../gameWin/gameWin.js";

export function setEventClick(button, {...args}) {
    let {
        flags,
        field,
        cells,
        bombs,
        isGameOver,
        isGameWin,
        bombsCount,
        size,
        flagsCount
    } = args;

    button.addEventListener('click', (event) => {
        let allCells = new Set();
        let cell = event.target;

        if (cell.tagName !== 'BUTTON') {
            return;
        }

        if (bombs.includes(+cell.id)) {
            isGameOver = true;
            gameOver(bombs, cells, field);
            cells.forEach((item) => item.disabled = true);
        } else if (!cell.classList.contains('flag')) {
            let count = bombsAround(+cell.id, size, bombs).count

            if (count > 0) {
                cell.innerHTML = count;
                cell.classList.add(`number${count}`)
            } else {
                greed(+cell.id, allCells, bombsCount, size, bombs);

                for (const cell of allCells) {
                    greed(cell, allCells, bombsCount, size, bombs)
                }

                cells.forEach((item) => {
                    if (allCells.has(+item.id)) {
                        item.disabled = true;
                        item.innerHTML = bombsCount[+item.id] || '';
                        item.classList.add(`number${bombsCount[+item.id] || 0}` )

                        if (flags.includes(+item.id)) {
                            flags.splice(flags.indexOf(+item.id), 1);
                            item.style.backgroundImage = 'none';
                            let count = +flagsCount.textContent;
                            flagsCount.textContent = count + 1;
                        }

                    }
                })
            }

            cell.disabled = true;
        }

        if (gameWinCheck(cells, bombs, flags)) {
            gameWin(cells, isGameWin, field);
        }
    })
}