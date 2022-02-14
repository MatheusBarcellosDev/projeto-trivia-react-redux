export const addPlayer = (value) => ({ type: 'ADD_PLAYER', value });
export const playGame = (value) => ({ type: 'GAME', value });

// export function fetchAPI(expense) {
//   return async (dispatch) => {
//     try {
//       dispatch(requestAPI());
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const data = await response.json();
//       if (expense) {
//         dispatch(addExpense(expense, data));
//       } else {
//         dispatch(getCurrencies(data));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }
