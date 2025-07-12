import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

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
        path: "categories",
        element: <Categories />,
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
