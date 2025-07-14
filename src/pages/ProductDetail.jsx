import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../util/http";
import { useEffect } from "react";
import { Link } from "react-router";
import arrow from "../assets/arrow.png";

export default function ProductDetail() {
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", params.id],
    queryFn: ({ signal }) => fetchProductById({ signal, id: params.id }),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  let content = <p>Refresh the page to view Details</p>;

  if (isPending) {
    content = <p>Getting Product Details...</p>;
  }

  if (isError) {
    content = <p>Error getting the Product Details. please refresh...</p>;
  }

  if (data) {
    const { id, title, slug, price, description, category, images } = data;

    content = (
      <div className="mt-10">
        <p className="montserrat-medium text-xl">{title}</p>
        <p className="poppins-bold text-3xl mt-4">{price} Pesos</p>
        <p className="montserrat mt-2 text-lg">{description}</p>
        <p className="poppins-medium my-4">
          Category: <span className="px-4 py-2 bg-stone-900 text-stone-50 rounded-4xl ml-2">{category.name}</span>
        </p>

        {images.map((img) => (
          <img key={img} src={img} />
        ))}
      </div>
    );
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
