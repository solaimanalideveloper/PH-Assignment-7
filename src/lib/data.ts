"use cache";

import { Product, Category } from "@/types/product";
import { cacheLife } from "next/cache";

export async function getCategories(): Promise<Category[]> {
  cacheLife("hours");

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  if (!res.ok) throw new Error("Categories fetch failed");
  return res.json();
}

export async function getProducts() {
  cacheLife("minutes");

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  if (!res.ok) throw new Error("Categories fetch failed");
  return res.json();
}

// export async function getAllProducts() {
//   cacheLife("minutes");

//   const res = await fetch(
//     "https://api.api-store.workers.dev/api/bazardor/products",
//   );
//   if (!res.ok) throw new Error("Categories fetch failed");
//   return res.json();
// }

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p: Product) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(category: string) {
  const products = await getProducts();
  return products.filter((p: Product) => p.category === category);
}

// export async function getProductDetails() {
//   cacheLife("hours");

//   const res = await fetch(
//     `https://api.api-store.workers.dev/api/bazardor/products/${slug}`,
//   );
//   if (!res.ok) throw new Error("Categories fetch failed");
//   return res.json();
// }