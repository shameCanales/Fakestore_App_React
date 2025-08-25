import Heading from "../../UI/Heading";
import { useState } from "react";
import { useGetAllProducts } from "../../hooks/useGetAllProducts";
import type { Product } from "../../util/http";

export default function ProductsListPage() {
  const [page, setPage] = useState<number>(1);
  const limit = 9;
  const { data, isFetching, isError, error } = useGetAllProducts(page, limit);

  let content = <p>Refresh page..</p>;

  if (data) {
    content = (
      <ul>
        {data.map((prod: Product) => (
          <li key={prod.id}>
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
        <p>{error instanceof Error ? error.message : String(error)}</p>
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
