import { Link } from "react-router-dom";

export default function ProductCard({ id, imgSrc, title, description, price }) {
  return (
    <Link to={"/home"}>
      <div className="bg-stone-50 p-4 rounded-2xl">
        <img className="rounded-xl aspect-[16/9]" src={imgSrc} alt={title} />
        <h1 className="montserrat-bold text-3xl mt-4">${price}</h1>
        <p className="line-clamp-2 montserrat-semibold mt-2">{title}</p>
        <p className="line-clamp-3 montserrat-regular mt-2">{description}</p>
      </div>
    </Link>
  );
}
