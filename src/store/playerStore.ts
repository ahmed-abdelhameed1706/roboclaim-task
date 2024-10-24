import { create } from "zustand";
import { Player, DummyProduct } from "@/types";

interface PlayerStore {
  player: Player | null;
  players: Player[];
  loading: boolean;
  error: string | null;
  fetchPlayer: (id: string | string[]) => Promise<void>;
  fetchPlayers: () => Promise<void>;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: null,
  players: [],
  loading: false,
  error: null,
  fetchPlayer: async (id: string | string[]) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      const fetchedPlayer: Player = {
        id: data.id,
        name: data.title,
        game: data.category,
        avatar: data.thumbnail,
        ranking: data.price,
        bio: data.description,
      };
      set({ player: fetchedPlayer });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },
  fetchPlayers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("https://dummyjson.com/products");
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
      set({ players: mappedPlayers });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
