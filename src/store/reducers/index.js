import { combineReducers } from 'redux';
import game from './game';
import player from './player';
import token from './token';

const rootReducer = combineReducers({ game, player, token });

export default rootReducer;
