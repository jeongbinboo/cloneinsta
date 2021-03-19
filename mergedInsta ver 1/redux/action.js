//action : state에 영향을 주는

export const INIT_TOKEN = 'INIT_TOKEN';
export const INIT_ID = 'INIT_ID';
export const INIT_NAME = 'INIT_NAME';

export function initToken(token) {
  return {
    type: INIT_TOKEN,
    token: `${token}`,
  };
}

export function initId(user_id) {
  return {
    type: INIT_ID,
    user_id: `${user_id}`,
  };
}

export function initName(name) {
  return {
    type: INIT_NAME,
    name: `${name}`,
  };
}
