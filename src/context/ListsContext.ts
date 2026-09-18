import { createContext, useContext } from "react";
import type { Movie } from "../API/tmdb";

export type ListsValue = {
  favorites: Movie[];
  watched: Movie[];
  toggleFavorite: (movie: Movie) => void;
  toggleWatched: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  isWatched: (id: number) => boolean;
};

export const ListsContext = createContext<ListsValue | null>(null);

export function useLists() {
  const context = useContext(ListsContext);
  if (!context) throw new Error("useLists must be used inside ListsProvider");
  return context;
}
