import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:8001/",
  baseUrl: "https://swiggy-with-llm-server.vercel.app/",
  prepareHeaders: (headers) => {
    const userInfoRaw = localStorage.getItem("userInfo");

    if (userInfoRaw) {
      const userInfo = JSON.parse(userInfoRaw);
      const token = userInfo?.data?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
