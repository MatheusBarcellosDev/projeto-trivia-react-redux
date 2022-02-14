const INITIAL_STATE = { token: '' };

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_TOKEN':
    return action.value;
  default:
    return state;
  }
}

export default token;