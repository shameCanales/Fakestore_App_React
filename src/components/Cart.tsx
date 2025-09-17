import { useSelector, useDispatch } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { fetchProductById } from "../util/http.js";
import CartItem from "./CartItem.js";
import { cartActions } from "../store/cart-slice.js";
import type { UseQueryResult } from "@tanstack/react-query";
import type { RootState, AppDispatch } from "../store/store.js";

//types for cart items in redux
interface CartItemType {
  id: number;
  quantity: number;
}

//Types for product fetched from API
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

//Types for complete cart item with total
interface CompleteCartItem {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  total: number;
}

interface FetchParams {
  signal?: AbortSignal;
  id: number;
}

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  ) as CartItemType[]; //[{id: 1, quantity: 4}, ...]

  const productQueries: UseQueryResult<Product, unknown>[] = useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ["product", item.id],
      queryFn: ({ signal }: { signal?: AbortSignal }) =>
        fetchProductById({ signal, id: item.id } as FetchParams),
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

    const completeCartItemDetails: CompleteCartItem[] = productQueries.map(
      (query, index) => {
        const product = query.data;
        const quantity = cartItems[index]?.quantity || 0;

        if (!product) {
          // Provide fallback values or handle error as needed
          return {
            id: 0,
            title: "Unknown Product",
            price: 0,
            image: "",
            quantity: quantity,
            total: 0,
          };
        }

        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0] || "", //use first image or empty string if no images
          quantity: quantity,
          total: product.price * quantity,
        };
      }
    );

    const grandTotal = completeCartItemDetails.reduce(
      (currentGrandTotal, item) => (currentGrandTotal += item.total),
      0
    );

    function handleAdd({ id }: { id: number }) {
      dispatch(cartActions.incrementItemQuantity({ id }));
    }

    function handleSubtract({ id }: { id : number}) {
      const itemToDecrement = cartItems.find((item) => item.id === id);

      if (itemToDecrement?.quantity === 1) {
        dispatch(cartActions.removeItemFromCart({ id }));
      } else {
        dispatch(cartActions.decrementItemQuantity({ id }));
      }
    }

    function handleDelete({ id }: { id: number }) {
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
