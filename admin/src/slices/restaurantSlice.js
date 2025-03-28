import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "restaurant slice",
  restaurantDetails: null,
};

const restaurantSlice = createSlice({
  name: "restaurant slice",
  initialState,
  reducers: {
    setRestaurantDetails: (state, action) => {
      state.restaurantDetails = action.payload;
    },
  },
});

export const { setRestaurantDetails } = restaurantSlice.actions;

export default restaurantSlice.reducer;
