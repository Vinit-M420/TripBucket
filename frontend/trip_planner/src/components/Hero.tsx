import { Link } from 'react-router-dom';
import heropic from '../images/hero1.png'
import type { NavbarProps } from "../types/navbarstate";

interface HeroProps extends NavbarProps {
  scrollToPublic: () => void;
}

const Hero = ( { scrollToPublic, setNavbarState}:  HeroProps ) => {
    
    return (
        <div>
        <div className="flex flex-col gap-5 justify-center items-center mx-auto h-screen ">
        <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-xl text-green-800 font-bold text-center">
            Never Lose Another Travel Idea
        </h1>
        <h4 className="text-sm md:text-lg max-w-md text-green-700 text-center">
            Organize ideas, photos, videos, and notes for every destination...
        </h4>

        <div className='flex justify-evenly md:gap-5 gap-2'>
            <Link to='signup'>
                <button className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 
                border-2 border-transparent md:text-base sm:text-sm text-xs 
                transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
                onClick={() => setNavbarState('signup')}>
                    Create Your Bucket list
                </button>
            </Link>
            
            <button className="bg-transparent border-2 border-green-700 text-green-700 md:text-base sm:text-sm text-xs
                               transition-all duration-200 px-5 py-1 rounded-2xl hover:bg-green-100 
                               hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
                    onClick={scrollToPublic}>
                Browse Public Trips
            </button>
        </div>
        <img src={heropic} alt="maps" 
        className="w-full max-w-[400px] md:max-w-[500px] h-auto mx-auto" />
    </div>
        
    </div>
    
)}

export default Hero