const cardTemplate = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

export const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const cardElement = cardTemplate.cloneNode(true);

    const imageElement = cardElement.querySelector('.picture__img');
    const likesElement = cardElement.querySelector('.picture__likes');
    const commentsElement = cardElement.querySelector('.picture__comments');

    imageElement.src = url;
    imageElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    fragment.append(cardElement);
  });

  container.append(fragment);
};
