import { apiSlice } from ".";

const USERS_URL = "api/admin";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersDetailsFromRestaurantId: builder.query({
      query: (restaurantId) => ({
        url: `${USERS_URL}/ordersdetails/${restaurantId}`,
      }),
    }),
    updateOrderItemStatus: builder.mutation({
      query: ({ restaurantId, payload }) => ({
        url: `${USERS_URL}/updateOrderStatus/${restaurantId}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetOrdersDetailsFromRestaurantIdQuery,
  useUpdateOrderItemStatusMutation,
} = ordersApiSlice;
