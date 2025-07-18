import { useSelector } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { fetchProductById } from "../util/http";
import CartItem from "./CartItem";
import { cartActions } from "../store/cart-slice";
import { useDispatch } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); //[{id: 1, quantity: 4}, ...]

  const productQueries = useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ["product", item.id],
      queryFn: ({ signal }) => fetchProductById({ signal, id: item.id }),
    })),
  });

  const isLoading = productQueries.some((query) => query.isLoading);
  const isError = productQueries.some((query) => query.isError);

  let content = <p>Reload to see cart items...</p>;

  if (isLoading) {
    content = <p>Loading your cart items...</p>;
  }

  if (isError) {
    content = <p>Error loading some of the products...</p>;
  }

  if (cartItems.length === 0) {
    content = <p>Your cart is empty.</p>;
  } else if (productQueries.every((query) => query.data)) {
    //basta imatch ang quantity sa ginfetch na data or queries base sa index.

    const completeCartItemDetails = productQueries.map((query, index) => {
      const product = query.data;
      const quantity = cartItems[index].quantity;

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        total: product.price * quantity,
      };
    });

    const grandTotal = completeCartItemDetails.reduce(
      (currentGrandTotal, item) => (currentGrandTotal += item.total),
      0
    );

    function handleAdd({ id }) {
      dispatch(cartActions.incrementItemQuantity({ id }));
    }

    function handleSubtract({ id }) {
      const itemToDecrement = cartItems.find((item) => item.id === id);

      if (itemToDecrement.quantity === 1) {
        dispatch(cartActions.removeItemFromCart({ id }));
      } else {
        dispatch(cartActions.decrementItemQuantity({ id }));
      }
    }

    function handleDelete({ id }) {
      dispatch(cartActions.removeItemFromCart({ id }));
    }

    content = (
      <ul className="mt-15">
        {completeCartItemDetails.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            clickAdd={() => handleAdd({ id: item.id })}
            clickSubtract={() => handleSubtract({ id: item.id })}
            clickDelete={() => handleDelete({ id: item.id })}
          />
        ))}

        <div className="flex items-center mt-10 justify-end">
          <p className="montserrat-medium text-xl">
            Grand Total:{" "}
            <span className="montserrat-bold">{grandTotal}.00 Pesos</span>
          </p>
          <button className="bg-stone-900 text-stone-50 px-4 py-2 poppins-bold ml-5 rounded-3xl ">
            Check Out!
          </button>
        </div>
      </ul>
    );
  }

  return <div>{content}</div>;
}
