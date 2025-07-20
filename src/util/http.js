import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

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

export async function fetchCategories({ signal }) {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories", {
      signal,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error("An error occured while fetching categories");
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
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

export async function fetchCategoryNameById({ signal, id }) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}`
    );

    const data = response.json();

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

export async function fetchProductsByCategoryId({ id, signal }) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`,
      signal
    );

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

export const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
