import CategoryItem from "../../components/CategoryItem.js";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchCategories, fetchCategoryNameById } from "../../util/http.js";
import Heading from "../../UI/Heading.js";
import { Outlet } from "react-router";
import { useParams } from "react-router";
import type { Category } from "../../types/Category.js";
import { useGetAllCategories } from "../../hooks/useGetAllCategories.js";

export default function CategoriesPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data, isLoading, isError, error } = useGetAllCategories();

  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
  }: UseQueryResult<Category, Error> = useQuery({
    queryKey: ["category-name", categoryId],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchCategoryNameById({
        signal,
        id: categoryId ? Number(categoryId) : 0,
      }),
    enabled: !!categoryId, // only run if categoryId is truthy
  });

  let content: React.ReactNode = <p>Refresh to see categories</p>;

  if (isLoading) {
    content = <p>fetching categories</p>;
  }

  if (isError) {
    content = <p>Something went wrong</p>;
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

  let categoryName = "Select a category";

  if (categoryLoading) {
    categoryName = "Loading...";
  }
  if (category) {
    categoryName = category.name;
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
