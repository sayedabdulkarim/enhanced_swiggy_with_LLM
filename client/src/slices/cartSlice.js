import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    items: [],
    totalCost: 0,
    deliveryFee: 0, // You can set a default value or update it dynamically
    platformFee: 0, // Same as above
    gst: 0, // Same as above
    finalCost: 0, //after including platform, gst
  },
  selectedAddress: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const itemIndex = state.cart.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // Item exists, increase the count
        state.cart.items[itemIndex].count += 1;
      } else {
        // Item does not exist, add to the cart with count 1
        state.cart.items.push({ ...action.payload, count: 1 });
      }

      // Update total cost
      state.cart.totalCost = state.cart.items.reduce(
        (total, item) => total + item.count * item.price,
        0
      );
    },

    removeFromcart: (state, action) => {
      const itemIndex = state.cart.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // If count is more than 1, decrease the count
        if (state.cart.items[itemIndex].count > 1) {
          state.cart.items[itemIndex].count -= 1;
        } else {
          // If count is 1, remove the item from the cart
          state.cart.items.splice(itemIndex, 1);
        }
      }

      // Update total cost
      state.cart.totalCost = state.cart.items.reduce(
        (total, item) => total + item.count * item.price,
        0
      );
    },

    updateFeesAndTotal: (state, action) => {
      // Update fees
      state.cart.deliveryFee = action.payload.deliveryFee;
      state.cart.platformFee = action.payload.platformFee;
      state.cart.gst = action.payload.gst;

      // Calculate subtotal from items
      const itemsSubtotal = state.cart.items.reduce(
        (total, item) => total + item.count * item.price,
        0
      );

      // Update total cost
      state.cart.finalCost =
        itemsSubtotal +
        state.cart.deliveryFee +
        state.cart.platformFee +
        state.cart.gst;
    },

    clearItemFromcart: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.itemName !== action.payload.itemName
      );

      // Update total cost
      state.cart.totalCost = state.cart.items.reduce(
        (total, item) => total + item.count * item.price,
        0
      );
    },

    clearCart: (state) => {
      state.cart = initialState.cart;
      state.selectedAddress = initialState.selectedAddress;
    },

    addSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const {
  addTocart,
  removeFromcart,
  updateFeesAndTotal,
  clearItemFromcart,
  clearCart,
  addSelectedAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
