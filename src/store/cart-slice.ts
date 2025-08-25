// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a Cart Item type
interface CartItem {
  id: number;
  quantity: number;
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Load cart items from localstorage safely
let storedCartItems: CartItem[] = [];
try {
  const raw = localStorage.getItem("cartItems");
  storedCartItems = raw ? JSON.parse(raw) : [];
} catch (err) {
  console.error("Invalid CartItems in localStorage", err);
}

const initialCartState: CartState = {
  items: storedCartItems, // if storedCartItems exist in localStorage, parse it to an array, otherwise initialize as an empty array
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
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
    removeItemFromCart(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const itemIndexToRemove = state.items.findIndex((item) => item.id === id);
      state.items.splice(itemIndexToRemove, 1);
    },
    incrementItemQuantity(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const itemToEdit = state.items.find((item) => item.id === id);
      if (itemToEdit) {
        itemToEdit.quantity += 1;
      }
    },
    decrementItemQuantity(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      console.log(id);
      const itemToEdit = state.items.find((item) => item.id === id);

      if (itemToEdit) {
        itemToEdit.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
