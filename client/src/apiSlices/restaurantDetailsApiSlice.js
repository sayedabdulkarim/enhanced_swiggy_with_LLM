import { apiSlice } from ".";

const USERS_URL = "api/users";

export const restaurantDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurantDetailsById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/getRestaurantDetails/${id}`,
      }),
    }),
    addFavoriteRestaurant: builder.mutation({
      query: (restaurantId) => ({
        url: `${USERS_URL}/addFavoriteRestaurant/${restaurantId}`,
        method: "POST",
      }),
    }),
    removeFavoriteRestaurant: builder.mutation({
      query: (restaurantId) => ({
        url: `${USERS_URL}/removeFavoriteRestaurant/${restaurantId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRestaurantDetailsByIdQuery,
  useAddFavoriteRestaurantMutation,
  useRemoveFavoriteRestaurantMutation,
} = restaurantDetailsApiSlice;
