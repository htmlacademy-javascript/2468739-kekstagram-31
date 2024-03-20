import { isEscapeKey } from './utils.js';

const uploadSectionElement = document.querySelector('.img-upload');
const uploadInputElement =
  uploadSectionElement.querySelector('.img-upload__input');
const photoEditor = uploadSectionElement.querySelector('.img-upload__overlay');
const closePhotoEditor = photoEditor.querySelector('.img-upload__cancel');

const closeForm = () => {
  uploadInputElement.value = '';
  photoEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const openForm = () => {
  photoEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
};

uploadInputElement.addEventListener('change', () => {
  openForm();
});

closePhotoEditor.addEventListener('click', () => {
  closeForm();
  document.removeEventListener('keydown', documentKeydownHandler);
});
