import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowBottomStickMenu: false,
};

const menuBottomSlice = createSlice({
  name: "menuBottomSlice",
  initialState,
  reducers: {
    setMenuBottomSlice: (state, action) => {
      state.isShowBottomStickMenu = action.payload;
    },
  },
});

export const { setMenuBottomSlice } = menuBottomSlice.actions;

export default menuBottomSlice.reducer;
