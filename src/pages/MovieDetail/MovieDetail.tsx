import { useParams, Link } from "react-router-dom";
import { CiCircleCheck, CiClock2 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import {
  IMG_BASE,
  BACKDROP_BASE,
  useMovie,
  type Movie,
} from "../../API/tmdb";
import { useLists } from "../../context/ListsContext";
import "./MovieDetail.css";

function runtimeText(minutes: number | null) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

export default function MovieDetail() {
  // :id from the route "/movie/:id"
  const { id } = useParams();
  const { movie, error } = useMovie(id);
  const { toggleFavorite, toggleWatched, isFavorite, isWatched } = useLists();

  if (error) {
    return (
      <main className="detail-state">
        <p>Couldn't load that movie ({error}).</p>
        <Link to="/">Back to home</Link>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="detail-state">
        <p>Loading…</p>
      </main>
    );
  }

  const backdrop = movie.backdrop_path
    ? BACKDROP_BASE + movie.backdrop_path
    : null;
  const year = movie.release_date?.slice(0, 4);
  const runtime = runtimeText(movie.runtime);

  return (
    <main className="detail">
      <div
        className="detail-banner"
        style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
      >
        <div className="detail-scrim" />
        <Link to="/" className="detail-back">
          <IoIosArrowBack size={20} />
          Back
        </Link>
      </div>

      <div className="detail-body">
        {movie.poster_path ? (
          <img
            className="detail-poster"
            src={IMG_BASE + movie.poster_path}
            alt={movie.title}
          />
        ) : (
          <div className="detail-poster detail-poster-fallback">
            {movie.title}
          </div>
        )}

        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>

          {movie.tagline && <p className="detail-tagline">{movie.tagline}</p>}

          <div className="detail-meta">
            <span className="detail-score">
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.vote_count.toLocaleString()} votes</span>
            {year && <span>{year}</span>}
            {runtime && <span>{runtime}</span>}
            <span>{movie.status}</span>
          </div>

          <ul className="detail-genres">
            {movie.genres.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>

          <h2 className="detail-heading">Overview</h2>
          <p className="detail-overview">
            {movie.overview || "No overview available."}
          </p>

          <div className="detail-actions">
            <button
              className={isFavorite(movie.id) ? "active-add" : ""}
              onClick={() => toggleFavorite(movie as Movie)}
            >
              <CiCircleCheck size={22} />
              {isFavorite(movie.id) ? "In my list" : "Add to list"}
            </button>
            <button
              className={isWatched(movie.id) ? "active-watched" : ""}
              onClick={() => toggleWatched(movie as Movie)}
            >
              <CiClock2 size={22} />
              {isWatched(movie.id) ? "Watched" : "Mark watched"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
