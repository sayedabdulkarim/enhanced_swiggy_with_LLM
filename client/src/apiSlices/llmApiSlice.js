import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "api/llm"; // If your API is on the same domain, leave this empty

export const llmApiSlice = createApi({
  reducerPath: "llmApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchRestaurants: builder.query({
      query: (query) => ({
        url: `api/llm/search-restaurants`,
        method: "GET",
        params: { query },
      }),
    }),
  }),
});

export const { useSearchRestaurantsQuery } = llmApiSlice;
