import { Link } from 'react-router-dom';
// import { useNavbarStore } from '../store';
import { motion } from 'framer-motion';
import { WorldMap } from './ui/world-map';

interface HeroProps {
  scrollToPublic: () => void;
}

const Hero = ({ scrollToPublic }: HeroProps) => {
  // const { setNavbarState } = useNavbarStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[calc(100dvh-80px)]"
    >
      <div className="absolute inset-0 z-0">
        <WorldMap 
            // className="w-full h-full object-cover" 
            // dots={[
            // {
            // start: { lat: 0.0887, lng: 73.8678 }, // Mumbai (BOM)
            // end: { lat: -55.9399, lng: 151.1753 }, // Sydney (SYD)
            // },
            // {
            // start: { lat: 35.6413, lng: -67.7781 }, // New York (JFK)
            // end: { lat: 45.4700, lng: -0.1543 }, // London (LHR)
            // },
            // {
            // start: { lat: 33.9367, lng: -118.3893 }, // Los Angeles (LAX)
            // end: { lat: -38.8103, lng: -42.2506 }, // Rio de Janeiro (GIG)
            // },
            // {
            // start: { lat: 10.5562, lng: 79.1003 }, // Delhi (DEL)
            // end: { lat: 22.5533, lng: 139.7811 }, // Tokyo (HND)
            // },
            // {
            // start: { lat: 49.0097, lng: 2.5478 }, // Paris (CDG)
            // end: { lat: 25.2528, lng: 55.3644 }, // Dubai (DXB)
            // },
            // {
            // start: { lat: 40.7690, lng: -73.9740 }, // San Francisco (SFO, approximate city center for airport)
            // end: { lat: 55.9558, lng: -3.2028 }, // Edinburgh (EDI)
            // },
            // {
            // start: { lat: 1.3596, lng: 103.9890 }, // Singapore (SIN)
            // end: { lat: 45.6343, lng: 8.7236 }, // Milan (MXP)
            // },
            // ]}
        />
      </div>

      {/* Text Content with Background */}
      <div className="absolute inset-0 flex flex-col gap-5 justify-center items-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-4xl text-green-800 font-bold text-center">
          Build your Travel Era
        </h1>
        <h4
          className="text-sm md:text-lg max-w-lg text-green-900 font-medium text-center bg-white/70 px-4 py-2 rounded-lg shadow-sm"
        >
          Organize ideas, photos, videos, and notes for your future destination. Create detailed itineraries that others can follow.
        </h4>

        <div className="flex justify-evenly md:gap-5 gap-2">
          <Link to="signup">
            <button
              className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 
              border-2 border-transparent md:text-base sm:text-sm text-xs text-center
              transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
              // onClick={() => setNavbarState('signup')}
            >
              Create Your Bucket list
            </button>
          </Link>

          <button
            className="border-2 border-green-700 text-green-700 md:text-base sm:text-sm text-xs
            transition-all duration-200 px-5 py-1 rounded-2xl hover:bg-green-100 bg-white
            hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            onClick={scrollToPublic}>
            Browse Public Trips
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;