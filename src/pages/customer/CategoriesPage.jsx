import CategoryItem from "../../components/CategoryItem";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchCategoryNameById } from "../../util/http";
import Heading from "../../UI/Heading";
import { Outlet } from "react-router";
import { useParams } from "react-router";

export default function CategoriesPage() {
  const { categoryId } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => fetchCategories({ signal }),
    staleTime: 2 * 60 * 1000,
  });

  const {
    data: category,
    isPending: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["category-name", categoryId],
    queryFn: ({ signal }) => fetchCategoryNameById({ signal, id: categoryId }),
    enabled: !!categoryId, // only run if categoryId is truthy
  });

  let content = <p>Refresh to see categories</p>;

  if (isPending) {
    content = <p>fetching categories</p>;
  }

  if (isError) {
    content = <p>Something went wrong</p>;
  }

  let categoryName = "Select a category";

  if (categoryLoading) {
    categoryName = "Loading...";
  }
  if (category) {
    categoryName = category.name;
  }

  if (data) {
    content = (
      <div className="grid grid-cols-8 gap-2 mt-15">
        {data.map((cat) => (
          <CategoryItem
            key={cat.id}
            id={cat.id}
            name={cat.name}
            slug={cat.slug}
            imgSrc={cat.image}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Heading text="Categories" />
      {content}
      <div>
        <Heading text={categoryName} />
        <Outlet />
      </div>
    </div>
  );
}
