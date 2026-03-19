
**** createListenerMiddleware: 리스너 미들웨어 생성, 특정 action 발생 시 side effect 실행
=> userEffect 와 유사 - redux store 업데이트에 대한 응답으로 로직 실행

e.g. 1) 사용자 정보 조회
const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  actionCreator: fetchUser,
  effect: async (action, listenerApi) => {
    const user = await listenerApi.dispatch(fetchUser(action.payload))
  },
})

e.g. 2) 로그인 성공 후 사용자 정보 조회
listenerMiddleware.startListening({
  actionCreator: loginSuccess,
  effect: async (action, listenerApi) => {
    // 로그인 성공 후 실행
    await listenerApi.dispatch(fetchUserInfo());
  },
});




e.g. 3) 
case1) 로그인 성공 => 사용자 정보, 메뉴, 권한, 알림 연결 등 초기화

listenerMiddleware.startListening({
  actionCreator: loginSuccess,
  effect: async (action, api) => {
    await api.dispatch(fetchMe());
    await api.dispatch(fetchMenu());
  },
});

case2) 로그아웃 시 전체 상태 초기화
listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (_, api) => {
    localStorage.clear();
    api.dispatch(resetStore());
  },
});

case3) 게시글 등록 -> 목록 다시조회
listenerMiddleware.startListening({
  actionCreator: createPostSuccess,
  effect: async (_, api) => {
    api.dispatch(fetchPostList());
  },
});