import Heading from "../../UI/Heading";
import { useState } from "react";
import { useGetAllProducts } from "../../hooks/useGetAllProducts";

export default function ProductsListPage() {
  const [page, setPage] = useState(1);
  const limit = 9;
  const { data, isFetching, isError, error } = useGetAllProducts(page, limit);

  console.log(data);

  let content = <p>Refresh page..</p>;

  if (data) {
    content = (
      <ul>
        {data.map((prod) => (
          <li>
            <p>{prod.title}</p>
            <p>{prod.price}</p>
            <p>{prod.description}</p>
            <p>{prod.title}</p>
          </li>
        ))}
      </ul>
    );
  }

  if (isFetching) {
    content = <p>Fetching all products</p>;
  }

  if (isError) {
    content = (
      <div>
        <p>Somethings wrong with fetching all products</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Heading text="Product lists" />
      {content}
    </>
  );
}
