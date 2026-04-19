import { combineReducers } from '@reduxjs/toolkit';
import { pokemonApi1 } from './poke/pokeApi1';
import { pokemonApi2 } from './poke/pokeApi2';

const rootServicesReducer = combineReducers({
    [pokemonApi1.reducerPath]: pokemonApi1.reducer,
    [pokemonApi2.reducerPath]: pokemonApi2.reducer,
})

export default rootServicesReducer