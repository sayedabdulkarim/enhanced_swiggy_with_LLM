import { apiSlice } from "./";

const USERS_URL = "api/users";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addOrder`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddOrderMutation } = cartApiSlice;
