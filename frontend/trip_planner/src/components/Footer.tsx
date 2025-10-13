import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className="bottom-0 bg-green-800 w-full">
      <div className="flex flex-row justify-between items-center lg:items-start gap-6">
        <h1 className="text-4xl sm:text-5xl lg:text-9xl text-white text-center lg:text-left">
          TripBucket
        </h1>

        <p className="text-sm md:text-base lg:text-lg text-white text-center md:w-xs w-3xs my-10 md:mr-5">
          Plan your dream trips, build detailed itineraries, and share them with
          others.
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <h2 className="text-base md:text-lg text-white flex items-center gap-1">
          Made with <Heart className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" /> by Vinit
        </h2>
      </div>
    </div>
  );
};

export default Footer;
