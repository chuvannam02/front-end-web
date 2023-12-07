import { createSlice } from "@reduxjs/toolkit";
import { getAllOrder } from "../apiRequest";
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: {
      allOrders: null,
      isFetching: false,
      error: false,
      page: 1,
      totalPage: 1,
      limit: 5,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.orders.isFetching = true;
        state.orders.error = null;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.orders.isFetching = false;
        state.orders.error = null;
        // Lưu dữ liệu vào state dựa trên trang
        state.orders.allOrders = action.payload.data;
        state.orders.page = action.payload.page;
        state.orders.totalPage = action.payload.totalPage;
        state.orders.limit = action.payload.limit;
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.orders.error = true;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
