"use server";
import { DummyProduct } from "@/types";

export const fetchPlayers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  try {
    const response = await fetch(
      `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch players data");
    }
    const data = await response.json();
    const mappedPlayers = data.products.map((product: DummyProduct) => ({
      id: product.id,
      name: product.title,
      game: product.category,
      avatar: product.thumbnail,
      ranking: product.price,
      bio: product.description,
    }));
    return mappedPlayers;
  } catch (err) {
    console.error(err);
    return [];
  }
};
