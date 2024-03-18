import {
  isEscapeKey,
  getRandomPositiveInteger,
  getPhotoById,
} from './utils.js';

const photosContainer = document.querySelector('.pictures');
const photoModal = document.querySelector('.big-picture');
const closeButton = photoModal.querySelector('.big-picture__cancel');
const commentList = photoModal.querySelector('.social__comments');
const countCommentBlock = photoModal.querySelector('.social__comment-count');
const commentsLoaderButton = photoModal.querySelector('.comments-loader');

const renderComments = (comments) => {
  const commentElements = comments.map(
    ({ avatar, message, name }) => `<li class="social__comment">
    <img
      class="social__picture"
      src=${avatar}
      alt=${name}
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`
  );

  commentList.insertAdjacentHTML('afterbegin', commentElements.join());
};

const renderPhoto = ({ url, description, likes, comments }) => {
  photoModal.querySelector('.big-picture__img img').src = url;
  photoModal.querySelector('.social__caption').textContent = description;
  photoModal.querySelector('.likes-count').textContent = likes;

  const showCommentsCount = getRandomPositiveInteger(0, comments.length);
  photoModal.querySelector('.social__comment-shown-count').textContent =
    showCommentsCount;
  photoModal.querySelector('.social__comment-total-count').textContent =
    comments.length;

  const showComments = comments.slice(0, showCommentsCount);
  renderComments(showComments);
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    photoModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentList.innerHTML = '';
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const showPhotoModal = (targetElement, photos) => {
  const cardElement = targetElement.closest('.picture');
  if (cardElement) {
    photoModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    countCommentBlock.classList.add('hidden');
    commentsLoaderButton.classList.add('hidden');

    document.addEventListener('keydown', documentKeydownHandler);

    const photo = getPhotoById(Number(cardElement.dataset.id), photos);
    renderPhoto(photo);
  }
};

const hidePhotoModal = () => {
  photoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentList.innerHTML = '';
  document.removeEventListener('keydown', documentKeydownHandler);
};

closeButton.addEventListener('click', () => {
  hidePhotoModal();
});

export const addPhotoClickHandler = (photos) => {
  photosContainer.addEventListener('click', (evt) => {
    showPhotoModal(evt.target, photos);
  });
};
