import { apiSlice } from "./";

export const llmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchRestaurants: builder.query({
      query: ({ query, restaurants }) => ({
        url: `api/llm/search-restaurants`,
        method: "GET", // Keep as GET with query params
        params: { query }, // Pass query as URL param
        body: { restaurants }, // Pass restaurants in body
      }),
    }),
    generateMenuDescription: builder.mutation({
      query: (features) => ({
        url: `api/llm/generate-description`,
        method: "POST",
        body: { features },
      }),
    }),
    processInference: builder.mutation({
      query: (data) => ({
        url: `api/llm/inference`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSearchRestaurantsQuery,
  useGenerateMenuDescriptionMutation,
  useProcessInferenceMutation,
} = llmApiSlice;
