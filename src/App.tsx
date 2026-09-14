import WebThreads from './components/WebThreads/WebThreads';
import Navbar from './components/Navbar/Navbar';
import './App.css'

import { IoIosArrowDown } from "react-icons/io";



export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ width: '100%', height: '800px', position: 'relative' }}>
        <WebThreads
          color1="#BFA181"
          color2="#ffecaf"
          color3="#ffffff"
          speed={0.2}
          threadCount={3}
          frequency={5}
          spread={0.18}
          taper={1}
          position={0.5}
          fanMode="center"
          glow={0.02}
          falloff={0.6}
          thickness={1.1}
          brightness={0.6}
          opacity={1}
          mirror
          shimmer={false}
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
        />
      </div>
      <h1>Tv Time</h1>
      <div className='cta'>
        <h2>cinefilar</h2>
        <span className='cta-btn'><IoIosArrowDown size={25}/></span>
      </div>
    </>
  )
}