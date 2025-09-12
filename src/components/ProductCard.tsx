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
    <Link to={`/products/${id}`}>
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Image */}
        <div className="aspect-square w-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={imgSrc[0]}
            alt={title}
          />
        </div>

        {/* Content */}
        <div className="p-3">
          <h1 className="text-lg font-bold text-gray-900">₱{price}</h1>
          <p className="line-clamp-2 text-xs font-medium text-gray-800 mt-1">{title}</p>
          <p className="line-clamp-2 text-xs text-gray-600 mt-1">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
