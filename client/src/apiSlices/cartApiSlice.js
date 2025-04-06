import { apiSlice } from "./";

const USERS_URL = "api/users";
const CARTS_URL = "api/carts";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addOrder`,
        method: "POST",
        body: data,
      }),
    }),
    submitReview: builder.mutation({
      query: ({ orderId, reviewData }) => ({
        url: `${USERS_URL}/submitReview/${orderId}`,
        method: "POST",
        body: reviewData,
      }),
    }),
  }),
});

export const { useAddOrderMutation, useSubmitReviewMutation } = cartApiSlice;
