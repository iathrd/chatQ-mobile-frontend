import http from '../../helpers/http';
import qs from 'querystring';

export default {
  createProfile: (data, token) => ({
    type: 'CRETE_PROFILE',
    payload: http(token).post('auth/creteUser', qs.stringify({username: data})),
  }),
  createAvatar: (token, form) => ({
    type: 'CREATE_AVATAR',
    payload: http(token).post('auth/creteUser', form),
  }),
};
