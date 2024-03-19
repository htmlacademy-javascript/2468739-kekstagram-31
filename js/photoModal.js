import { isEscapeKey,getPhotoById } from './utils.js';

const DEFAULT_SHOW_COMMENTS_COUNT = 5;
const STEP_SHOW_COMMENTS_COUNT = 5;

const comments = [];
let showCommentsCounter = DEFAULT_SHOW_COMMENTS_COUNT;

const photosContainer = document.querySelector('.pictures');
const photoModal = document.querySelector('.big-picture');
const closeButton = photoModal.querySelector('.big-picture__cancel');
const commentList = photoModal.querySelector('.social__comments');
const commentsLoaderButton = photoModal.querySelector('.comments-loader');

const isMaxShowCommentsLength = () => showCommentsCounter >= comments.length;

const renderComments = () => {
  photoModal.querySelector('.social__comment-shown-count').textContent =
    comments.length < showCommentsCounter ? comments.length : showCommentsCounter;
  photoModal.querySelector('.social__comment-total-count').textContent =
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
    commentsLoaderButton.classList.add('hidden');
    return;
  }
  showCommentsCounter += STEP_SHOW_COMMENTS_COUNT;
};

const renderPhoto = ({ url, description, likes }) => {
  photoModal.querySelector('.big-picture__img img').src = url;
  photoModal.querySelector('.social__caption').textContent = description;
  photoModal.querySelector('.likes-count').textContent = likes;
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePhotoModal();
  }
};

const loaderButtonClickHandler = () => {
  renderComments();
};

const showPhotoModal = (evt, photos) => {
  const cardElement = evt.target.closest('.picture');
  if (cardElement) {
    evt.preventDefault();
    photoModal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', documentKeydownHandler);

    const photo = getPhotoById(Number(cardElement.dataset.pictureId), photos);
    renderPhoto(photo);

    comments.push(...photo.comments);
    renderComments();

    commentsLoaderButton.addEventListener('click', loaderButtonClickHandler);
  }
};

const hidePhotoModal = () => {
  photoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoaderButton.classList.remove('hidden');

  document.removeEventListener('keydown', documentKeydownHandler);
  commentsLoaderButton.removeEventListener('click', loaderButtonClickHandler);

  commentList.innerHTML = '';
  comments.length = 0;
  showCommentsCounter = DEFAULT_SHOW_COMMENTS_COUNT;

};

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  hidePhotoModal();
});

export const addPhotoClickHandler = (photos) => {
  photosContainer.addEventListener('click', (evt) => {
    showPhotoModal(evt, photos);
  });
};
