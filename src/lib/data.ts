"use cache";
import { cacheLife } from "next/cache";

export async function getCategories() {
  cacheLife("hours");

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  if (!res.ok) throw new Error("Categories fetch failed");
  return res.json();
}

export async function getProducts() {
  cacheLife("minutes");

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  if (!res.ok) throw new Error("Categories fetch failed");
  return res.json();
}
