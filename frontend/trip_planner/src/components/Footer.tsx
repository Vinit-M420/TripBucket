import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className="bottom-0 w-full">

      <div className="flex justify-center mt-8">
        <h2 className="text-base md:text-lg text-green-800 flex items-center gap-1">
          Made with <Heart className="w-4 h-4 md:w-5 md:h-5 text-green-800 fill-white" /> by Vinit
        </h2>
      </div>
    </div>
  );
};

export default Footer;
