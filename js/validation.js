const MAX_COMMENT_LENGTH = 140;

const ErrorMessage = {
  Hashtag: {
    INVALID_HASHTAG: 'введён невалидный хэштег',
    BIG_QUANTITY: 'превышено количество хэштегов',
    REPEAT_HASHTAG: 'хэштеги повторяются',
  },
  Comment: {
    BIG_COMMENT_LENGTH:`длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  }
};

let message = '';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentTextareaElement =
  uploadFormElement.querySelector('.text__description');

const getMessage = () => message;

const pristine = new Pristine(
  uploadFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  },
);

const validateHashtags = (hashtagsString) => {
  const trimmedHashtagString = hashtagsString.trim();
  if (!trimmedHashtagString) {
    return true;
  } else {
    const hashtags = trimmedHashtagString.split(' ');
    if (hashtags.length > 5) {
      message = ErrorMessage.Hashtag.BIG_QUANTITY;
      return false;
    }
    if (
      !hashtags.every(
        (hashtag) => /^#[a-zа-яё0-9]{1,20}$/i.test(hashtag) || hashtag === ''
      )
    ) {
      message = ErrorMessage.Hashtag.INVALID_HASHTAG;
      return false;
    }
    if (
      hashtags.some(
        (value, index, hashtagsArray) => hashtagsArray.indexOf(value) !== index && value !== ''
      )
    ) {
      message = ErrorMessage.Hashtag.REPEAT_HASHTAG;
      return false;
    }
    return true;
  }
};

const validateComment = (commentText) => {
  if (commentText.length > MAX_COMMENT_LENGTH) {
    message = ErrorMessage.Comment.BIG_COMMENT_LENGTH;
    return false;
  }
  return true;
};
pristine.addValidator(
  hashtagsInputElement,
  validateHashtags,
  getMessage
);

pristine.addValidator(
  commentTextareaElement,
  validateComment,
  getMessage
);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {
  hashtagsInputElement,
  commentTextareaElement,
};
