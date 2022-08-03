function startGame() {
  const level = document.querySelector('.level');
  const form = document.querySelector('form');
  console.log('start')
  setField(level.value);

  level.addEventListener('change', () => {
    const field = document.querySelector('.field');
    field.classList.remove('win');
    field.classList.remove('lose');
    setField(level.value);
    console.log('set')
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.location.reload();
  })
}

function setField(size) {
  size = +size;
  const mines = Math.round(size * 1.5);
  const field = document.querySelector('.field');
  const cellsCount = Math.pow(size, 2);
  field.innerHTML = '<button class="cell"></button>'.repeat(cellsCount);
  field.style.gridTemplateColumns = `repeat(${size}, 40px)`;

  let isGameOver = false;
  let isGameWin = false;

  const cells = [...field.children];
  cells.forEach((item, i) => item.id = `${i + 1}`);

  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, mines)
    .map((item) => item + 1)
    .sort((a, b) => a - b);
  console.log(bombs)
  const flags = [];

  field.addEventListener('click', (event) => {
    let cell = event.target;

    if (cell.tagName !== 'BUTTON') return;

    if (isBomb(cell.id)) {
      isGameOver = true;
      gameOver();
      cells.forEach((item) => item.disabled = true);
    } else {
      cell.innerHTML = bombsAround(cell.id);
      cell.disabled = true;
    }

    if (gameWinCheck()) {
      gameWin();
    }
  });

  field.addEventListener('contextmenu', (event) => {
    let cell = event.target;

    if (cell.tagName !== 'BUTTON' || cell.textContent !== '' || isGameOver || isGameWin) return;
    event.preventDefault();

    if (flags.includes(+cell.id)) {
      cell.classList.remove('flag');
      flags.splice(flags.indexOf(+cell.id), 1);
      cell.disabled = false;
    } else {
      cell.classList.add('flag');
      flags.push(+cell.id);
      cell.disabled = true;
    }

    if (gameWinCheck()) {
      gameWin();
    }
  })

  function isBomb(index) {
    return bombs.includes(+index);
  }

  function bombsAround(index) {
    console.log(`index ${index}`)
    console.log(`size ${size}`)
    let count = 0;
    let aroundCells = [];

    if (+index % +size === 1) {
      aroundCells.push(
        +index + 1,
        +index - size, +index - (size - 1),
        +index + size, +index + (size + 1)
      )

    }
    else if (+index % +size === 0) {
      aroundCells.push(
        +index - 1,
        +index - (size + 1), +index - size,
        +index + (size - 1), +index + size
      )
    } else {
      aroundCells.push(
        +index - 1, +index + 1,
        +index - (size + 1), +index - size, +index - (size - 1),
        +index + (size - 1), +index + size, +index + (size + 1)
      )
    }

    aroundCells.sort((a, b) => a - b);

    for (let i = 0; i < aroundCells.length; i++) {

      for (let j = 0; j < bombs.length; j++) {

        if (aroundCells[i] === bombs[j]) count++;

      }

    }
    return count;
  }

  function gameOver() {

    for (let i = 0; i < bombs.length; i++) {

      for (let j = 0; j < cells.length; j++) {

        if (bombs[i] === +cells[j].id) {
          cells[j].classList.add('bomb');
          field.classList.add('lose')
        }

      }

    }
  }

  function gameWinCheck() {
    return flags.length !== 0
        && cells.every(item => item.disabled === true)
        && bombs.sort().join('') === flags.sort().join('');
  }

  function gameWin() {
    isGameWin = true;
    field.classList.add('win')
  }
}

startGame();