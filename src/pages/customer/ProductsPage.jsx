import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../util/http";
import ProductCard from "../../components/ProductCard";
import Heading from "../../UI/Heading";
import PaginationBtn from "../../UI/PaginationBtn";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", page, limit], // include page in the query key to refetch when page changes. it's a dependency
    queryFn: ({ signal }) => fetchProducts({ page, limit, signal }),
    keepPreviousData: true, // to keep the previous data while fetching new data
    staleTime: 2 * 60 * 1000,
  });

  function handleSearchInput(e) {
    setSearchQuery(e.target.value);
  }

  //Smart filter function. only in frontend
  function filterProducts(products) {
    //receives the products data
    if (!searchQuery.trim()) return products; // If search query is empty, return all products

    const query = searchQuery.trim().toLowerCase(); // Normalize the search query

    //Price Range Filter
    if (query.includes("-")) {
      // if query includes a dash, it is a price range
      const [min, max] = query.split("-").map(Number); // destructure the min and max values from the query by splitting it at the dash and converting them to numbers
      return products.filter(
        //where product price is within the range of min and max
        (product) => product.price >= min && product.price <= max
      );
    }

    //Exact Price
    if (!isNaN(query)) {
      //if query is a number
      const price = parseFloat(query); // convert query to a number
      return products.filter((p) => p.price === price); //where product price is equal to the query
    }

    //Category or Title Filter
    return products.filter(
      (
        product // where product title includes query or product slug includes query
      ) =>
        product.title.toLowerCase().includes(query) ||
        product.slug.toLowerCase().includes(query)
    );
  }

  let content = <p>Refresh to see products</p>;

  if (isPending) {
    content = <p>Getting available products for you...</p>;
  }

  if (isError) {
    content = <p>Something went wrong: {error.message}</p>;
  }

  if (data) {
    const filteredProducts = filterProducts(data); //passing the data to the filterProducts function

    const isFirstPage = page === 1; // true or false
    const isLastPage = filteredProducts?.length < limit;

    content = (
      <div>
        <ul className="grid grid-cols-3 gap-5 mt-5">
          {filteredProducts.map((product) => (
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
    <div className="bg-[#DCDCD]">
      <div className="flex items-center gap-15">
        <Heading text="Products" />

        <input
          type="text"
          placeholder="Search by Title, price, range e.g. 10-50 or category"
          value={searchQuery}
          onChange={handleSearchInput}
          className="shadow-md rounded-lg text-stone-950 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-800 montserrat-medium py-4 px-8 w-full mt-16"
        />
      </div>

      <main>{content}</main>
    </div>
  );
}
