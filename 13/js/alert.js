const ALERT_SHOW_TIME = 5000;

const AlertTemplateId = {
  SEND_SUCCESS: '#success',
  SEND_ERROR: '#error',
  GET_DATA_ERROR: '#data-error',
};

const alertElementClasses = [
  'error',
  'success',
  'data-error',
];

const showAlert = (selector) => {
  const errorAlertTemplate = document.querySelector(selector).content;
  const errorAlertElement = errorAlertTemplate.cloneNode(true);
  document.body.append(errorAlertElement);
};

const deleteAlert = () => {
  if (alertElementClasses.includes(document.body.children[document.body.children.length - 1].className)) {
    document.body.children[document.body.children.length - 1].remove();
    return true;
  }
  return false;
};

export {
  showAlert,
  deleteAlert,
  ALERT_SHOW_TIME,
  AlertTemplateId,
};
