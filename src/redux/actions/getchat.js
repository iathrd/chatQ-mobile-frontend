import http from '../../helpers/http';

export default {
  getChat: (token) => ({
    type: 'GET_CHAT',
    payload: http(token).get('message/chatList'),
  }),
};
