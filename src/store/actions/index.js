import md5 from 'crypto-js/md5';
import { ADD_PLAYER, GAME, GET_GRAVATAR, GET_TOKEN, LOADING } from './actionsTypes';

export const addPlayer = (name, email) => ({ type: ADD_PLAYER, name, email });
export const playGame = (value) => ({ type: GAME, value });
export const getToken = (value) => ({ type: GET_TOKEN, value });
export const setLoading = () => ({ type: LOADING });
export const setGravatar = (gravatar) => ({ type: GET_GRAVATAR, gravatar });

export function tokenThunk() {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      dispatch(getToken(data.token));
      localStorage.setItem('token', data.token);
      dispatch(setLoading());
    } catch (error) {
      console.error(error);
    }
  };
}

export const getGravatarThunk = (email) => (dispatch) => {
  const url = md5(email).toString();
  return fetch(`https://www.gravatar.com/avatar/${url}`)
    .then((response) => dispatch(setGravatar(response.url)));
};
