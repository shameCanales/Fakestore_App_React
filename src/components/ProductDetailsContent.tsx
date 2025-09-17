import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cartActions } from "../store/cart-slice.js";
import ImageCarousel from "./ImageCarousel.js";
import Button from "../UI/Button.jsx";
import { showTimedToast } from "../store/ui-actions.js";
import type { RootState, AppDispatch } from "../store/store.js";
import type { Product } from "../types/Products.js";
import { Link } from "react-router";
import arrow from "../assets/back.png";

interface ProductsDetailsContentProps {
  data: Product;
}

export default function ProductDetailsContent({
  data,
}: ProductsDetailsContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

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
    <div className="mt-20 gap-15 p-3 border-2 border-slate-300 rounded-2xl relative">
      <ImageCarousel images={images} />

      <div className=" mt-13">
        <p className="montserrat-bold text-2xl line-clamp-2">{title}</p>
        <p className=" inline-block montserrat-regular text-xs  mt-3 px-4 py-2 bg-stone-900 text-stone-50 rounded-4xl">
          {category.name}
        </p>

        <div>
          <p
            className={`montserrat mt-7 leading-normal line-clamp-3 ${
              isSeeMore ? "line-clamp-none" : ""
            }`}
          >
            {description}
          </p>
          <button
            className="montserrat-bold"
            onClick={() => setIsSeeMore((prev) => !prev)}
          >
            {isSeeMore ? "See Less..." : "See More..."}
          </button>
        </div>

        
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

      <Link to="../" className="absolute top-[-18px] right-2">
        <button className="flex px-3 py-2 rounded-3xl bg-slate-900 text-slate-50">
          <img className="w-[15px] mr-2" src={arrow} />
          <p className="montserrat-medium text-xs">Go Back</p>
        </button>
      </Link>
    </div>
  );
}
