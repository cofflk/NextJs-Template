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
    isLoggedin: false,
    userId: '',
    empNo: '',
    userName: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
            state.isLoggedin = true;
            state.userId = action.payload.userId;
            state.empNo = action.payload.empNo;
            state.userName = action.payload.userName;
        },
        setUser: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
            state.deptCode = action.payload.deptCode;
            state.deptName = action.payload.deptName;
            state.titleCode = action.payload.titleCode;
            state.titleName = action.payload.titleName;
            state.dutyCode = action.payload.dutyCode;
            state.dutyName = action.payload.dutyName;
            state.jobCode = action.payload.jobCode;
            state.jobName = action.payload.jobName;
        },
        // clearUser: (state) => {
        //     state.isLoggedin = false;
        //     state.userId = '';
        //     state.empNo = '';
        //     state.userName = '';
        // },
        logout: (state) => {
            return initialState;
        },
    },
  });
  
  export const { login, setUser, logout } = userSlice.actions;
  
  export default userSlice.reducer;