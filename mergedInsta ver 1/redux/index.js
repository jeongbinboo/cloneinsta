//reducer 저장소, 전역상태
//rootReducer

import {combineReducers} from 'redux';

import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
