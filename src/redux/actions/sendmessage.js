import http from '../../helpers/http';
import qs from 'querystring';

export default {
  sendMessage: (token, data) => ({
    type: 'SEND_MESSAGE',
    payload: http(token).post('message/createMessage', qs.stringify({...data})),
  }),
};
