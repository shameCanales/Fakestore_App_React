import { useState } from "react";
import { Link } from "react-router";
import ProductCard from "../../components/ProductCard.js";
import PaginationBtn from "../../UI/PaginationBtn.jsx";
import { useGetAllProducts } from "../../hooks/useGetAllProducts.js";
import type { Product } from "../../types/Products.js";
import type { ChangeEvent } from "react";
import searchIcon from "../../assets/search.png";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 20;

  const { data, isPending, isError, error } = useGetAllProducts(page, limit);

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
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

  let content = (
    <p className="text-center text-gray-500 mt-10">Refresh to see products</p>
  );

  if (isPending) {
    content = (
      <p className="text-center text-gray-500 mt-10">
        Getting available products for you...
      </p>
    );
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
            grid grid-cols-1
            sm:grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4 sm:gap-6 mt-6
          "
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="
            w-full sm:w-80
            shadow-sm border border-gray-300  rounded-lg
          placeholder-gray-500 text-shadow-slate-700
            focus:outline-none focus:ring-2 focus:ring-violet-600
            pl-12 py-4 px-4 text-sm
          "
          />

          <img
            className="absolute top-3.5 left-3 rounded-lg bg-violet-600 p-2 w-7"
            src={searchIcon}
            alt="Search Icon"
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Products
        </h1>
      </div>

      {/* Product grid / messages */}
      <main>{content}</main>
    </div>
  );
}
