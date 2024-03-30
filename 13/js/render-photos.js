const cardTemplateElement = document.querySelector('#picture').content;
const containerElement = document.querySelector('.pictures');

const deletePhotos = () => {
  const photoElements = containerElement.querySelectorAll('.picture');
  photoElements.forEach((photoElement) => photoElement.remove());
};

const renderPhotos = (photos) => {
  deletePhotos();
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments, id }) => {
    const cardElement = cardTemplateElement.cloneNode(true);

    const linkElement = cardElement.querySelector('.picture');
    linkElement.dataset.pictureId = id;

    const imageElement = cardElement.querySelector('.picture__img');
    const likesElement = cardElement.querySelector('.picture__likes');
    const commentsElement = cardElement.querySelector('.picture__comments');

    imageElement.src = url;
    imageElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    fragment.append(cardElement);
  });

  containerElement.append(fragment);
};

export { renderPhotos };
