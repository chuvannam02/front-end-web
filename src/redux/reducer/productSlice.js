import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../apiRequest";
const initialState = {
  product: {
    Product: null,
    isFetching: false,
    error: false,
  }
};
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: {
      allProducts: null,
      isFetching: false,
      error: false,
      page: 1,
      totalPage: 1,
      limit: 5,
    },
    product: {
      Product: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    reset1(state) {
      Object.assign(state, initialState);
    },
    // getProductsStart: (state) => {
    //   state.products.allProducts = null;
    //   state.products.isFetching = true;
    // },
    // getProductsSuccess: (state, action) => {
    //   state.products.allProducts = action.payload;
    //   state.products.isFetching = false;
    // },
    // getProductsFailed: (state) => {
    //   state.products.error = true;
    // },
    // getProductStart: (state) => {
    //   state.product.isFetching = true;
    // },
    // getProductSuccess: (state, action) => {
    //   state.product.Product = action.payload;
    //   state.product.isFetching = false;
    // },
    // getProductFailed: (state) => {
    //   state.product.error = true;
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createACategory.pending, (state) => {
      //   state.newCategory.isFetching = true;
      //   state.newCategory.error = null;
      // })
      // .addCase(createACategory.fulfilled, (state, action) => {
      //   state.newCategory.isFetching = false;
      //   state.newCategory.error = null;
      //   state.newCategory.category = action.payload;
      // })
      // .addCase(createACategory.rejected, (state) => {
      //   state.newCategory.error = true;
      // })
      .addCase(getAllProducts.pending, (state) => {
        state.products.isFetching = true;
        state.products.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products.isFetching = false;
        state.products.error = null;
        // Lưu dữ liệu vào state dựa trên trang
        state.products.allProducts = action.payload.data;
        state.products.page = action.payload.page;
        state.products.totalPage = action.payload.totalPage;
        state.products.limit = action.payload.limit;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.products.error = true;
      });
  },
});
export const {
  getProductsFailed,
  getProductsSuccess,
  getProductsStart,
  getProductStart,
  getProductSuccess,
  getProductFailed,
  reset1
} = productSlice.actions;

export default productSlice.reducer;
