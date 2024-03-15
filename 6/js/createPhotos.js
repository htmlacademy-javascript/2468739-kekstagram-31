import {NAMES, MESSAGES} from './data';
import {getRandomPositiveInteger, getRandomArrayElement, createConsecutiveIntegersGenerator} from './util.js';

const QUANTITY_PHOTOS = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const QUANTITY_AVATARS = 6;

const getCommentId = createConsecutiveIntegersGenerator();
const getPhotoId = createConsecutiveIntegersGenerator();

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, QUANTITY_AVATARS)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (el, i) => ({
  id: getPhotoId(),
  url: `photos/${i + 1}.jpg`,
  description: `Фотография №${i + 1}`,
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    {length: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS)},
    createComment
  ),
});

export const createPhotos = () => Array.from({length: QUANTITY_PHOTOS}, createPhoto);
