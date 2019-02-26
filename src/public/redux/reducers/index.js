import { combineReducers } from 'redux';

import auth from './auth'
import user from './user'
import note from './note'

const appReducer = combineReducers({
	auth,
	user,
	note
});
  
export default appReducer;