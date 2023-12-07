import { createSlice } from "@reduxjs/toolkit";
import {
  createACategory,
  getAllCategories,
  removeACategory,
  updateACategory,
} from "../apiRequest";
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: {
      allCategories: null,
      isFetching: false,
      error: false,
      page: 1,
      totalPage: 1,
      limit: 5,
    },
    newCategory: {
      category: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    resetNewCategory: (state) => {
      state.newCategory = {
        category: null,
        isFetching: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createACategory.pending, (state) => {
        state.newCategory.isFetching = true;
        state.newCategory.error = null;
      })
      .addCase(createACategory.fulfilled, (state, action) => {
        state.newCategory.isFetching = false;
        state.newCategory.error = null;
        state.newCategory.category = action.payload;
      })
      .addCase(createACategory.rejected, (state) => {
        state.newCategory.error = true;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.categories.isFetching = true;
        state.categories.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories.isFetching = false;
        state.categories.error = null;
        // Lưu dữ liệu vào state dựa trên trang
        state.categories.allCategories = action.payload.data;
        state.categories.page = action.payload.page;
        state.categories.totalPage = action.payload.totalPage;
        state.categories.limit = action.payload.limit;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.categories.error = true;
      })
      .addCase(removeACategory.pending, (state) => {
        state.categories.isFetching = true;
        state.categories.error = null;
      })
      .addCase(removeACategory.fulfilled, (state) => {
        state.categories.isFetching = false;
        state.categories.error = null;
      })
      .addCase(removeACategory.rejected, (state) => {
        state.categories.error = true;
      })
      .addCase(updateACategory.pending, (state) => {
        state.categories.isFetching = true;
        state.categories.error = null;
      })
      .addCase(updateACategory.fulfilled, (state) => {
        state.categories.isFetching = false;
        state.categories.error = null;
      })
      .addCase(updateACategory.rejected, (state) => {
        state.categories.error = true;
      });
  },
});
export const {} = categorySlice.actions;
export const { resetNewCategory } = categorySlice.actions;
export default categorySlice.reducer;
