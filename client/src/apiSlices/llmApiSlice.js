import { apiSlice } from "./";

export const llmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchRestaurants: builder.query({
      query: ({ query, restaurants, requestId }) => {
        console.log(
          "Making API request for search:",
          query,
          "Request ID:",
          requestId,
          "Restaurants count:",
          restaurants?.length
        );
        return {
          url: `/api/llm/search-restaurants`,
          method: "POST",
          body: {
            query,
            restaurants,
            requestId,
          },
        };
      },
      // Configure for proper caching and request deduplication
      keepUnusedDataFor: 0, // Don't keep cache for long
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // Better cache key that includes the query text
        return `${endpointName}-${queryArgs.query}-${queryArgs.requestId}`;
      },
      // Simple merge that prefers new data
      merge: (_, newData) => newData,
      // Always fetch when arguments change
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.requestId !== previousArg?.requestId ||
          currentArg?.query !== previousArg?.query
        );
      },
      transformErrorResponse: (response, meta, arg) => {
        console.error("Search API error:", response);
        return response;
      },
      transformResponse: (response, meta, arg) => {
        console.log("Search API response:", response);
        return response;
      },
      async onQueryStarted(
        { query, restaurants, requestId },
        { dispatch, queryFulfilled }
      ) {
        try {
          console.log("Query started for:", query, "ID:", requestId);
          await queryFulfilled;
          console.log("Query completed for:", query, "ID:", requestId);
        } catch (err) {
          console.error(
            "Query failed for:",
            query,
            "ID:",
            requestId,
            "Error:",
            err
          );
        }
      },
    }),

    // New endpoint for Elasticsearch search
    elasticSearchRestaurants: builder.query({
      query: ({ query, requestId }) => {
        console.log(
          "Making API request for Elasticsearch search:",
          query,
          "Request ID:",
          requestId
        );
        return {
          url: `/api/llm/elastic-search`,
          method: "POST",
          body: {
            query,
            requestId,
          },
        };
      },
      // Configure for proper caching and request deduplication
      keepUnusedDataFor: 0, // Don't keep cache for long
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // Better cache key that includes the query text
        return `${endpointName}-${queryArgs.query}-${queryArgs.requestId}`;
      },
      // Simple merge that prefers new data
      merge: (_, newData) => newData,
      // Always fetch when arguments change
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.requestId !== previousArg?.requestId ||
          currentArg?.query !== previousArg?.query
        );
      },
      transformErrorResponse: (response, meta, arg) => {
        console.error("Elasticsearch API error:", response);
        return response;
      },
      transformResponse: (response, meta, arg) => {
        console.log("Elasticsearch API response:", response);
        return response;
      },
      async onQueryStarted({ query, requestId }, { dispatch, queryFulfilled }) {
        try {
          console.log(
            "Elasticsearch query started for:",
            query,
            "ID:",
            requestId
          );
          await queryFulfilled;
          console.log(
            "Elasticsearch query completed for:",
            query,
            "ID:",
            requestId
          );
        } catch (err) {
          console.error(
            "Elasticsearch query failed for:",
            query,
            "ID:",
            requestId,
            "Error:",
            err
          );
        }
      },
    }),

    generateMenuDescription: builder.mutation({
      query: (features) => ({
        url: `/api/llm/generate-description`,
        method: "POST",
        body: { features },
      }),
    }),
    processInference: builder.mutation({
      query: (data) => ({
        url: `/api/llm/inference`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSearchRestaurantsQuery,
  useElasticSearchRestaurantsQuery,
  useGenerateMenuDescriptionMutation,
  useProcessInferenceMutation,
} = llmApiSlice;
