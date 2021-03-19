//데이터 저장소
import {INIT_TOKEN} from './action';
import {INIT_ID} from './action';
import {INIT_NAME} from './action';

const initialState = {
  token: 'none',
  user_id: 'no id',
  name: 'no name',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_TOKEN:
      return {
        token: `${action.token}`,
      };

    case INIT_ID:
      return {
        user_id: `${action.user_id}`,
      };

    case INIT_NAME:
      return {
        name: `${action.name}`,
      };

    default:
      return state;
  }
};

export default userReducer;
