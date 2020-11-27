import http from '../../helpers/http';

export default {
  getMessage: (token, id, page) => ({
    type: 'GET_MESSAGE',
    payload: http(token).get(`message/chatRoom/${id}`, {params: {page: page}}),
  }),
};
