import { useState } from "react";
import { Link } from "react-router";
import ProductCard from "../../components/ProductCard.js";
import PaginationBtn from "../../UI/PaginationBtn.jsx";
import { useGetAllProducts } from "../../hooks/useGetAllProducts.js";
import type { Product } from "../../util/http.js";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 20;

  const { data, isPending, isError, error } = useGetAllProducts(page, limit);

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function filterProducts(products: Product[]) {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.trim().toLowerCase();

    if (query.includes("-")) {
      const [min, max] = query.split("-").map(Number) as [number, number];
      return products.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    if (!isNaN(query as any)) {
      const price = parseFloat(query);
      return products.filter((p) => p.price === price);
    }

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.slug.toLowerCase().includes(query) ||
        product.category.name.toLowerCase().includes(query)
    );
  }

  let content = <p className="text-center text-gray-500 mt-10">Refresh to see products</p>;

  if (isPending) {
    content = <p className="text-center text-gray-500 mt-10">Getting available products for you...</p>;
  }

  if (isError) {
    content = (
      <p className="text-center text-red-500 mt-10">
        Something went wrong: {error.message}
      </p>
    );
  }

  if (data) {
    const filteredProducts = filterProducts(data);
    const isFirstPage = page === 1;
    const isLastPage = filteredProducts?.length < limit;

    content = (
      <div>
        <ul
          className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            gap-4 sm:gap-6 mt-6
          "
        >
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                  {/* Image */}
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h1 className="text-base sm:text-lg font-bold text-gray-900">
                      ₱{product.price}
                    </h1>
                    <p className="line-clamp-2 text-xs sm:text-sm font-medium text-gray-800 mt-1">
                      {product.title}
                    </p>
                    <p className="line-clamp-2 text-xs text-gray-600 mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center gap-4 my-10">
          <PaginationBtn
            handleClick={() => setPage((prev) => prev - 1)}
            isDisabled={isFirstPage}
          >
            Previous
          </PaginationBtn>
          <PaginationBtn
            handleClick={() => setPage((prev) => prev + 1)}
            isDisabled={isLastPage}
          >
            Next
          </PaginationBtn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Products</h1>

        <input
          type="text"
          placeholder="Search by Title, Price, Range (10-50), or Category"
          value={searchQuery}
          onChange={handleSearchInput}
          className="
            w-full sm:w-80
            shadow-sm border border-gray-300 rounded-lg
            text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-green-600
            py-2 px-4 text-sm
          "
        />
      </div>

      {/* Product grid / messages */}
      <main>{content}</main>
    </div>
  );
}
