import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios.get(`/breeds/`).then(response => {
    if (response.status !== 200) {
      throw Error(`error`);
    }
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(respons => {
    if (respons.status !== 200) {
      throw Error(`error`);
    }

    return respons.data;
  });
}
