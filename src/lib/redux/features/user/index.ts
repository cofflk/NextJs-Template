// import { combineReducers } from '@reduxjs/toolkit'
// import userReducer from './userSlice'
// // export type RootState = ReturnType<typeof rootReducer>
// const rootUserReducer  = combineReducers({
//     user: userReducer,
//   })
// export default rootUserReducer;
// ================================
import userReducer from './userSlice';
export const rootUserReducer = {
  user: userReducer,
}
export default rootUserReducer;