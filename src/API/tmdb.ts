import { useState, useEffect } from "react";

const BASE = "https://api.themoviedb.org/3/";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
};

// TMDB's movie genre list is fixed, so a lookup table avoids a second request.
const GENRES: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
  53: "Thriller", 10752: "War", 37: "Western",
};

export function genreName(id: number): string {
  return GENRES[id] ?? "";
}

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
    if (!path) return;
    getMovies(path).then(setMovies).catch(console.error);
  }, [path]);

  return movies;
}

// The detail endpoint returns a single movie with more fields than the
// list endpoints give you (runtime, tagline, full genre objects).
export type MovieDetails = Movie & {
  runtime: number | null;
  tagline: string | null;
  status: string;
  genres: { id: number; name: string }[];
  vote_count: number;
  homepage: string | null;
};

export async function getMovie(id: string): Promise<MovieDetails> {
  const res = await fetch(`${BASE}movie/${id}?language=en-US`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

export function useMovie(id: string | undefined) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setMovie(null);
    setError(null);
    getMovie(id)
      .then(setMovie)
      .catch((e) => setError(String(e.message ?? e)));
  }, [id]);

  return { movie, error };
}
