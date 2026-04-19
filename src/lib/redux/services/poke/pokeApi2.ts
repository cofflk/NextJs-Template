// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi2 = createApi({
  reducerPath: 'pokemonApi2', // redux store 에 등록하기 위한 이름(저장되는 위치) = store key
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }), // API 기본 URL

  // api 목록 정의
  // builder.query<response type, request type>({ query: (request) => request }) 
  // => 조회 API = (GET)
  // builder.mutation<response type, request type>({ mutation: (request) => request })
  // => 생성, 수정, 삭제 API = (POST, PUT, DELETE)
  endpoints: (builder) => ({
    getPokemonByName2: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByName2Query } = pokemonApi2;
