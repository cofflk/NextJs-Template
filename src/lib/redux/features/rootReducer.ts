import { combineReducers } from '@reduxjs/toolkit';
import rootUserReducer from './user';
import rootMenuReducer from './menu';

export const rootReducer = combineReducers({
  user: rootUserReducer,
  menu: rootMenuReducer,
});
export default rootReducer;