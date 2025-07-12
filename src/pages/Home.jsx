import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";
import { useEffect } from "react";

export default function Home() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", { max: 20 }],
    queryFn: ({ signal }) => fetchProducts({ signal }),
    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      console.log("fetched products:", data);
    }
  }, [data]);

  let content = <p>Refresh to see products</p>;

  if (data) {
    content = (
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1>FakeStore Items:</h1>

      <main>{content}</main>
    </>
  );
}
