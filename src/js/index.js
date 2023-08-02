import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Loading, Report } from 'notiflix';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info')
};

Loading.standard('Loading data, please wait...');

const createMarkupCatInfo = (cat) => `
  <div class="container">
    <div class="thumb-pic">
      <img src="${cat.url}" alt="${cat.id}" height="500" />
    </div>
    <div class="thumb">
      <h1>${cat.breeds[0].name}</h1>
      <p>${cat.breeds[0].description}</p>
      <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
    </div>
  </div>`;

const breedSelectChange = (evt) => {
  evt.preventDefault();
  Loading.standard('Loading data, please wait...');

  const breedSelectId = elements.breedSelect.value;

  fetchCatByBreed(breedSelectId)
    .then(cat => {
      Loading.remove();
      elements.catInfo.innerHTML = createMarkupCatInfo(cat);
    })
    .catch(error => {
      console.error(error);
      Report.failure('Oops! Something went wrong!');
      Loading.remove();
    });
};

fetchBreeds()
  .then(data => {
    const option = data
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    elements.breedSelect.innerHTML = option;
    Loading.remove();
    new SlimSelect({
      select: '#selectElement',
    });
    elements.breedSelect.classList.remove("is-hidden")
  })
  .catch(() => {
    Report.failure('Oops! Something went wrong!');
    Loading.remove(); 
  });

elements.breedSelect.addEventListener('change', breedSelectChange);