import {setField} from "./src/setField/setField.js";

function startGame() {
  const level = document.querySelector('.level');
  const form = document.querySelector('form');
  setField(+level.value);

  level.addEventListener('change', () => {
    const field = document.querySelector('.field');
    field.classList.remove('win');
    field.classList.remove('lose');
    setField(+level.value);
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.location.reload();
  })
}

startGame();