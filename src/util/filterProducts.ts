import type { Product } from "./http.js";

// Smart filtering
export const filterProducts = (products: Product[], searchQuery: string) => {
  //receives the products data
  if (!searchQuery.trim()) return products; // If search query is empty, return all products
  const query = searchQuery.trim().toLowerCase(); // Normalize the search query
  //Price Range Filter
  if (query.includes("-")) {
    const [min, max] = query.split("-").map(Number) as [number, number]; // destructure the min and max values from the query by splitting it at the dash and converting them to numbers
    return products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }
  //Exact Price
  if (!isNaN(query as any)) {
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
      product.slug.toLowerCase().includes(query) ||
      product.category.name.toLowerCase().includes(query)
  );
};
