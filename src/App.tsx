import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero'
import './App.css'
import { useState, useEffect } from 'react';

import { CiCircleCheck, CiClock2 } from "react-icons/ci";



const URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

type Movie = {
id: number;
title: string;
release_date: string;
overview: string;
genre_ids: number[]
poster_path: string | null;
};  

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(URL, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` }
      });
      if (!res.ok) throw new Error(`TMDB ${res.status}`);
      const data = await res.json();
      setMovies(data.results);
      }
      load();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <section className='hub'>

        <div className='highlights'>
          <div className='search-field'>
            <input type="text" placeholder="E.g. Avenger's Doomsday"/>
          </div>
          <div className='carousel'>
            {movies.map(m => (
              <div className='card' key={m.id}>
                {m.poster_path
                  ? <img src={IMG_BASE + m.poster_path} alt={m.title} id='poster'/>
                  : <div className="poster-fallback">{m.title}
                </div>}
                <div className='info'>
                  <h3 id='title'>{m.title}</h3>
                  <h4 id='release_date'>{m.release_date}</h4>
                  <p id='description'>{m.overview}</p>
                </div>
                <div className='add_ons'>
                  <h4 id='genre'>{m.genre_ids}</h4>
                  <div className='add_or_watched'>
                    <button id='add'><CiCircleCheck size={40}/></button>
                    <button id='watched'><CiClock2 size={40}/></button>
                    </div>
                </div>
              </div>
            ))}        
          </div>
        </div>

      </section>
    </>
  )
}