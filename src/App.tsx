import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero'
import './App.css'



export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className='hub'>
        <div className='highlights'>
          <div className='search-field'>
            <input type="text" placeholder="E.g. Avenger's Doomsday"/>
          </div>

        </div>
      </section>
    </>
  )
}