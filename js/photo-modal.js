import { isEscapeKey, getPhotoById } from './utils.js';
import {
  resetComments,
  isMaxShowCommentsLength,
  renderComments
} from './render-comments.js';

const modal = document.querySelector('.big-picture');
const modalResetButton = modal.querySelector('.big-picture__cancel');
const commentsLoaderButton = modal.querySelector('.comments-loader');

const hideCommentsLoaderButton = () => {
  commentsLoaderButton.classList.add('hidden');
};

const showCommentsLoaderButton = () => {
  commentsLoaderButton.classList.remove('hidden');
};

const renderBigPhoto = ({ url, description, likes }) => {
  modal.querySelector('.big-picture__img img').src = url;
  modal.querySelector('.social__caption').textContent = description;
  modal.querySelector('.likes-count').textContent = likes;
};

const commentLoaderButtonClickHandler = () => {
  renderComments();
  if (isMaxShowCommentsLength()) {
    hideCommentsLoaderButton();
  }
};

const closeModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  showCommentsLoaderButton();

  commentsLoaderButton.removeEventListener('click', commentLoaderButtonClickHandler);

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
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', documentKeydownHandler);

    const photo = getPhotoById(Number(cardElement.dataset.pictureId), photos);
    renderBigPhoto(photo);

    renderComments(photo.comments);
    if (isMaxShowCommentsLength()) {
      hideCommentsLoaderButton();
    }

    commentsLoaderButton.addEventListener('click', commentLoaderButtonClickHandler);
  }
};

modalResetButton.addEventListener('click', () => {
  closeModal();
  document.removeEventListener('keydown', documentKeydownHandler);
});

export { openModal };
