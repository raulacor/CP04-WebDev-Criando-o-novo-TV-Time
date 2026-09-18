import { Link } from "react-router-dom";
import { CiCircleCheck, CiClock2 } from "react-icons/ci";
import "./Card.css";
import { IMG_BASE, type Movie } from "../../../../API/tmdb";
import { useLists } from "../../../../context/ListsContext";

export default function Card({ movie }: { movie: Movie }) {
  const { toggleFavorite, toggleWatched, isFavorite, isWatched } = useLists();

  function description(text: string, max = 220) {
    if (text.length <= max) return text;
    return (
      <>
        {text.slice(0, max)}
        <span> ...more </span>
      </>
    );
  }

  return (
    <Link to={`/movie/${movie.id}`} className="card">
      {movie.poster_path ? (
        <img src={IMG_BASE + movie.poster_path} alt={movie.title} id="poster" />
      ) : (
        <div className="poster-fallback">{movie.title}</div>
      )}
      <div className="info">
        <h3 id="title">{movie.title}</h3>
        <h4 id="release_date">{movie.release_date}</h4>
        <p id="description">{description(movie.overview)}</p>
      </div>
      <div className="add_ons">
        <h4 id="genre">{movie.genre_ids[0]}</h4>
        <div className="add_or_watched">
          <button
            id="add"
            className={isFavorite(movie.id) ? "active-add" : ""}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(movie);
            }}
          >
            <CiCircleCheck size={40} />
          </button>
          <button
            id="watched"
            className={isWatched(movie.id) ? "active-watched" : ""}
            onClick={(e) => {
              e.preventDefault();
              toggleWatched(movie);
            }}
          >
            <CiClock2 size={40} />
          </button>
        </div>
      </div>
    </Link>
  );
}
