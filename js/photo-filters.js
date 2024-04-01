import { renderPhotos } from './render-photos.js';
import { getRandomArrayElement, debounce } from './utils.js';

const RANDOM_PHOTOS_LENGTH = 10;
const RERENDER_DELAY = 500;

const FilterButtonId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');

const showFilters = () => filtersElement.classList.remove('img-filters--inactive');

const toggleActiveClassElement = (clickedButton, currentActiveClassButton) => {
  currentActiveClassButton.classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
};

const renderDefaultPhotos = (photos) => renderPhotos(photos);

const renderRandomPhotos = (photos) => {
  const randomPhotos = [];
  while (randomPhotos.length < RANDOM_PHOTOS_LENGTH) {
    const newElement = getRandomArrayElement(photos);
    if (!randomPhotos.includes(newElement)) {
      randomPhotos.push(newElement);
    }
  }
  renderPhotos(randomPhotos);
};

const comparePhotos = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;

  return commentsB - commentsA;
};

const renderDiscussedPhotos = (photos) => {
  const sortedPhotos = photos.toSorted(comparePhotos);
  renderPhotos(sortedPhotos);
};

const applyCheckedFilter = (photos) => {
  switch (document.activeElement.id) {
    case FilterButtonId.DEFAULT:
      renderDefaultPhotos(photos);
      break;
    case FilterButtonId.RANDOM:
      renderRandomPhotos(photos);
      break;
    case FilterButtonId.DISCUSSED:
      renderDiscussedPhotos(photos);
  }
};

const filterButtonClickHandler = (photos) => {
  applyCheckedFilter(photos);
};

const renderDelay = debounce(filterButtonClickHandler, RERENDER_DELAY);

const setFilterButtonClickHandler =
 (photos) => filtersElement.addEventListener('click', (evt) => {
   if (evt.target.matches('.img-filters__button')) {
     evt.stopPropagation();
     const currentActiveClassButton = filtersElement.querySelector('.img-filters__button--active');
     if (evt.target === currentActiveClassButton) {
       return;
     }
     toggleActiveClassElement(evt.target, currentActiveClassButton);
     renderDelay(photos);
   }
 }
 );

export {
  showFilters,
  setFilterButtonClickHandler,
};
