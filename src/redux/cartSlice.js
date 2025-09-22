import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id, name, price, quantity}
  order: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload;
      const found = state.items.find(i => i.id === p.id);
      if (found) {
        found.quantity += p.quantity ?? 1;
      } else {
        state.items.push({ ...p, quantity: p.quantity ?? 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const it = state.items.find(i => i.id === id);
      if (it) it.quantity = quantity;
    },
    clearCart: (state) => {
      state.items = [];
    },
    placeOrder: (state, action) => {
      state.order = action.payload;
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;
