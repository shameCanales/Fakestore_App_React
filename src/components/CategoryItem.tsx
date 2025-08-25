import { Link } from "react-router";

interface CategoryItemProps {
  id: number;
  name: string;
  slug: string;
  imgSrc: string;
}

export default function CategoryItem({
  id,
  name,
  slug,
  imgSrc,
}: CategoryItemProps) {
  return (
    <Link to={`/categories/${id}/products`}>
      <div className="p-3 bg-stone-900 text-stone-50 rounded-xl">
        <img className="rounded-lg" src={imgSrc} alt={name} />
        <p className="mt-5 poppins-medium">{name}</p>
      </div>
    </Link>
  );
}
