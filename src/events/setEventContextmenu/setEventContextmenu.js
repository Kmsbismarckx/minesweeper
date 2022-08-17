import {gameWinCheck} from "../../gameWinCheck/gameWinCheck.js";
import {gameWin} from "../../gameWin/gameWin.js";

export function setEventContextmenu(button, {...args}) {
    let {flags, cells, bombs, isGameWin, isGameOver, field, flagsCount} = args;
    button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        let cell = event.target;

        if (cell.tagName !== 'BUTTON' || cell.textContent !== '' || isGameOver || isGameWin) {
            return;
        }

        let count = +flagsCount.textContent

        if (flags.includes(+cell.id)) {
            cell.classList.remove('flag');
            flags.splice(flags.indexOf(+cell.id), 1);
            flagsCount.textContent = count + 1;
        } else {
            cell.classList.add('flag');
            flags.push(+cell.id);
            flagsCount.textContent = count - 1;
        }

        if (gameWinCheck(cells, bombs, flags)) {
            gameWin(cells, isGameWin, field);
        }
    })
}