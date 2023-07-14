// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z';

import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
// import { fetchCatByBreed } from './cat-api';
const refs = {
  input: document.querySelector('.breed-select'),
  dive: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
refs.input.hidden = true;
refs.error.classList.add('visually-hidden');

refs.input.addEventListener('change', fetchCatByBreed);

fetchBreeds()
  .then(data => createInputOptions(data))
  .catch(err => Report.failure(refs.error.textContent))
  .finally(() => refs.loader.classList.add('visually-hidden'));

function createInputOptions(data) {
  data.map(({ reference_image_id, name }) => {
    const options = `<option value = ${reference_image_id} > ${name} </option> `;

    refs.input.insertAdjacentHTML('afterbegin', options);
  });
  refs.input.hidden = false;
}

function fetchCatByBreed(event) {
  refs.loader.classList.remove('visually-hidden');
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
    })
    .catch(error => Report.failure(refs.error.textContent))
    .finally(() => refs.loader.classList.add('visually-hidden'));
}

function createCardCat(data) {
  const { url, breeds } = data;

  let catMarck = breeds
    .map(
      ({ name, temperament, description }) =>
        `<img  class= "catImg" src="${url}" alt="${name}">
        <div class="info">
   <h2 class="name-title"> ${name} </h2>
   <h3 class="description">${description}</h3>
   <h3 class="temperament">Temperament:${temperament}</h3></div>`
    )
    .join();

  return (refs.dive.innerHTML = catMarck);
}
