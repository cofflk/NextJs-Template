// https://redux-toolkit.js.org/introduction/getting-started#rtk-query

import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react'


목적
- 자동캐싱
- 중복요청 제거
- 로딩/에러 상태 자동 제공
- refetch 자동 처리

사용방법
1. API 정의 = createApi
2. store 등록
3. 컴포넌트 훅 등록