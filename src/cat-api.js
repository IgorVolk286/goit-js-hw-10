// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z';

export function fetchBreeds() {
  return fetch(
    'https://api.thecatapi.com/v1/breeds?api-key=live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z'
  ).then(response => {
    if (!response.ok) {
      throw Error(`error`);
    }
    return response.json();
  });
}
