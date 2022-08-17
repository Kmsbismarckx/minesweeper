export function gameWin(cells, isGameWin, field) {
    isGameWin = true;
    cells.every(cell => cell.disabled = true)
    field.classList.add('win')
}