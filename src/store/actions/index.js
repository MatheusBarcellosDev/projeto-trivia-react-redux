export const addPlayer = (value) => ({ type: 'ADD_PLAYER', value });
export const playGame = (value) => ({ type: 'GAME', value });
export const getToken = (value) => ({ type: 'GET_TOKEN', value });
export const setLoading = () => ({ type: 'LOADING' });

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
