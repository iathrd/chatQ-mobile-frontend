import http from '../../helpers/http';

export default {
  getUser: (token) => ({
    type: 'GET_USER',
    payload: http(token).get('auth/getUser'),
  }),
  getUsers: (token, search='') => ({
    type: 'GET_USERS',
    payload: http(token).get('auth/getUsers', {params: {search: search}}),
  }),
};
