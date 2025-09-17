import { Link } from "react-router-dom";
import type { Product } from "../types/Products.js";
import { cartActions } from "../store/cart-slice.js";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store.js";
import { showTimedToast } from "../store/ui-actions.js";
import { useNavigate } from "react-router";

type ProductCardProps = Pick<
  Product,
  "id" | "title" | "price" | "images" | "description" | "category"
>;

export default function ProductCard({
  product,
}: {
  product: ProductCardProps;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

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
      console.log(`added itemID ${product.id} with quantity of 1`);
      dispatch(
        showTimedToast({
          title: "Yes, Success!",
          message: "successfully added item to cart",
          type: "success",
        })
      );
      dispatch(cartActions.addItemToCart({ id: product.id, quantity: 1 }));
    }
  }

  return (
    <li>
      <div className="border-2 border-slate-300 rounded-xl p-3 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        <Link to={`/products/${product.id}`}>
          <img
            className="w-full h-full object-cover rounded-lg aspect-square overflow-hidden"
            src={product.images[0]}
            alt={product.title}
          />

          <p className="line-clamp-1 montserrat-semibold text-lg text-gray-800 mt-4">
            {product.title}
          </p>
          <p className="text-xs line-clamp-2 leading-normal mt-3">
            {product.description}
          </p>
        </Link>
        <div className="pt-5">
          <button className="bg-slate-900 text-slate-50 text-xs py-2 px-4 rounded-2xl ">
            {product.category.name}
          </button>

          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-slate-600">Price:</p>
              <p className="text-2xl poppins-bold">
                ₱{product.price}.00
              </p>
            </div>
            <button
              className="bg-violet-500 text-slate-50 montserrat-medium p-2 px-4 rounded-2xl"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
