import { createPhotos } from './createPhotos.js';
import { renderPhotos } from './renderPhotos.js';
import { addPhotoClickHandler } from './photoModal.js';

const photos = createPhotos();
renderPhotos(photos);
addPhotoClickHandler(photos);
