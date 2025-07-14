import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchProducts({ signal }) {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
      signal,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error("An error occured while fetching products");
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchProductById({ id, signal }) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      { signal }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error("An error occured while fetching the product");
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
