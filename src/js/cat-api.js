import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_prv4XOu3leUjObzOAVoKovC3ofskoeEGLskxizVlxsqKGtyA0btM61dS7Q76ICHU';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios
    .get(`breeds/`)
    .then(response => {
      return response.data;
    })
    .catch(() => {
      Report.failure('Oops! Something went wrong!');
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    })
    .catch(() => {
      Report.failure('Oops! Something went wrong! ');
    });
}
