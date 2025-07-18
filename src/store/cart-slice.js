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
    removeItemFromCart(state, action) {
      const { id } = action.payload;
      const itemIndexToRemove = state.items.findIndex((item) => item.id === id);
      state.items.splice(itemIndexToRemove, 1);
    },
    incrementItemQuantity(state, action) {
      const { id } = action.payload;
      const itemToEdit = state.items.find((item) => item.id === id);
      itemToEdit.quantity += 1;
    },
    decrementItemQuantity(state, action) {
      const { id } = action.payload;
      console.log(id);
      const itemToEdit = state.items.find((item) => item.id === id);

      itemToEdit.quantity -= 1;

      // if (itemToEdit.quantity > 1) {
      //   itemToEdit.quantity -= 1;
      // } else {
      //   const itemIndexToRemove = state.items.findIndex(
      //     (item) => item.id === id
      //   );
      //   state.items.splice(itemIndexToRemove, 1);
      // }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
