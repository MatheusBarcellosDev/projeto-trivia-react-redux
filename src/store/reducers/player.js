import { ADD_PLAYER, GET_GRAVATAR } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  email: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case GET_GRAVATAR:
    return {
      ...state,
      gravatarEmail: action.gravatar,
    };
  case 'UPDATE_SCORE':
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}

export default player;
