const INITIAL_STATE = {
  name: '',
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GAME':
    return action.value;
  default:
    return state;
  }
}

export default game;
