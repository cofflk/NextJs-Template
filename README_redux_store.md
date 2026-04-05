export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    post: postReducer
  }
})

1. user, auth, post 상태를 하나로 통합
2. 전역 store 생성
3. middleware 자동ㅇ녀결
4. devtools 활성화