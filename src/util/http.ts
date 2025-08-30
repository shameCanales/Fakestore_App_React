import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

//used for logging in, creating user,
export const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERFACES:
//Shared Types
interface FetchParams {
  page?: number;
  limit?: number;
  id?: number;
  signal?: AbortSignal | undefined;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string; image: string; slug: string };
  images: string[];
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export async function fetchProducts({
  page = 1,
  limit = 6,
  signal,
}: FetchParams): Promise<Product[]> {
  try {
    const offset = (page - 1) * limit;

    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`,
      {
        signal: signal ?? null,
      }
    );

    const data: Product[] = await response.json();

    if (!response.ok) {
      const error: any = new Error("An error occured while fetching products");
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("error fetching products", error);
    throw error;
  }
}

export async function fetchCategories({ signal }: FetchParams) {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories", {
      signal: signal ?? null,
    });

    const data: Category[] = await response.json();

    if (!response.ok) {
      const error: any = new Error(
        "An error occured while fetching categories"
      );
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("error fetching categories", error);
    throw error;
  }
}

export async function fetchProductById({ id, signal }: FetchParams) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      { signal: signal ?? null }
    );

    const data: Product = await response.json();

    if (!response.ok) {
      const error: any = new Error(
        "An error occured while fetching the product"
      );
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      // this error is normal so i don't want to log it in browser. returning silently
      return;
    }

    console.error("error fetching specific product", error);
    throw error;
  }
}

export async function fetchCategoryNameById({ signal, id }: FetchParams) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}`,
      { signal: signal ?? null }
    );

    const data: Category = await response.json();

    if (!response.ok) {
      const error: any = new Error("An error occured while fetching products");
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("error fetching specific category", error);
    throw error;
  }
}

export async function fetchProductsByCategoryId({ id, signal }: FetchParams) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`,
      { signal: signal ?? null }
    );

    const data: Product[] = await response.json();

    if (!response.ok) {
      const error: any = new Error("An error occured while fetching products");
      error.code = response.status;
      error.info = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("error fetching specific category products", error);
    throw error;
  }
}
