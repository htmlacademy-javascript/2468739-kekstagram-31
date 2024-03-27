const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (url, method = Method.GET, body = null) => fetch(
  url,
  {
    method: method,
    body: body,
  }
)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error();
  });

const getData = () => load(
  `${BASE_URL}${Route.GET_DATA}`
);

const sendData = (body) => load(
  `${BASE_URL}${Route.SEND_DATA}`,
  Method.POST,
  body
);

export {
  getData,
  sendData
};
