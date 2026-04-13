// root reducer

import { combineReducers } from '@reduxjs/toolkit'
import menuReducer from './menuSlice'

const rootMenuReducer  = combineReducers({
  menu: menuReducer,
})

export default rootMenuReducer 