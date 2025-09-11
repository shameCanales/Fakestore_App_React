import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  // RouteObject,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";

//customer
import CustomerRootLayout from "./pages/customer/CustomerRoot.jsx";
import CustomerProtectedRoute from "./components/layout/CustomerProtectedRoute.jsx";
import ProductsPage from "./pages/customer/ProductsPage.jsx";
import CategoriesPage from "./pages/customer/CategoriesPage.jsx";
import CategoryProductsPage from "./pages/customer/CategoryProductsPage.jsx";
import ProductDetailPage from "./pages/customer/ProductDetailPage.jsx";
import CartPage from "./pages/customer/CartPage.jsx";
import LoginPage from "./pages/customer/LoginPage.jsx";
import HomePage from "./pages/customer/HomePage.jsx";
import CreateUserPage from "./pages/customer/CreateUserPage.jsx";

//common
import NotFoundPage from "./pages/NotFoundPage.jsx";

// admin
import AdminRootLayout from "./pages/admin/AdminRoot.jsx";
import AdminProtectedRoute from "./components/layout/AdminProtectedRoute.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import ProductsListPage from "./pages/admin/ProductsListPage.jsx";
import CategoriesListPage from "./pages/admin/CategoriesListPage.jsx";
import UsersList from "./pages/admin/UsersListPage.jsx";

const router = createBrowserRouter([
  {
    path: "/", 
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
