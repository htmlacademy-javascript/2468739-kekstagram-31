import { setPhotoFormSubmitHandler } from './form.js';
import { getData } from './api.js';
import { renderPhotos } from './render-photos.js';
import { openModal } from './view-photo-modal.js';
import {
  showAlert,
  deleteAlert,
  ALERT_SHOW_TIME,
  AlertTemplateId,
} from './alert.js';
import { setFilterButtonClickHandler, showFilters } from './photo-filters.js';

const photosContainerElement = document.querySelector('.pictures');

getData()
  .then((photos) => {
    renderPhotos(photos);
    showFilters();
    setFilterButtonClickHandler(photos);
    photosContainerElement.addEventListener('click', (evt) => {
      openModal(evt, photos);
    });
  })
  .catch(() => {
    showAlert(AlertTemplateId.GET_DATA_ERROR);
    setTimeout(
      () => deleteAlert(),
      ALERT_SHOW_TIME
    );
  });

setPhotoFormSubmitHandler();

