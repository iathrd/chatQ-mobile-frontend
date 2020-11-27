import {combineReducers} from 'redux';

import auth from './auth';
import createprofile from './createprofile';
import getchat from './getchat';
import getmessage from './getmessage';
import sendmessage from './sendmessage';
import getuser from './getuser';

export default combineReducers({
  auth,
  createprofile,
  getchat,
  getmessage,
  sendmessage,
  getuser,
});
