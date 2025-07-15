import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";
import ProductCard from "../components/ProductCard";
import Heading from "../UI/Heading";

export default function Products() {
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
      <ul className="grid grid-cols-3 gap-5 mt-5">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imgSrc={product.images[0]}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </ul>
    );
  }
  return (
    <div className="bg-[#DCDCD]">
      <Heading text="Products" />

      <main>{content}</main>
    </div>
  );
}
