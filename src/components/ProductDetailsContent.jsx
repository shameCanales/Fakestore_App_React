import ImageCarousel from "./ImageCarousel";
import { useState } from "react";
import Button from "../UI/button";
import { cartActions } from "../store/cart-slice";
import { useDispatch } from "react-redux";

export default function ProductDetailsContent({ data }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id, title, slug, price, description, category, images } = data;

  function handleIncrementQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecrementQuantity() {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  function handleAddToCart() {
    console.log(`added itemID ${id} with quantity of ${quantity}`);
    dispatch(cartActions.addItemToCart({ id, quantity }));
    setQuantity(() => 1);
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
