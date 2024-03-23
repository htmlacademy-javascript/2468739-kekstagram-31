import { isEscapeKey } from './utils.js';
import { validation } from './validation.js';
import { openPhotoEditor, closePhotoEditor } from './photoEditor.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const fileInputElement =
  uploadFormElement.querySelector('.img-upload__input');
const resetButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsValueElement = uploadFormElement.querySelector('.text__hashtags');
const commentValueElement =
  uploadFormElement.querySelector('.text__description');
const pageBody = document.querySelector('body');

hashtagsValueElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

commentValueElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

const closeForm = () => {
  fileInputElement.value = '';
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

uploadFormElement.addEventListener('input', () => {
  validation(
    uploadFormElement,
    hashtagsValueElement,
    commentValueElement
  );
});

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (
    validation(uploadFormElement, hashtagsValueElement, commentValueElement)
  ) {
    uploadFormElement.submit();
  }
});
