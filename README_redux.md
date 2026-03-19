##### redux toolkit + nextjs
pnpm install @reduxjs/toolkit react-redux

// redux logger 설치
pnpm add redux-logger
- 로그에 색상 주입, 리덕스 동작을 로그로 확인하는 미들웨어
- redux devtool 이 있으면 안써도됨

##### 1. redux 구성
1. store
  - /src/lib/redux/store.ts
2. slice
  - /src/lib/redux/features/{dir}/{name}Slice.ts






redux 정리 
-------------------
1. slice 파일 생성
- state(상태), reducer(상태를 변경)

2. store 파일 생성
- redux 의 전역 상태 저장소
- 모든 slice 를 모아서 하나의 store 로 합침





------------

// /layout.ts
import { Provider } from "react-redux"




```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 사용자 정보 
export interface UserState {
  isLoggedin: boolean;
  userId: string;
  empNo: string;
  userName: string;
  // optional value
  deptCode?: string;
  deptName?: string;
  titleCode?: string;
  titleName?: string;
  dutyCode?: string;
  dutyName?: string;
  jobCode?: string;
  jobName?: string;
}

const initialState: UserState = {
  userId: '',
  empNo: '',
  userName: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      // setUser: (state, action: PayloadAction<UserState>) => {
      // 특정 json key 를 제외할 경우 omit 사용
      setUser: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
        state.userId = action.payload.userId;
        state.empNo = action.payload.empNo;
        state.userName = action.payload.userName;
        state.isLoggedIn = true;
      },
      clearUser: (state) => {
        state.userId = '';
        state.empNo = '';
        state.userName = '';
      },
      logout: (state) => {
        return initialState;
      },
    },
  });
  
  export const { setUser, clearUser } = userSlice.actions;
  
  export default userSlice.reducer;
```










##### layout.ts
```ts
import React from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
```