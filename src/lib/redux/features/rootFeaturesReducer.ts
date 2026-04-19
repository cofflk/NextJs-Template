import { combineReducers } from '@reduxjs/toolkit';
import rootUserReducer from './user';
import rootMenuReducer from './menu';

export const rootFeaturesReducer = combineReducers({
  ...rootUserReducer,
  ...rootMenuReducer,
});
export default rootFeaturesReducer;