import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRestaurantDetailHeaderStick: false,
  restaurantDetails: null,
};

const restaurantDetailsSlice = createSlice({
  name: "restaurantDetails",
  initialState,
  reducers: {
    setRestaurantDetailsHeaderStick: (state, action) => {
      state.isRestaurantDetailHeaderStick = action.payload;
    },
    setRestaurantDetailsById: (state, action) => {
      console.log(action.payload, " restaurantDetails");
      state.restaurantDetails = action.payload;
    },
  },
});

export const { setRestaurantDetailsById, setRestaurantDetailsHeaderStick } =
  restaurantDetailsSlice.actions;

export default restaurantDetailsSlice.reducer;
