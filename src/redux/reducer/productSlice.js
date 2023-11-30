import { createSlice } from "@reduxjs/toolkit";
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
    getProductsStart: (state) => {
      state.products.allProducts = null;
      state.products.isFetching = true;
    },
    getProductsSuccess: (state, action) => {
      state.products.allProducts = action.payload;
      state.products.isFetching = false;
    },
    getProductsFailed: (state) => {
      state.products.error = true;
    },
    getProductStart: (state) => {
      state.product.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.product.Product = action.payload;
      state.product.isFetching = false;
    },
    getProductFailed: (state) => {
      state.product.error = true;
    },
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
