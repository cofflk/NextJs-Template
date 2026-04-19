// // root reducer

// import { combineReducers } from '@reduxjs/toolkit'
// import menuReducer from './menuSlice'
// const rootMenuReducer  = combineReducers({
//   menu: menuReducer,
// })
// ================================
import menuReducer from './menuSlice'
export const rootMenuReducer = {
  menu: menuReducer,
}
export default rootMenuReducer 