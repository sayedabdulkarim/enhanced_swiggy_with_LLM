import { apiSlice } from "./";

const USERS_URL = "api/users";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomePageData: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/getHomePageData`,
      }),
    }),
  }),
});

export const { useGetHomePageDataQuery } = homeApiSlice;
