import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      console.log(action.payload);
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          quantity: newItem.quantity,
        });
      } else {
        existingItem.quantity += newItem.quantity;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
