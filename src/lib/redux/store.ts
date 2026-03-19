import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/user/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']

// // Define a reusable type describing thunk functions
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action
// >