//데이터 저장소
// import {INIT_TOKEN} from './action';
// import {INIT_ID} from './action';
// import {INIT_NAME} from './action';
import {CHANGE_INFO, INIT_USER, SET_BIO} from './action';

const initialState = {
  token: 'none',
  user_id: 'no id',
  name: 'no name',
  bio: 'no bio',
  tab: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USER:
      return {
        ...initialState,
        token: `${action.token}`,
        user_id: `${action.user_id}`,
        name: `${action.name}`,
      };

    case CHANGE_INFO:
      return {
        ...state,
        user_id: `${action.user_id}`,
        name: `${action.name}`,
      };

    case SET_BIO:
      return {
        ...state,
        bio: `${action.bio}`,
      };

    default:
      return state;
  }
};

export default userReducer;
