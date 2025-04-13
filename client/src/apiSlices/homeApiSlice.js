import { apiSlice } from "./";

const USERS_URL = "api/users";
const LLM_URL = "api/llm";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomePageData: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/getHomePageData`,
      }),
    }),
    getPersonalizedRecommendations: builder.query({
      query: (userId) => ({
        url: `${LLM_URL}/personalized-recommendations`,
        params: { userId },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetHomePageDataQuery,
  useGetPersonalizedRecommendationsQuery,
} = homeApiSlice;
