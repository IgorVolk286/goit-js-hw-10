// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z';

import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
// import { fetchCatByBreed } from './cat-api';

const input = document.querySelector('.breed-select');
const dive = document.querySelector('.cat-info');
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

    .then(data => {
      createCardCat(data);
    });
}

// console.log(data.breeds);
// console.log(data.url);
// console.log(data);

function createCardCat(data) {
  const { url, breeds } = data;
  const rt = breeds
    .map(el => {
      `<img src="${url}" alt="">
   <h2>${el.name}</h2>
   <h3>${el.temperament}</h3>
   <h3></h3>`;
    })
    .join();
  dive.insertAdjacentHTML('beforeend', rt);
}

//   breeds.map(el => {
//     console.log(el.description);
//     `<img src="${url}" alt="">
// <h2>${name}</h2>
// <h3>${el.temperament}</h3>
// <h3></h3>`;
//   });
