import {setEventClick} from "../events/setEventClick/setEventClick.js";
import {setEventContextmenu} from "../events/setEventContextmenu/setEventContextmenu.js";

export function setField(size) {
    const mines = Math.round(Math.pow(size, 1));
    const field = document.querySelector('.field');
    const flagsCount = document.querySelector('.flags__count')
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
    console.log(bombs)
    let bombsCount = {};

    flagsCount.textContent = bombs.length;

    cells.forEach((button, i) => {
        button.id = `${i + 1}`;

        setEventClick(button, {
            flags,
            field,
            cells,
            bombs,
            isGameOver,
            isGameWin,
            bombsCount,
            flagsCount,
            size
        })

        setEventContextmenu(button, {
            flags, cells, bombs, isGameWin, isGameOver, field, flagsCount
        })
    });
}