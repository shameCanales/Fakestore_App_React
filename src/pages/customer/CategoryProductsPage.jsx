import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchProductsByCategoryId } from "../../util/http";
import ProductCard from "../../components/ProductCard";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["category-products", categoryId], //params.categoryId, we just destructured
    queryFn: ({ signal }) =>
      fetchProductsByCategoryId({ signal, id: categoryId }),
  });

  let content = <p>Refresh page to reload products</p>;
  if (isPending) {
    content = <p>Fetching Products...</p>;
  }
  if (isError) {
    content = <p>There is an error fetching products</p>;
  }

  if (data) {
    content = (
      <>
        <div className="grid grid-cols-4">
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
        </div>
      </>
    );
  }

  return <>{content}</>;
}
