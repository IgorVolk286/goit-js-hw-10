import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  div: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.select.hidden = true;
refs.error.classList.add('visually-hidden');

fetchBreeds()
  .then(data => createSelectOptions(data))
  .catch(err => Report.failure(refs.error.textContent))
  .finally(() => refs.loader.classList.add('visually-hidden'));

function createSelectOptions(data) {
  let options = data
    .map(({ id, name }) => `<option value =${id}>${name}</option>`)
    .join();
  refs.select.insertAdjacentHTML('beforeend', options);
  refs.select.hidden = false;

  new SlimSelect({
    select: '.breed-select',
    settings: {
      showSearch: true,
      searchText: 'Sorry nothing to see here',
      searchPlaceholder: 'Search for the your favorite cat!',
      searchHighlight: true,
    },
  });
}

refs.select.addEventListener('change', createCardCat);

function createCardCat(event) {
  refs.loader.classList.remove('visually-hidden');

  let idCat = event.target.value;
  // console.log(idCat);

  fetchCatByBreed(idCat)
    .then(data => createMarckUpCardCat(data))
    .catch(error => Report.failure(refs.error.textContent))
    .finally(() => refs.loader.classList.add('visually-hidden'));
}

function createMarckUpCardCat(data) {
  const { url } = data[0];
  const { name, description, temperament } = data[0].breeds[0];

  const catMarkUp = `<img  class= "catImg" src="${url}" alt="${name}">
    <div class="info">
    <h2 class="name-title"> ${name} </h2>
    <h3 class="description">${description}</h3>
    <h3 class="temperament">Temperament:${temperament}</h3></div>`;

  return (refs.div.innerHTML = catMarkUp);
}
