import { isEscapeKey } from './utils.js';
import { validation, resetValidation } from './validation.js';
import { openPhotoEditor, closePhotoEditor } from './photoEditor.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const fileInputElement =
  uploadFormElement.querySelector('.img-upload__input');
const resetButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsValueElement = uploadFormElement.querySelector('.text__hashtags');
const commentValueElement =
  uploadFormElement.querySelector('.text__description');
const pageBody = document.querySelector('body');

const closeForm = () => {
  fileInputElement.value = '';
  uploadFormElement.reset();
  resetValidation();
  closePhotoEditor();
  pageBody.classList.remove('modal-open');
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsValueElement || document.activeElement === commentValueElement) {
      evt.stopPropagation();
    }
    closeForm();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const openForm = () => {
  openPhotoEditor();
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
};

fileInputElement.addEventListener('change', () => {
  openForm();
});

resetButtonElement.addEventListener('click', () => {
  closeForm();
  document.removeEventListener('keydown', documentKeydownHandler);
});

validation(
  hashtagsValueElement,
  commentValueElement
);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (
    validation(hashtagsValueElement, commentValueElement)
  ) {
    uploadFormElement.submit();
  }
});
