// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z';

import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
// import { fetchCatByBreed } from './cat-api';

const input = document.querySelector('.breed-select');
const dive = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

input.addEventListener('change', fetchCatByBreed);

fetchBreeds()
  .then(data => createInputOptions(data))

  .catch(err => {
    console.log(`Error`);
  })
  .finally();

function createInputOptions(data) {
  data.map(({ reference_image_id, name }) => {
    const options = `<option value = ${reference_image_id} > ${name} </option> `;

    input.insertAdjacentHTML('afterbegin', options);
  });
}

function fetchCatByBreed(event) {
  const idCat = event.currentTarget.value;
  console.log(idCat);
  return fetch(
    `https://api.thecatapi.com/v1/images/${idCat}?api-key=live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z`
  )
    .then(respons => {
      return respons.json();
    })

    .then(data => {
      createCardCat(data);
    });
}

function createCardCat(data) {
  const { url, breeds } = data;

  const rt = breeds
    .map(
      ({ name, temperament, description }) =>
        `<img src="${url}" alt="${name}">
   <h2>${name}</h2>
   <h3>${description}</h3>
   <h3>${temperament}</h3>`
    )
    .join();

  return (dive.innerHTML = rt);
}
