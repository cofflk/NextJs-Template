import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuState {
    menuCode: string;
    menuName: string;
}

const initialState: MenuState = {
    menuCode: "1001",
    menuName: "First Menu",
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<Omit<MenuState, 'menuCode'>>) => {
            state.menuName = action.payload.menuName;
        },

    },
  });
  
  export const { setMenu } = menuSlice.actions;
  
  export default menuSlice.reducer;