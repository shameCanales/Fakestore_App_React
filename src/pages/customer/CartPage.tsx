import Heading from "../../UI/Heading.jsx";
import Cart from "../../components/Cart.js";
import bin from "../../assets/bin.png";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice.js";
import type { AppDispatch } from "../../store/store.js";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

  function handleClearCart(): void {
    dispatch(cartActions.clearCart());
  }

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Heading text="My Cart" />
        <button
          onClick={() => handleClearCart()}
          className="mt-15 bg-red-600 flex items-center px-4 py-2 montserrat-medium text-stone-50 rounded-md"
        >
          <img src={bin} alt="Clear Cart" className="w-[20px] mr-2" />
          Clear Cart
        </button>
      </div>
      <Cart />
    </div>
  );
}
