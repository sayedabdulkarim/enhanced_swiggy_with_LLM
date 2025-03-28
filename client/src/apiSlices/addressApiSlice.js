import { apiSlice } from "./";

const USERS_URL = "api/users";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addAddress`,
        method: "POST",
        body: data,
      }),
    }),
    getAddressesByUser: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/getAddressesByUser`,
      }),
    }),
  }),
});

export const { useAddAddressMutation, useGetAddressesByUserQuery } =
  addressApiSlice;
