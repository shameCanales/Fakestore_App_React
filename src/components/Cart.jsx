import { useSelector } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { fetchProductById } from "../util/http";
import Button from "../UI/button";

export default function Cart() {
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

  if (productQueries.every((query) => query.data)) {
    //basta imatch ang quantity sa ginfetch na data or queries base sa index.
    const completeCartItemDetails = productQueries.map((query, index) => {
      const product = query.data;
      const quantity = cartItems[index].quantity;

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        // image: product?.image[0],
        quantity: quantity,
        total: product.price * quantity,
      };
    });

    const grandTotal = completeCartItemDetails.reduce(
      (currentGrandTotal, item) => (currentGrandTotal += item.total),
      0
    );

    function handleAdd(){
      console.log('add')
    }
    function handleSubtract(){
      console.log('Subtract')
    }

    content = (
      <ul className="mt-15">
        {completeCartItemDetails.map((item) => (
          <li key={item.id} className="mt-4">
            {/* <p>{item.id}</p> */}
            <p>{item.title}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total:{item.total}</p>

            <div>
              <Button handleClick={handleAdd} label="+"/>
              <Button handleClick={handleSubtract} label="-"/>
            </div>
          </li>

        ))}

        <div className="flex items-center mt-10">
          <p className="montserrat-medium text-xl">Grand Total: {grandTotal}.00 Pesos</p>
          <button className="bg-stone-900 text-stone-50 px-4 py-2 poppins-bold ml-5 rounded-3xl">Check Out!</button>
        </div>
      </ul>
    );
  }

  return <div>{content}</div>;
}
