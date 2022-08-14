export function bombsAround(index, size, bombs) {
    let count = 0;
    let aroundCells = [];

    if (index % size === 1) {
        aroundCells.push(
            index + 1,
            index - size, index - (size - 1),
            index + size, index + (size + 1)
        )

    }
    else if (index % size === 0) {
        aroundCells.push(
            index - 1,
            index - (size + 1), index - size,
            index + (size - 1), index + size
        )
    } else {
        aroundCells.push(
            index - 1, index + 1,
            index - (size + 1), index - size, index - (size - 1),
            index + (size - 1), index + size, index + (size + 1)
        )
    }

    aroundCells.sort((a, b) => a - b);

    for (let i = 0; i < aroundCells.length; i++) {

        for (let j = 0; j < bombs.length; j++) {

            if (aroundCells[i] === bombs[j]) count++;

        }

    }
    console.log(1)
    return count;
}