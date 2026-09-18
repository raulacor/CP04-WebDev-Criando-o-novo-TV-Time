import { Link } from "react-router-dom";
import { CiCircleCheck, CiClock2 } from "react-icons/ci";
import "./Featured.css";
import {
  IMG_BASE,
  BACKDROP_BASE,
  genreName,
  useMovies,
} from "../../../API/tmdb";
import { useLists } from "../../../context/ListsContext";

// Evaluated once when the module loads, so the pick is stable across
// re-renders but changes on every page reload.
const pick = Math.random();

export default function Featured() {
  const movies = useMovies("movie/popular?language=en-US&page=1");
  const { toggleFavorite, toggleWatched, isFavorite, isWatched } = useLists();

  if (movies.length === 0) return null;

  const movie = movies[Math.floor(pick * movies.length)];

  const image = movie.backdrop_path
    ? BACKDROP_BASE + movie.backdrop_path
    : movie.poster_path
      ? IMG_BASE + movie.poster_path
      : null;

  const year = movie.release_date?.slice(0, 4);
  const genre = genreName(movie.genre_ids[0]);

  return (
    <div
      className="featured-card"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="featured-scrim" />

      <div className="featured-content">
        <span className="featured-badge">Featured</span>

        <Link to={`/movie/${movie.id}`} className="featured-name">
          {movie.title}
        </Link>

        <div className="featured-meta">
          <span className="featured-score">
            {movie.vote_average.toFixed(1)}
          </span>
          {year && <span>{year}</span>}
          {genre && <span>{genre}</span>}
        </div>

        <p className="featured-description">{movie.overview}</p>

        <div className="featured-actions">
          <button
            className={isFavorite(movie.id) ? "active-add" : ""}
            onClick={() => toggleFavorite(movie)}
            aria-label={isFavorite(movie.id) ? "Remove from my list" : "Add to my list"}
          >
            <CiCircleCheck size={34} />
          </button>
          <button
            className={isWatched(movie.id) ? "active-watched" : ""}
            onClick={() => toggleWatched(movie)}
            aria-label={isWatched(movie.id) ? "Unmark watched" : "Mark as watched"}
          >
            <CiClock2 size={34} />
          </button>
        </div>
      </div>
    </div>
  );
}
