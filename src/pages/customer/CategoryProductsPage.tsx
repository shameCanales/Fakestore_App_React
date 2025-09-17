import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchProductsByCategoryId } from "../../util/http.js";
import ProductCard from "../../components/ProductCard.js";
import type { Product } from "../../types/Products.js";

interface FetchProductByCatIdParams {
  id: number;
  signal: AbortSignal | undefined;
}

export default function CategoryProductsPage() {
  const { categoryId } = useParams<{ categoryId: string }>(); //useParams expects a string

  const { data, isLoading, isError, error }: UseQueryResult<Product[], Error> =
    useQuery<Product[], Error>({
      queryKey: ["category-products", categoryId], //params.categoryId, we just destructured
      queryFn: ({ signal }: { signal?: AbortSignal }) =>
        fetchProductsByCategoryId({
          signal,
          id: Number(categoryId), //convert to Number because useParams always expects and returns a string
        } as FetchProductByCatIdParams),
    });

  let content: React.ReactNode = <p>Refresh page to reload products</p>;
  if (isLoading) {
    content = <p>Fetching Products...</p>;
  }
  if (isError) {
    content = <p>There is an error fetching products</p>;
  }

  if (data) {
    content = (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-5">
        {data.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    );
  }

  return <>{content}</>;
}
