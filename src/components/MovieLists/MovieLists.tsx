import "./MovieLists.css";
import SearchBar from "./SearchBar/SearchBar";
import Carousel from "./Carousel/Carousel";

export default function MovieLists() {
  return (
    <section className="movie-lists">
      <div className="lists">
        <SearchBar />
        <div className="featured"></div>
        <Carousel title="Highlights" path="movie/popular?language=en-US&page=1" />
        <Carousel title="Feature" path="trending/movie/week" />
        <Carousel title="Top Rated" path="movie/top_rated?language=en-US&page=1" />
      </div>
    </section>
  );
}