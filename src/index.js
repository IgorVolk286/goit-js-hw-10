// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z';

import { fetchBreeds } from './cat-api';
// import { fetchCatByBreed } from './cat-api';

const input = document.querySelector('.breed-select');
const dir = document.querySelector('.cat-info');
input.addEventListener('change', fetchCatByBreed);

fetchBreeds().then(createInputOptions);

function createInputOptions(data) {
  data.map(({ reference_image_id, name }) => {
    const options = `<option value = ${reference_image_id} > ${name} </option> `;
    // console.log(options);
    // console.log(data);
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
    .then(createCardCat);
}

function createCardCat({ url, breeds }) {
  // console.log(name);
  const marckCard = `<img src="${url}" alt="${breeds.name}" />
  // <h2>${breeds.name}</h2>
  // <h3>${breeds.description}</h3>
  // <h3>${breeds.temperament}</h3>
   `;
  dir.innerHTML = marckCard;
}
