import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../util/http.js";
import arrow from "../../assets/arrow.png";
import ProductDetailsContent from "../../components/ProductDetailsContent.js";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", params.id],
    queryFn: ({ signal }) =>
      fetchProductById({ signal, id: Number(params.id) }),
    enabled: !!params.id, // Don't run query if id is undefined
  });

  let content = <p>Refresh the page to view Details</p>;

  if (isPending) {
    content = <p>Getting Product Details...</p>;
  }

  if (isError) {
    content = (
      <p>
        Error getting the Product Details. please refresh... {error?.message}
      </p>
    );
  }

  if (data) {
    content = <ProductDetailsContent data={data} />;
  }

  return (
    <div>
      <div className="flex justify-between mt-15">
        <h1 className="poppins-bold text-4xl ">Product Details</h1>

        <Link to="../">
          <button className="flex border-2 px-6 py-2 rounded-3xl">
            <img className="w-[20px] mr-3" src={arrow} />
            <p className="montserrat-medium">Go Back</p>
          </button>
        </Link>
      </div>
      {content}
    </div>
  );
}
