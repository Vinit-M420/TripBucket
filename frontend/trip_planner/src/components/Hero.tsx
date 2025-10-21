import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WorldMap from "./ui/world-map";
import { Suspense } from "react";

interface HeroProps {
  scrollToPublic: () => void;
}

const Hero = ({ scrollToPublic }: HeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[calc(100dvh-80px)]"
    >
      <Suspense fallback={<div className="w-full h-full bg-[#fafaf9]" />}>
        <div className="absolute inset-0 z-0">
          <WorldMap />
        </div>
      </Suspense>

      <div className="absolute inset-0 flex flex-col gap-5 justify-center items-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-4xl text-green-800 font-bold text-center">
          Build your Travel Era
        </h1>
        <h4 className="text-sm md:text-lg max-w-lg text-green-900 font-medium text-center bg-white/70 px-4 py-2 rounded-lg shadow-sm">
          Organize ideas, photos, videos, and notes for your future destination. Create detailed itineraries that others can follow.
        </h4>
        <div className="flex justify-evenly md:gap-5 gap-2">
          <Link to="signup">
            <button
              className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 border-2 border-transparent md:text-base sm:text-sm text-xs text-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            >
              Create Your Bucket list
            </button>
          </Link>
          <button
            className="border-2 border-green-700 text-green-700 md:text-base sm:text-sm text-xs transition-all duration-200 px-5 py-1 rounded-2xl hover:bg-green-100 bg-white hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            onClick={scrollToPublic}
          >
            Browse Public Trips
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;