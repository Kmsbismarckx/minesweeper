import {setField} from "./src/setField/setField.js";

function startGame() {
  const level = document.querySelector('.level');
  const form = document.querySelector('form');
  const options = document.querySelectorAll('option');
  const field = document.querySelector('.field')
  let cashedDifficulties = +localStorage.getItem('difficult');

  Array.from(options).forEach(item => {
    console.log(typeof cashedDifficulties)
    item.selected = item.value === cashedDifficulties.toString();
  })

  setField(cashedDifficulties);


  level.addEventListener('change', () => {
    const field = document.querySelector('.field');
    field.classList.remove('win');
    field.classList.remove('lose');
    setField(+level.value);
    localStorage.setItem('difficult', `${level.value}`)
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    field.classList.remove('lose', 'win')
    setField(+localStorage.getItem('difficult'))
  })
}

startGame();