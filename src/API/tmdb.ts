import { useState, useEffect } from "react";

const BASE = "https://api.themoviedb.org/3/";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  poster_path: string | null;
};

// Plain fetch. Knows nothing about React.
export async function getMovies(path: string): Promise<Movie[]> {
  const res = await fetch(BASE + path, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  const data = await res.json();
  return data.results;
}

// React wrapper. Each call gets its own independent state.
export function useMovies(path: string) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies(path).then(setMovies).catch(console.error);
  }, [path]);

  return movies;
}
