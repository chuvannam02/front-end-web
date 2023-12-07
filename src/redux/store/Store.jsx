import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import userSlice from "../reducer/userSlice";
import cartSlice from "../reducer/cartSlice";
import productSlice from "../reducer/productSlice";
import { productService } from "../../components/ProductForUser/ProductForUser";
import orderSlice from "../reducer/orderSlice";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categorySlice from "../reducer/categorySlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  [productService.reducerPath]: productService.reducer,
  auth: authSlice,
  users: userSlice,
  carts: cartSlice,
  products:productSlice,
  categories:categorySlice,
  orders:orderSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productService.middleware),
});
export let persistor = persistStore(store);