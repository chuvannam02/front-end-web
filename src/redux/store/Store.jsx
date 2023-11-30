import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import userSlice from "../reducer/userSlice";
import cartSlice from "../reducer/cartSlice";
import productSlice from "../reducer/productSlice";
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
  auth: authSlice,
  users: userSlice,
  carts: cartSlice,
  products:productSlice,
  categories:categorySlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export let persistor = persistStore(store);