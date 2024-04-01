import { isEscapeKey } from './utils.js';
import { sendData } from './api.js';
import { validation, setValidation, resetValidation } from './validation.js';
import { openPhotoEditor, closePhotoEditor } from './photo-editor.js';
import { showAlert, deleteAlert, AlertTemplateId } from './alert.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...',
};

const uploadFormElement = document.querySelector('.img-upload__form');
const fileInputElement =
  uploadFormElement.querySelector('.img-upload__input');
const resetButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const hashtagsValueElement = uploadFormElement.querySelector('.text__hashtags');
const commentValueElement =
  uploadFormElement.querySelector('.text__description');
const pageBodyElement = document.querySelector('body');

const closeForm = () => {
  fileInputElement.value = '';
  uploadFormElement.reset();
  resetValidation();
  closePhotoEditor();
  pageBodyElement.classList.remove('modal-open');
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsValueElement || document.activeElement === commentValueElement) {
      evt.stopPropagation();
    } else {
      if (!deleteAlert()) {
        closeForm();
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    }
  }
};

const openForm = () => {
  openPhotoEditor(fileInputElement);
  setValidation(uploadFormElement, hashtagsValueElement, commentValueElement);
  pageBodyElement.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};
const unBlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

fileInputElement.addEventListener('change', () => {
  openForm();
});

resetButtonElement.addEventListener('click', () => {
  closeForm();
  document.removeEventListener('keydown', documentKeydownHandler);
});

const documentClickHandler = (evt) => {
  if (
    evt.target.matches('.success')
    || evt.target.matches('.success__button')
    || evt.target.matches('.error')
    || evt.target.matches('.error__button')
  ) {
    deleteAlert();
    document.removeEventListener('keydown', documentKeydownHandler);
    document.removeEventListener('click', documentClickHandler);
  }
};

const setPhotoFormSubmitHandler = () => uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validation()) {
    blockSubmitButton();
    sendData(
      new FormData(evt.target)
    )
      .then(() => {
        closeForm();
        showAlert(AlertTemplateId.SEND_SUCCESS);
      })
      .catch(() => {
        showAlert(AlertTemplateId.SEND_ERROR);
      })
      .finally(() => {
        unBlockSubmitButton();
        document.addEventListener('keydown', documentKeydownHandler);
        document.addEventListener('click', documentClickHandler);
      });
  }
});

export { setPhotoFormSubmitHandler };
