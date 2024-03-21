import { isEscapeKey } from './utils.js';
import { hashtagsInputElement, commentTextareaElement } from './validation.js';

const uploadSectionElement = document.querySelector('.img-upload');
const uploadFileInputElement =
  uploadSectionElement.querySelector('.img-upload__input');
const photoEditor = uploadSectionElement.querySelector('.img-upload__overlay');
const closePhotoEditor = photoEditor.querySelector('.img-upload__cancel');

hashtagsInputElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

commentTextareaElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

const closeForm = () => {
  uploadFileInputElement.value = '';
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

uploadFileInputElement.addEventListener('change', () => {
  openForm();
});

closePhotoEditor.addEventListener('click', () => {
  closeForm();
  document.removeEventListener('keydown', documentKeydownHandler);
});
