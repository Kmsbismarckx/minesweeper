export function gameWinCheck(cells, bombs, flags) {
    return bombs.sort().join(',') === flags.sort().join(',');
}