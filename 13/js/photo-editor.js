import { Effect } from './constants.js';
import { resetScale } from './scale.js';

const photoEditor = document.querySelector('.img-upload__overlay');
const previewImageElement = photoEditor.querySelector('.img-upload__preview img');
const sliderElement = photoEditor.querySelector('.effect-level__slider');
const sliderValueElement = photoEditor.querySelector('.effect-level__value');
const effectsList = photoEditor.querySelector('.effects__list');

const FILE_TYPES = ['jpeg', 'jpg'];

export const inlineStyles = {
  chrome: 'grayscale(value)',
  sepia: 'sepia(value)',
  marvin: 'invert(value%)',
  phobos: 'blur(valuepx)',
  heat: 'brightness(value)',
};

let selectedEffect = 'none';

sliderValueElement.value = 1;

const renderPreview = (fileChooser) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((extension) => fileName.endsWith(extension))) {
    previewImageElement.src = URL.createObjectURL(file);
  }
};

noUiSlider.create(sliderElement, {
  ...Effect.DEFAULT,
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

const resetEffect = () => {
  sliderElement.parentElement.classList.add('hidden');
  previewImageElement.style.filter = '';
};

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  if (selectedEffect === 'none') {
    sliderElement.parentElement.classList.add('hidden');
  } else {
    sliderElement.parentElement.classList.remove('hidden');
    previewImageElement.style.filter = inlineStyles[selectedEffect].replace('value', sliderValueElement.value);
  }
});

effectsList.addEventListener('change', (evt) => {
  selectedEffect = evt.target.value;
  if (selectedEffect === 'none') {
    resetEffect();
  } else {
    sliderElement.noUiSlider.updateOptions(Effect[selectedEffect.toUpperCase()]);
  }
});

const openPhotoEditor = (fileChooser) => {
  photoEditor.classList.remove('hidden');
  renderPreview(fileChooser);
};

const closePhotoEditor = () => {
  photoEditor.classList.add('hidden');
  resetEffect();
  resetScale();
};

export {
  openPhotoEditor,
  closePhotoEditor,
};
