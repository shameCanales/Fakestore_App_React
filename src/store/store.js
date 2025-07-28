import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});

store.subscribe(() => {
  //listener function that runs every time the redux state changes. just like useEffect
  const { items } = store.getState().cart; //get the current state of the cart slice
  localStorage.setItem("cartItems", JSON.stringify(items));

  // We used this code and put it in the app.jsx if we are not using the subscribe method
  //   const cartItems = useSelector((state) => state.cart.items);
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);
});

export default store;
