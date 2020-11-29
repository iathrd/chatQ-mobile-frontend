import http from '../../helpers/http';

export default {
  getMessage: (token, id) => ({
    type: 'GET_MESSAGE',
    payload: http(token).get(`message/chatRoom/${id}`),
  }),
  loadMessage: (token, link) => ({
    type: 'LOAD_MESSAGE',
    payload: http(token).get(link),
  }),
};
