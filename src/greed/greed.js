import {bombsAround} from "../bombsAround/bombsAround.js";

export function greed(cellIndex, allCells, bombsCount, size, bombs) {
    let {emptyAroundCells, count} = bombsAround(cellIndex, size, bombs);
    if (count === 0) {
        emptyAroundCells.forEach(item => {
            allCells.add(item)
        })
    } else {
        bombsCount[cellIndex] = count;
    }
}