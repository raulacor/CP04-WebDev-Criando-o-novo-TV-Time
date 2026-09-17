import "./Carousel.css";
import Card from "./Card/Card";
import { useMovies } from "../../../API/tmdb";

type Props = {
  path: string;
  title: string;
};

export default function Carousel({ path, title }: Props) {
  const movies = useMovies(path);

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
