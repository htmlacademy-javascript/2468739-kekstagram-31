import './form.js';
import { getData } from './api.js';
import { renderPhotos } from './renderPhotos.js';
import { openModal } from './photoModal.js';
import {
  showAlert,
  deleteAlert,
  ALERT_SHOW_TIME,
  AlertTemplateId,
} from './alert.js';

const photosContainer = document.querySelector('.pictures');

getData()
  .then((photos) => {
    renderPhotos(photos);
    photosContainer.addEventListener('click', (evt) => {
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
