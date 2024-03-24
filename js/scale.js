const photoEditor = document.querySelector('.img-upload__overlay');

const smallerScaleElement = photoEditor.querySelector('.scale__control--smaller');
const biggerScaleElement = photoEditor.querySelector('.scale__control--bigger');
const scaleValueElement = photoEditor.querySelector('.scale__control--value');
const previewImageElement = photoEditor.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

const renderScale = (newValue) => {
  scaleValueElement.value = `${newValue}%`;
  previewImageElement.style.transform = `scale(${newValue / 100})`;
};

const changeScale = (step) => {
  const newValue = parseInt(scaleValueElement.value, 10) + parseInt(step, 10);
  if (newValue >= SCALE_MIN && newValue <= SCALE_MAX) {
    renderScale(newValue);
  }
};

smallerScaleElement.addEventListener('click', () => {
  changeScale(`-${SCALE_STEP}`);
});

biggerScaleElement.addEventListener('click', () => {
  changeScale(SCALE_STEP);
});

const resetScale = () => {
  renderScale(SCALE_MAX);
};

export { resetScale };
