import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice.js";
import authSlice from "./auth-slice.js";
import type { AuthState } from "./auth-slice.js";
import uiSlice from "./ui-Slice.js";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});

store.subscribe(() => {
  //listener function that runs every time the redux state changes. just like useEffect
  const state: RootState = store.getState();
  const { items } = state.cart; //get the current state of the cart slice
  localStorage.setItem("cartItems", JSON.stringify(items));

  // We used this code and put it in the app.jsx if we are not using the subscribe method
  //   const cartItems = useSelector((state) => state.cart.items);
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; //this should be removed
