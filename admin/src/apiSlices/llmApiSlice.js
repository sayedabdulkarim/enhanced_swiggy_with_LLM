import { apiSlice } from ".";

const LLM_URL = "api/llm";

export const llmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateMenuDescription: builder.mutation({
      query: (data) => ({
        url: `${LLM_URL}/generate-description`,
        method: "POST",
        body: data,
      }),
    }),
    processModelInference: builder.mutation({
      query: (data) => ({
        url: `${LLM_URL}/inference`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGenerateMenuDescriptionMutation,
  useProcessModelInferenceMutation,
} = llmApiSlice;
