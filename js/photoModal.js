import { isEscapeKey,getPhotoById } from './utils.js';

const DEFAULT_SHOW_COMMENTS_COUNT = 5;
const STEP_SHOW_COMMENTS_COUNT = 5;

const comments = [];
let showCommentsCounter = DEFAULT_SHOW_COMMENTS_COUNT;

const photosContainer = document.querySelector('.pictures');
const modal = document.querySelector('.big-picture');
const closeModalButtonElement = modal.querySelector('.big-picture__cancel');
const commentList = modal.querySelector('.social__comments');
const loaderCommentsButtonElement = modal.querySelector('.comments-loader');

const isMaxShowCommentsLength = () => showCommentsCounter >= comments.length;

const renderComments = () => {
  modal.querySelector('.social__comment-shown-count').textContent =
    comments.length < showCommentsCounter ? comments.length : showCommentsCounter;
  modal.querySelector('.social__comment-total-count').textContent =
    comments.length;
  const showComments = comments.slice(0, showCommentsCounter);

  const commentElements = showComments.map(
    ({ avatar, message, name }) => `<li class="social__comment">
    <img
      class="social__picture"
      src=${avatar}
      alt=${name}
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`
  );

  commentList.innerHTML = commentElements.join();

  if (isMaxShowCommentsLength()) {
    loaderCommentsButtonElement.classList.add('hidden');
    return;
  }
  showCommentsCounter += STEP_SHOW_COMMENTS_COUNT;
};

const renderPhoto = ({ url, description, likes }) => {
  modal.querySelector('.big-picture__img img').src = url;
  modal.querySelector('.social__caption').textContent = description;
  modal.querySelector('.likes-count').textContent = likes;
};

const loaderButtonClickHandler = () => {
  renderComments();
};

const closeModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loaderCommentsButtonElement.classList.remove('hidden');

  loaderCommentsButtonElement.removeEventListener('click', loaderButtonClickHandler);

  commentList.innerHTML = '';
  comments.length = 0;
  showCommentsCounter = DEFAULT_SHOW_COMMENTS_COUNT;
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
    renderPhoto(photo);

    comments.push(...photo.comments);
    renderComments();

    loaderCommentsButtonElement.addEventListener('click', loaderButtonClickHandler);
  }
};

closeModalButtonElement.addEventListener('click', () => {
  closeModal();
  document.removeEventListener('keydown', documentKeydownHandler);
});

export const addPhotoClickHandler = (photos) => {
  photosContainer.addEventListener('click', (evt) => {
    openModal(evt, photos);
  });
};
