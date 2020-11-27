import http from '../../helpers/http';
import qs from 'querystring';

export default {
  doLogin: (data) => ({
    type: 'LOGIN',
    payload: http().post('auth/createPhone', qs.stringify({phoneNumber: data})),
  }),
};
