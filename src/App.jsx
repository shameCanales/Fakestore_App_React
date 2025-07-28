import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

import CustomerRootLayout from "./pages/customer/CustomerRoot";
import CustomerProtectedRoute from "./components/layout/CustomerProtectedRoute";           
import ProductsPage from "./pages/customer/ProductsPage";
import CategoriesPage from "./pages/customer/CategoriesPage";
import CategoryProductsPage from "./pages/customer/CategoryProductsPage";
import ProductDetailPage from "./pages/customer/ProductDetailPage";
import CartPage from "./pages/customer/CartPage";
import LoginPage from "./pages/customer/LoginPage";
import HomePage from "./pages/customer/HomePage";
import CreateUserPage from "./pages/customer/CreateUserPage";

import NotFoundPage from "./pages/NotFoundPage";

import AdminRootLayout from "./pages/admin/AdminRoot";
import AdminProtectedRoute from "./components/layout/AdminProtectedRoute";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsListPage from "./pages/admin/ProductsListPage";
import CategoriesListPage from "./pages/admin/CategoriesListPage";   
import UsersList from "./pages/admin/UsersListPage";

const router = createBrowserRouter([
  {
    path: "/", //signifies?
    element: <CustomerRootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        element: <CustomerProtectedRoute />, //protect only the routes below, protection is done by checking if the user is logged in in the ProtectedRoute component
        children: [
          //routes that will be displayed only if the user is logged in. with the outlet component, the child routes will be rendered in the place of the <Outlet /> component in RootLayout
          {
            path: "cart",
            element: <CartPage />,
          },
        ],
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
        children: [
          {
            path: ":categoryId/products",
            element: <CategoryProductsPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "create-user",
        element: <CreateUserPage />,
      },
      {
        path: "*", //any URL that isn't explicitly defined in my createBrowserRouter setup
        element: <NotFoundPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminRootLayout />,
    children: [
      {
        element: <AdminProtectedRoute />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "ProductList",
            element: <ProductsListPage />,
          },
          {
            path: "categoriesList",
            element: <CategoriesListPage />,
          },
          {
            path: "usersList",
            element: <UsersList />,
          },
        ],
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
