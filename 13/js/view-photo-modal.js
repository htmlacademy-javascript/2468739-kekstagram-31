import { isEscapeKey, getPhotoById } from './utils.js';
import {
  resetComments,
  isMaxShowCommentsLength,
  renderComments
} from './render-comments.js';

const modalElement = document.querySelector('.big-picture');
const modalResetButtonElement = modalElement.querySelector('.big-picture__cancel');
const commentsLoaderButtonElement = modalElement.querySelector('.comments-loader');

const hideCommentsLoaderButton = () => {
  commentsLoaderButtonElement.classList.add('hidden');
};

const showCommentsLoaderButton = () => {
  commentsLoaderButtonElement.classList.remove('hidden');
};

const renderModalPhoto = ({ url, description, likes }) => {
  modalElement.querySelector('.big-picture__img img').src = url;
  modalElement.querySelector('.social__caption').textContent = description;
  modalElement.querySelector('.likes-count').textContent = likes;
};

const commentLoaderButtonClickHandler = () => {
  renderComments();
  if (isMaxShowCommentsLength()) {
    hideCommentsLoaderButton();
  }
};

const closeModal = () => {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  showCommentsLoaderButton();

  commentsLoaderButtonElement.removeEventListener('click', commentLoaderButtonClickHandler);

  resetComments();
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const openModal = (evt, photos) => {
  const cardElement = evt.target.closest('.picture');
  if (cardElement) {
    evt.preventDefault();
    modalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', documentKeydownHandler);

    const photo = getPhotoById(Number(cardElement.dataset.pictureId), photos);
    renderModalPhoto(photo);

    renderComments(photo.comments);
    if (isMaxShowCommentsLength()) {
      hideCommentsLoaderButton();
    }

    commentsLoaderButtonElement.addEventListener('click', commentLoaderButtonClickHandler);
  }
};

modalResetButtonElement.addEventListener('click', () => {
  closeModal();
  document.removeEventListener('keydown', documentKeydownHandler);
});

export { openModal };
