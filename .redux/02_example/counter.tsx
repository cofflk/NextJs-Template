// redux 사용 예제

import React from 'react'
import type { RootState } from './store'
// import { useSelector, useDispatch } from 'react-redux'
import { useAppSelector, useAppDispatch } from './hooks' // hooks 에서 지정한 타입을 사용
import { decrement, increment } from './counterSlice'

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  // omit rendering logic
}