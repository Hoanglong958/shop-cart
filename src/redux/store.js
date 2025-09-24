import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import checkoutReducer from "./checkoutSlice.js";
import postsReducer from "./postsSlice.js";

// ---- Đọc dữ liệu từ localStorage ----
const loadState = () => {
  try {
    const savedState = localStorage.getItem("appState");
    if (savedState === null) return undefined;
    return JSON.parse(savedState);
  } catch (err) {
    return undefined;
  }
};

// ---- Lưu dữ liệu vào localStorage ----
const saveState = (state) => {
  try {
    
    localStorage.setItem("appState", JSON.stringify(state));
  } catch {}
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
     posts: postsReducer,
  },
  preloadedState: loadState(), // load lại khi khởi động
});

// Lắng nghe thay đổi -> lưu luôn cả cart + checkout
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    checkout: store.getState().checkout,
  });
});

export default store;
