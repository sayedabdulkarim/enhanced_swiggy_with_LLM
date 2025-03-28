import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Hello TESTTTTTTT",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload, " setCredentialssss");
      state.name = "helloooooooo";
    },
  },
});

export const { setCredentials } = testSlice.actions;

export default testSlice.reducer;
