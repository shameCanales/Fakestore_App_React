import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import RootLayout from "./pages/Root";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetailPage from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
        element: <ProtectedRoute />, //protect only the routes below, protection is done by checking if the user is logged in in the ProtectedRoute component
        children: [ //routes that will be displayed only if the user is logged in. with the outlet component, the child routes will be rendered in the place of the <Outlet /> component in RootLayout
          {
            path: "cart",
            element: <CartPage />, 
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      // {
      //   path: "cart",
      //   element: <CartPage />,
      // },
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
