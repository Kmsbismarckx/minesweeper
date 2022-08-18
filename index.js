import {setField} from "./src/setField/setField.js";

function startGame(key, value) {
  const level = document.querySelector('.level');
  const form = document.querySelector('form');
  const options = document.querySelectorAll('option');
  const field = document.querySelector('.field')
  let cashedDifficulties = +localStorage.getItem('difficult') || 5;

  Array.from(options).forEach(item => {
    item.selected = item.value === cashedDifficulties.toString();
  })

  setField(cashedDifficulties);
  localStorage.setItem('difficult', cashedDifficulties.toString())
  console.log(cashedDifficulties)


  level.addEventListener('change', () => {
    const field = document.querySelector('.field');
    field.classList.remove('win');
    field.classList.remove('lose');
    setField(+level.value);
    localStorage.setItem('difficult', `${level.value}`)
    console.log(localStorage)
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    field.classList.remove('lose', 'win')
    setField(+localStorage.getItem('difficult'))
  })
}

startGame();