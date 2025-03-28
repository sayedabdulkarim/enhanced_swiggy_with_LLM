import { apiSlice } from ".";

const USERS_URL = "api/admin";

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurantMenu: builder.query({
      query: (restaurantId) => ({
        url: `${USERS_URL}/menu/${restaurantId}`,
      }),
    }),
    addCategoryToRestaurant: builder.mutation({
      query: ({ restaurantId, categoryName }) => ({
        url: `${USERS_URL}/menucategory/${restaurantId}`,
        method: "POST",
        body: { categoryName },
      }),
    }),
    addItemToCategory: builder.mutation({
      query: ({ restaurantId, categoryId, data }) => ({
        url: `${USERS_URL}/additem/${restaurantId}/${categoryId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateItemStock: builder.mutation({
      query: ({ restaurantId, itemId, data }) => ({
        url: `${USERS_URL}/updatestock/${restaurantId}/${itemId}`,
        method: "PUT",
        body: data,
      }),
    }),
    bulkUpdateItemStock: builder.mutation({
      query: ({ restaurantId, itemIds, inStock }) => ({
        url: `${USERS_URL}/bulkupdatestock/${restaurantId}`,
        method: "PUT",
        body: { itemIds, inStock },
      }),
    }),
  }),
});

export const {
  useGetRestaurantMenuQuery,
  useAddCategoryToRestaurantMutation,
  useAddItemToCategoryMutation,
  useUpdateItemStockMutation,
  useBulkUpdateItemStockMutation,
} = restaurantApiSlice;
