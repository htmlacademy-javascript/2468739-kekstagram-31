const ALERT_SHOW_TIME = 5000;

const ALERT_ELEMENT_CLASSES = [
  'error',
  'success',
  'data-error',
];

const AlertTemplateId = {
  SEND_SUCCESS: '#success',
  SEND_ERROR: '#error',
  GET_DATA_ERROR: '#data-error',
};

const isAlert = (className) => ALERT_ELEMENT_CLASSES.includes(className);

const getAlertElement = () => {
  const lastChildBody = document.body.children[document.body.children.length - 1];
  return isAlert(lastChildBody.className)
    ? lastChildBody
    : null;
};

const createAlertFragment = (selector) => document.querySelector(selector).content.cloneNode(true);

const showAlert = (selector) => {
  document.body.append(createAlertFragment(selector));
};

const deleteAlert = () => {
  const alertElement = getAlertElement();
  if (alertElement) {
    alertElement.remove();
  }
};

export {
  showAlert,
  deleteAlert,
  ALERT_SHOW_TIME,
  AlertTemplateId,
  getAlertElement
};
