import http from '../../helpers/http';

export default {
  getChat: (token) => ({
    type: 'GET_CHAT',
    payload: http(token).get('message/chatList'),
  }),
  loadChat: (token, link) => ({
    type: 'LOAD_CHAT',
    payload: http(token).get(link),
  }),
  saveChat: (data) => ({
    type: 'SAVE_CHAT',
    payload: data,
  }),
};
