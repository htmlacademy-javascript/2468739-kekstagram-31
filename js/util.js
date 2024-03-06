export const getRandomPositiveInteger = (min, max) => {
  const lower = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

export const getRandomArrayElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

export const createConsecutiveIntegersGenerator = () => {
  let number = 0;

  return function () {
    return ++number;
  };
};
