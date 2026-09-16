import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import MovieLists from "./components/MovieLists/MovieLists";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <MovieLists />
    </>
  );
}
