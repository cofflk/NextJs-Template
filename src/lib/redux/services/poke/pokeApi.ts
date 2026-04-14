// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi', // redux store 에 등록하기 위한 이름(저장되는 위치) = store key
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }), // API 기본 URL

  // api 목록 정의
  // builder.query<response type, request type>({ query: (request) => request }) 
  // => 조회 API = (GET)
  // builder.mutation<response type, request type>({ mutation: (request) => request })
  // => 생성, 수정, 삭제 API = (POST, PUT, DELETE)
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;

/* endpoints example
 getPosts: build.query<Post[], void>({
  query: () => '/posts',
})

getPost: build.query<Post, number>({
  query: (id) => `/posts/${id}`,
  providesTags: ['Post'], // 캐시 저장 - 이 데이터는 Post 태그를 가짐
})

addPost: build.mutation<Post, Partial<Post>>({
  query: (body) => ({
    url: '/posts',
    method: 'POST',
    body,
  }),
  invalidatesTags: ['Post'], // 캐시 무효화 - Post 태그를 가진 데이터는 무효화됨 -> getPosts 자동 재요청 (refetch) -> 다시 조회 시 새로운 데이터 조회
})

// 자동생성 hook 사용
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
} = api

============\

page.tsx

const { data, error, isLoading } = useGetPostsQuery()
// 파라미터 조회
const { data } = useGetPostQuery(1)
// 조건부 요청
const { data } = useGetPostQuery(id, {
  skip: !id,
})

const [addPost, { data, isLoading }] = useAddPostMutation()
await addPost({ title: 'hello' })
 */
