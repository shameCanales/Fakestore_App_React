import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cartActions } from "../store/cart-slice.js";
import ImageCarousel from "./ImageCarousel.js";
import Button from "../UI/button.jsx";
import { showTimedToast } from "../store/ui-actions.js";
import type { RootState, AppDispatch } from "../store/store.js";

interface ProductsDetailsContentProps {
  data: {
    id: number;
    title: string;
    slug?: string;
    price: number;
    description: string;
    category: {
      id: number;
      name: string;
      image: string;
      slug: string;
    };
    images: string[];
  };
}

export default function ProductDetailsContent({
  data,
}: ProductsDetailsContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<number>(1);
  const { id, title, price, description, category, images } = data;

  function handleIncrementQuantity(): void {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecrementQuantity(): void {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  function handleAddToCart(): void {
    if (!isLoggedIn) {
      dispatch(
        showTimedToast({
          title: "There is a problem",
          message: "you cannot add item to cart unless logged in",
          type: "error",
        })
      );
      navigate("/login", { replace: true });
    } else {
      console.log(`added itemID ${id} with quantity of ${quantity}`);
      dispatch(
        showTimedToast({
          title: "Yes, Success!",
          message: "successfully added item to cart",
          type: "success",
        })
      );
      dispatch(cartActions.addItemToCart({ id, quantity }));
      setQuantity(() => 1);
    }
  }

  return (
    <div className="mt-20 grid grid-cols-2 gap-15">
      <div>
        <p className="montserrat-bold text-2xl">{title}</p>
        <p className="montserrat mt-5 text-lg">{description}</p>
        <p className="poppins-medium mt-6">
          Category:{" "}
          <span className="px-4 py-2 bg-stone-900 text-stone-50 rounded-4xl ml-2">
            {category.name}
          </span>
        </p>
        <p className="poppins-bold text-5xl mt-10">₱{price}</p>

        <div>
          <div className="flex items-center mt-10">
            <p className="poppins-medium text-3xl ">Quantity: {quantity}</p>
            <div className="flex gap-2 ml-5">
              <Button label={"+"} handleClick={handleIncrementQuantity} />
              <Button label={"-"} handleClick={handleDecrementQuantity} />
            </div>
          </div>

          <button
            className="bg-sky-900 text-stone-50 px-6 py-3 rounded-lg mt-4 montserrat-bold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <ImageCarousel images={images} />
    </div>
  );
}
