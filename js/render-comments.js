const commentList = document.querySelector('.social__comments');
const showCommentCountElement = document.querySelector('.social__comment-shown-count');
const totalCommentCountElement = document.querySelector('.social__comment-total-count');

const STEP_SHOW_COMMENTS_COUNT = 5;

const totalComments = [];
let showCommentsCounter = 0;

const isMaxShowCommentsLength = () => showCommentsCounter >= totalComments.length;

const createCommentElement = (avatar, message, name) => {
  const commentElement = document.createElement('li');
  const imageElement = document.createElement('img');
  const textElement = document.createElement('p');

  commentElement.append(imageElement);
  commentElement.append(textElement);

  commentElement.classList.add('social__comment');
  imageElement.classList.add('social__picture');
  textElement.classList.add('social__text');

  imageElement.setAttribute('src', avatar);
  imageElement.setAttribute('alt', name);
  imageElement.setAttribute('width', 35);
  imageElement.setAttribute('height', 35);

  textElement.textContent = message;

  return commentElement;
};

const renderComments = (comments = totalComments) => {
  showCommentsCounter += STEP_SHOW_COMMENTS_COUNT;
  if (totalComments.length === 0) {
    totalComments.push(...comments);
  }
  commentList.innerHTML = '';
  showCommentCountElement.textContent =
    comments.length < showCommentsCounter ? comments.length : showCommentsCounter;
  totalCommentCountElement.textContent =
    comments.length;
  const showComments = comments.slice(0, showCommentsCounter);

  showComments.forEach(({ avatar, message, name }) => {
    const commentElement = createCommentElement(avatar, message, name);
    commentList.append(commentElement);
  });
};

const resetComments = () => {
  commentList.innerHTML = '';
  totalComments.length = 0;
  showCommentsCounter = 0;
};

export {
  resetComments,
  renderComments,
  isMaxShowCommentsLength,
};
