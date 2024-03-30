const STEP_SHOW_COMMENTS_COUNT = 5;
const DEFAULT_SHOW_COMMENTS_COUNT = 5;

const commentListElement = document.querySelector('.social__comments');
const showCommentCountElement = document.querySelector('.social__comment-shown-count');
const totalCommentCountElement = document.querySelector('.social__comment-total-count');

const totalComments = [];
let showCommentsCounter = 0;

const isMaxShowCommentsLength = () => showCommentsCounter >= totalComments.length;

const createCommentElement = (avatar, message, name) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const contentCommentElementTemplate =
   `<img class="social__picture" src=${avatar} alt=${name} width="35" height="35">
   <p class="social__text"></p>`;
  commentElement.insertAdjacentHTML('afterbegin', contentCommentElementTemplate);

  commentElement.lastChild.textContent = message;
  return commentElement;
};

const renderComments = (comments = totalComments) => {
  const fragment = document.createDocumentFragment();
  showCommentsCounter = showCommentsCounter === 0
    ? DEFAULT_SHOW_COMMENTS_COUNT
    : showCommentsCounter + STEP_SHOW_COMMENTS_COUNT;
  if (totalComments.length === 0) {
    totalComments.push(...comments);
  }
  commentListElement.innerHTML = '';
  showCommentCountElement.textContent =
    comments.length < showCommentsCounter ? comments.length : showCommentsCounter;
  totalCommentCountElement.textContent =
    comments.length;
  const showComments = comments.slice(0, showCommentsCounter);

  showComments.forEach(({ avatar, message, name }) => {
    const commentElement = createCommentElement(avatar, message, name);
    fragment.append(commentElement);
  });
  commentListElement.append(fragment);
};

const resetComments = () => {
  commentListElement.innerHTML = '';
  totalComments.length = 0;
  showCommentsCounter = 0;
};

export {
  resetComments,
  renderComments,
  isMaxShowCommentsLength,
};
