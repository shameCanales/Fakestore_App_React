import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";

export default function Home() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
    staleTime: 2 * 60 * 1000,
  });

  let content = <p>Refresh to see products</p>;

  if (isPending) {
    content = <p>Getting available products for you...</p>;
  }

  if (isError) {
    content = <p>Something went wrong: {error.message}</p>;
  }

  if (data) {
    content = (
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            <p>{product.title}</p>
            {product.images?.[0] && (
              <img src={product.images[0]} alt={product.title} />
            )}
            <p>price: {product.price}</p>
            <p>description: {product.description}</p>
          </li>
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
