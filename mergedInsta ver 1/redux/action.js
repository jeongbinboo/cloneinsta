//action : state에 영향을 주는

export const INIT_USER = 'INIT_USER';
export const CHANGE_INFO = 'CHANGE_INFO';
export const SET_BIO = 'SET_BIO';

export function init_user(token, user_id, name) {
  return {
    type: INIT_USER,
    token: `${token}`,
    user_id: `${user_id}`,
    name: `${name}`,
  };
}

export function change_info(user_id, name) {
  return {
    type: CHANGE_INFO,
    user_id: `${user_id}`,
    name: `${name}`,
  };
}

export function set_bio(bio) {
  return {
    type: SET_BIO,
    bio: `${bio}`,
  };
}
