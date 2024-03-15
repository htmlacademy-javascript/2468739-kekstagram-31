import { createPhotos } from './createPhotos';

export const renderPhotos = () => {
  const elementTemplate = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();
  const block = document.querySelector('.pictures');

  const photos = createPhotos();
  photos.forEach(({ url, description, likes, comments }) => {
    const newItemList = elementTemplate.cloneNode(true);

    const newItemListImg = newItemList.querySelector('.picture__img');
    const newItemListLikes = newItemList.querySelector('.picture__likes');
    const newItemListComments = newItemList.querySelector('.picture__comments');

    newItemListImg.src = url;
    newItemListImg.alt = description;
    newItemListLikes.textContent = likes;
    newItemListComments.textContent = comments.length;

    fragment.append(newItemList);
  });

  block.append(fragment);
};
