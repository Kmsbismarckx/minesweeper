export function gameWinCheck(cells, bombs, flags) {
    return cells.every(item => item.disabled === true)
        && bombs.sort().join(',') === flags.sort().join(',');
}