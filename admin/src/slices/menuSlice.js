import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "menu slice",
  restaurantMenuDetails: null,
  categoryModal: false,
  categoryName: "",
};

const menuSlice = createSlice({
  name: "menu slice",
  initialState,
  reducers: {
    setRestaurantMenuDetails: (state, action) => {
      state.restaurantMenuDetails = action.payload;
    },
    setMenuCategoryModal: (state, action) => {
      console.log(action.payload, " ppp");
      state.categoryModal = action.payload;
    },
    setMenuCategory: (state, action) => {
      state.categoryName = action.payload;
    },
    setNewMenuItems: (state, action) => {
      state.restaurantMenuDetails = {
        ...state.restaurantMenuDetails,
        restaurantMenu: {
          ...state.restaurantMenuDetails.restaurantMenu,
          menu: action.payload,
        },
      };
    },
  },
});

export const {
  setRestaurantMenuDetails,
  setMenuCategoryModal,
  setMenuCategory,
  setNewMenuItems,
} = menuSlice.actions;

export default menuSlice.reducer;
