// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

// We'll use redux-logger just as an example of adding another middleware
//import logger from 'redux-logger'
// 개발자도구로 대체 가능

// And use redux-batched-subscribe as an example of adding enhancers
// import { batchedSubscribe } from 'redux-batched-subscribe'

// redux-batch: store.dispatch() 하나의 알림으로 여러 액션을 배열 형태로 전달할 수 있습니다 .
// redux-batched-subscribe: 디스패치로 인해 발생하는 구독 알림을 일괄 처리할 수 있도록 해줍니다.

import todosReducer from './slice1/todoReducer'
import visibilityReducer from './slice2/visibilityReducer'

const reducer = {
    todos: todosReducer,
    visibility: visibilityReducer,
}
  
const preloadedState = {
    todos: [
      {
        text: 'Eat food',
        completed: true,
      },
      {
        text: 'Exercise',
        completed: false,
      },
    ],
    visibilityFilter: 'SHOW_COMPLETED',
}

const debounceNotify = _.debounce((notify) => notify())

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers({
        autoBatch: false,
      }).concat(batchedSubscribe(debounceNotify)),
})

/*
*** getDefaultMiddleware: 기본 미들웨어 반환
1) 토큰 재발급 과정을 redux middleware 로 구현
2) API 공통 에러 처리

- https://redux-toolkit.js.org/api/getDefaultMiddleware
- https://chatgpt.com/c/69bac493-d990-8322-9834-ab27d9d84a19

a) 인증은 proxy.ts 에서 처리
b) Redux middleware: (UI 처리를 위한 미들웨어)
- API 요청/응답 표준화
- 에러 처리
- fallback (401 → 로그인 이동)
- 비즈니스 흐름 제어



- 1) 기본 미들웨어에 thunk 와 logger 추가
const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(thunk, logger),
})

- 2)
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // concat, prepend 사용
})



-----------
* getDefaultMiddleware : redux toolkit 의 기본 미들웨어
e.g. )
getDefaultMiddleware({
  serializableCheck: false,  : 실무에서 끄는 이유 = Date, class instance, file 객체 사용 시 warning 발생
}) 

* Immutability Middleware : 불변성 유지를 위한 미들웨어, state를 “직접 수정(mutation)”했는지 감지
- 운영환경은 성능 이슈로 꺼둠
e.g. )
getDefaultMiddleware({
  immutableCheck: false,
}) 

* Serializability Middleware : state 객체를 JSON 으로 직렬화 가능한지 확인
- 운영환경은 성능 이슈로 부분적으로 꺼둠
e.g. )
getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'],
    ignoredPaths: ['auth'],
  },
})








===========================
getDefaultEnhancers: 기본 엔핸서 반환
debounceNotify: 디버그 알림 디바운스 함수

getDefaultMiddleware().concat(logger)
- 기본 미들웨어에 logger 추가

getDefaultEnhancers({
    autoBatch: false,
}).concat(batchedSubscribe(debounceNotify))

- 기본 엔핸서에 debounceNotify 추가

devTools: 개발 도구 활성화 여부
preloadedState: 초기 상태
enhancers: 엔핸서 추가

export default store

*/
