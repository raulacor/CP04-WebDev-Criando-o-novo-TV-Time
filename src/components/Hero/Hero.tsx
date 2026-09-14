import WebThreads from './WebThreads/WebThreads';
import { IoIosArrowDown } from "react-icons/io";

import './Hero.css'

export default function Hero() {
    return (
        <>
        <section className='hero-section'>
            <div className='hero-bg'>
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
            <div className='hero-content'>
            <h1>Tv Time</h1>
            <div className='cta'>
                <h2>cinefilar</h2>
                <span className='cta-btn'><IoIosArrowDown size={25}/></span>
            </div>
            </div>
        </section>
      </>
    )
}