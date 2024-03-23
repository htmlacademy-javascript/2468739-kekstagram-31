const SCALE_STEP = 25;

const Effect = {
  'chrome': 'grayscale(value)',
  'sepia': 'sepia(value)',
  'marvin': 'invert(value%)',
  'phobos': 'blur(valuepx)',
  'heat': 'brightness(value)',
};

let selectedEffect = 'none';

const photoEditor = document.querySelector('.img-upload__overlay');

const smallerScaleElement = photoEditor.querySelector('.scale__control--smaller');
const biggerScaleElement = photoEditor.querySelector('.scale__control--bigger');
const scaleValueElement = photoEditor.querySelector('.scale__control--value');
const previewImageElement = photoEditor.querySelector('.img-upload__preview img');

const sliderElement = photoEditor.querySelector('.effect-level__slider');
const sliderValueElement = photoEditor.querySelector('.effect-level__value');
const effectsList = photoEditor.querySelector('.effects__list');

sliderValueElement.value = 1;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format:
  {
    to: function (value) {
      return Number.isInteger(value)
        ? value.toFixed(0)
        : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  if (selectedEffect === 'none') {
    sliderElement.parentElement.classList.add('hidden');
  } else {
    sliderElement.parentElement.classList.remove('hidden');
    previewImageElement.style.filter = Effect[selectedEffect].replace('value', sliderValueElement.value);
  }
});

effectsList.addEventListener('change', (evt) => {
  selectedEffect = evt.target.value;
  switch (selectedEffect) {
    case 'none':
      sliderElement.parentElement.classList.add('hidden');
      previewImageElement.style.filter = '';
      break;
    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions(
        {
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        }
      );
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions(
        {
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        }
      );
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions(
        {
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        }
      );
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions(
        {
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        }
      );
  }
});

const changeScale = (step) => {
  const newValue = parseInt(scaleValueElement.value, 10) + parseInt(step, 10);
  if (newValue >= 25 && newValue <= 100) {
    scaleValueElement.value = `${newValue}%`;
    previewImageElement.style.transform = `scale(${newValue / 100})`;
  }
};

smallerScaleElement.addEventListener('click', () => {
  changeScale(`-${SCALE_STEP}`);
});

biggerScaleElement.addEventListener('click', () => {
  changeScale(SCALE_STEP);
});

const openPhotoEditor = () => photoEditor.classList.remove('hidden');
const closePhotoEditor = () => photoEditor.classList.add('hidden');

export {
  openPhotoEditor,
  closePhotoEditor
};
