import "./MovieLists.css";
import SearchBar from "./SearchBar/SearchBar";
import Carousel from "./Carousel/Carousel";

export default function MovieLists() {
  return (
    <section className="movie-lists">
      <div className="highlights">
        <SearchBar />
        <Carousel />
      </div>
    </section>
  );
}
