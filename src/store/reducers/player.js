const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_PLAYER':
    return action.value;
  default:
    return state;
  }
}

export default player;
