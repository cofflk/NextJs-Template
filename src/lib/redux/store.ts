import { configureStore, combineReducers } from '@reduxjs/toolkit'

// slice
// import userReducer from './features/user/userSlice';
import rootFeaturesReducer from './features/rootFeaturesReducer';
import rootServicesReducer from './services/rootServicesReducer';

const rootReducer = combineReducers({
  rootFeaturesReducer,
  rootServicesReducer
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
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