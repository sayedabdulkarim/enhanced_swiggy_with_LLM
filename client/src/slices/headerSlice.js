import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Header Slice",
  isOpenAddressDrawer: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    openAddressDrawer: (state) => {
      state.isOpenAddressDrawer = true; // Handler for opening the drawer
    },
    closeAddressDrawer: (state) => {
      state.isOpenAddressDrawer = false; // Handler for closing the drawer
    },
  },
});

export const { openAddressDrawer, closeAddressDrawer } = headerSlice.actions;

export default headerSlice.reducer;
