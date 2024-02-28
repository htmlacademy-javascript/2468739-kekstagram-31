const QUANTITY_PHOTOS = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const QUANTITY_AVATARS = 6;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Андрей',
  'Артур',
  'Дарья',
  'Владимир',
  'Елизавета',
  'Варвара',
  'Павел',
  'Анна',
  'Никита',
  'Софья',
  'Александр',
  'Наталия',
  'Владислав',
  'Мадина',
  'Екатерина',
];

const getRandomPositiveInteger = (min = 1, max = 1) => {
  const lower = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const createConsecutiveIntegersGenerator = () => {
  let number = 0;

  return function () {
    return ++number;
  };
};

const getRandomArrayElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

const getCommentId = createConsecutiveIntegersGenerator();
const getPhotoId = createConsecutiveIntegersGenerator();

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(QUANTITY_AVATARS)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createPhoto = (el, i) => ({
  id: getPhotoId(),
  upl: `photos/${i + 1}.jpg`,
  description: `Фотография №${i + 1}`,
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    {length: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS)},
    createComment
  ),
});

Array.from({length: QUANTITY_PHOTOS}, createPhoto);
