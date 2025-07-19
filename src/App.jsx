import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RootLayout from "./pages/Root";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetailPage from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "categories",
        element: <Categories />,
        children: [
          {
            path: ":categoryId/products",
            element: <CategoryProducts />,
          },
        ],
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "*", //any URL that isn't explicitly defined in my createBrowserRouter setup
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
