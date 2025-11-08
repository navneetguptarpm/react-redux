import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import filterReducer from "../redux/filterSlice";
import productReducer from "../redux/productSlice";

const reduxStore = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filterReducer,
    products: productReducer,
  },
});

export default reduxStore;
