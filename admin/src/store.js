import { configureStore } from "@reduxjs/toolkit";
//reducers
import { apiSlice } from "./apiSlices/index";
import testReducer from "./slices/testSlice";
import authReducer from "./slices/authSlice";
import alertReducer from "./slices/alertSlice";
import restaurantReducer from "./slices/restaurantSlice";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    testReducer,
    authReducer,
    alertReducer,
    restaurantReducer,
    menuReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],

  devTools: true,
});

// console.log(apiSlice, " appppp");
export default store;
