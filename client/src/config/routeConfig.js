import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
//auth
import HomeScreen from "../screens/auth/HomeScreen";
import HelpScreen from "../screens/auth/HelpScreen";
import RestaurantDetailsScreen from "../screens/auth/RestaurantDetailsScreen";
import CheckoutScreen from "../screens/auth/Checkout";
import PaymentScreen from "../screens/auth/Payments";
import OrdersScreen from "../screens/auth/Orders";
import FavoritesScreen from "../screens/auth/Favorites";
import SearchScreen from "../screens/auth/Search";
import RecommendationScreen from "../screens/auth/Recommendation";
//unauth
import UnAuthScreen from "../screens/unauth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/auth" element={<UnAuthScreen />} />
      </Route>
      {/* private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="checkout" element={<CheckoutScreen />} />
        <Route path="support" element={<HelpScreen />} />
        <Route path="payments" element={<PaymentScreen />} />
        <Route path="orders" element={<OrdersScreen />} />
        <Route path="favorites" element={<FavoritesScreen />} />
        <Route path="search" element={<SearchScreen />} />
        <Route path="recommendation" element={<RecommendationScreen />} />
        <Route
          path="/restaurant/:name/:id"
          element={<RestaurantDetailsScreen />}
        />
      </Route>
      <Route path="*" element={<h1>404 Component</h1>} />
    </Route>
  )
);
