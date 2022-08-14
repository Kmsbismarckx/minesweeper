export function gameOver(bombs, cells, field) {

    for (let i = 0; i < bombs.length; i++) {

        for (let j = 0; j < cells.length; j++) {

            if (bombs[i] === +cells[j].id) {
                cells[j].classList.add('bomb');
                field.classList.add('lose')
            }

        }

    }
}