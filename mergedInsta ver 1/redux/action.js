//action : state에 영향을 주는

// export const INIT_TOKEN = 'INIT_TOKEN';
// export const INIT_ID = 'INIT_ID';
// export const INIT_NAME = 'INIT_NAME';

export const INIT_USER = 'INIT_USER';

// export function initToken(token) {
//   return {
//     type: INIT_TOKEN,
//     token: `${token}`,
//   };
// }

export function init_user(token, user_id, name) {
  return {
    type: INIT_USER,
    token: `${token}`,
    user_id: `${user_id}`,
    name: `${name}`,
  };
}

// export function initName(name) {
//   return {
//     type: INIT_NAME,
//     name: `${name}`,
//   };
// }
