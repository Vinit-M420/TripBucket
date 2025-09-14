import { Link } from 'react-router-dom';
import heropic from '../images/hero1.png'
import type { NavbarProps } from "../types/navbarstate";

interface HeroProps extends NavbarProps {
  scrollToPublic: () => void;
}

const Hero = ( { scrollToPublic, setNavbarState}:  HeroProps ) => {
    
    return (
        <div>
        <div className="flex flex-col gap-5 justify-center items-center mx-auto h-screen">
        <h1 className="lg:text-6xl md:text-5xl text-4xl lg:w-4xl md:w-lg w-md text-green-800 font-bold text-center">
            Never Lose Another Travel Idea
        </h1>
        <h4 className="md:text-lg text-sm lg:w-lg md:w-md w-sm text-green-700 text-center">
            Organize ideas, photos, videos, and notes for every destination. Create detailed itineraries others can follow.
        </h4>
        <div className='flex justify-evenly gap-5'>
            <Link to='signup'>
                <button className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 sm:text-base text-sm
                transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
                onClick={() => setNavbarState('signup')}>
                    Create Your Bucket list
                </button>
            </Link>
            
            <button className="bg-transparent border-2 border-green-700 text-green-700 sm:text-base text-sm
                               transition-all duration-200 px-5 py-1 rounded-2xl hover:bg-green-100 
                               hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
                    onClick={scrollToPublic}>
                Browse Public Trips
            </button>
        </div>
        <img src={heropic} alt="maps" className='md:w-[500px] w-[400px] h-auto' />
    </div>
        
    </div>
    
)}

export default Hero