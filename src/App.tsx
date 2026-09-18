import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import { ListsProvider } from "./context/Lists";
import "./App.css";

export default function App() {
  return (
    <ListsProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </ListsProvider>
  );
}
