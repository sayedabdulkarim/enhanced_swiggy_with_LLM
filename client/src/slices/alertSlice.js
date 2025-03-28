import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAlert: false,
  type: null,
  content: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.isAlert = true;
      state.type = action.payload.type;
      state.content = action.payload.content;
    },
    resetAlert: (state) => {
      state.isAlert = false;
      state.type = null;
      state.content = null;
    },
    testAlert: () => console.log("Helllo"),
  },
});

export const { setAlert, resetAlert, testAlert } = alertSlice.actions;

// Thunk to handle showing and auto-hiding the alert
export const showAlertWithTimeout =
  (type, content, timeout = 2000) =>
  (dispatch) => {
    console.log("hello");
    dispatch(setAlert({ type, content }));
    setTimeout(() => {
      dispatch(resetAlert());
    }, timeout);
  };
// export const showAlertWithTimeout = (type, content, timeout) =>
//   console.log({ type, content, timeout }, "called");

export default alertSlice.reducer;
