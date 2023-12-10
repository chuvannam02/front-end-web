import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productService = createApi({
  reducerPath: "productService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mern-stack-backend-kw0h.onrender.com/api/v1/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1, limit = 5, searchTerm = "") => ({
        url: "product-without-auth/all",
        params: { page, limit, name: searchTerm },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAllProductsQuery } = productService;
