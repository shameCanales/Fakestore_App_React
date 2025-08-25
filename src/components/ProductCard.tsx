import { Link } from "react-router-dom";

interface ProductCartProps {
  id: number;
  imgSrc: string[];
  title: string;
  description: string;
  price: number;
}

export default function ProductCard({
  id,
  imgSrc,
  title,
  description,
  price,
}: ProductCartProps) {
  return (
    // /product/:${id} is incorrect. should only put colon on routes in app.jsx
    <Link to={`/products/${id}`}>
      <div className="bg-stone-50 p-4 rounded-2xl mt-10">
        <img
          className="line-clamp-1 rounded-xl aspect-[16/9]"
          src={imgSrc[0]}
          alt={title}
        />
        <h1 className="montserrat-bold text-3xl mt-4">₱{price}</h1>
        <p className="line-clamp-2 montserrat-semibold mt-2">{title}</p>
        <p className="line-clamp-3 montserrat-regular mt-2">{description}</p>
      </div>
    </Link>
  );
}
