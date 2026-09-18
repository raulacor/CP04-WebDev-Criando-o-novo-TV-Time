import "./Carousel.css";
import Card from "./Card/Card";
import { useMovies, type Movie } from "../../../API/tmdb";

type Props = {
  title: string;
  path?: string;
  list?: Movie[];
};

export default function Carousel({ path, title, list }: Props) {
  const fetched = useMovies(path ?? "");
  const movies = list ?? fetched;

  if (list && list.length === 0) return null;

  return (
    <div className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel">
        {movies.map((m) => (
          <Card movie={m} key={m.id} />
        ))}
      </div>
    </div>
  );
}
