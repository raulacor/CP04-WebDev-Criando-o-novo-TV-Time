import { useState, type ReactNode } from "react";
import type { Movie } from "../API/tmdb";
import { ListsContext, type ListsValue } from "./ListsContext";

function toggle(list: Movie[], movie: Movie) {
  if (list.some((m) => m.id === movie.id)) {
    return list.filter((m) => m.id !== movie.id);
  }
  return [...list, movie];
}

export function ListsProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const value: ListsValue = {
    favorites,
    watched,
    toggleFavorite: (movie) => setFavorites((list) => toggle(list, movie)),
    toggleWatched: (movie) => setWatched((list) => toggle(list, movie)),
    isFavorite: (id) => favorites.some((m) => m.id === id),
    isWatched: (id) => watched.some((m) => m.id === id),
  };

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>;
}
