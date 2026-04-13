import { configureStore } from '@reduxjs/toolkit'

// slice
// import userReducer from './features/user/userSlice';
import rootReducer from './features/rootReducer';

// api
import { pokemonApi } from './services/poke/pokeApi';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
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