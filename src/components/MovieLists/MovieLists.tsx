import "./MovieLists.css";
import SearchBar from "./SearchBar/SearchBar";
import Featured from "./Featured/Featured";
import Carousel from "./Carousel/Carousel";
import { useLists } from "../../context/ListsContext";

export default function MovieLists() {
  const { favorites, watched } = useLists();

  return (
    <section className="movie-lists">
      <div className="lists">
        <SearchBar />
        <Featured />
        <Carousel title="Highlights" path="movie/popular?language=en-US&page=1" />
        <Carousel title="Wathced" list={favorites} />
        <Carousel title="Watch-List" list={watched} />

      </div>
    </section>
  );
}
