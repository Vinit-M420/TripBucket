import type { NavbarState } from "../types/navbarstate";

interface NavbarProps {
  navbarState: NavbarState;
  setNavbarState: (state: NavbarState) => void;
}

const Navbar = ({ navbarState, setNavbarState }: NavbarProps) => {
  return (
    <div className="top-0 bg-stone-50 shadow-sm p-4 min-h-[80px] flex items-center">
      <div className="flex justify-between mx-20 items-center w-full">
        <div className="flex gap-20 items-center">
          <div className="flex items-center">
            <h1 className="font-bold text-2xl tracking-tight text-green-950 cursor-pointer"
                onClick={() => setNavbarState("hero")}>
              TripBucket
            </h1>
          </div>
          <div className={`flex gap-10 items-center ${(navbarState === 'login' || navbarState === 'signup') ? 'hidden' : ''}`}>
            <div className="flex items-center">
              <h2 className="text-lg tracking-wide cursor-pointer text-green-800 hover:text-green-600 transition duration-200">
                Create
              </h2>
            </div>
            <div className="flex items-center">
              <h2 className="text-lg tracking-wide cursor-pointer text-green-800 hover:text-green-600 transition duration-200">
                Browse
              </h2>
            </div>
          </div>
        </div>
        
        <div className={`flex gap-5 items-center ${(navbarState === 'login' || navbarState === 'signup') ? 'hidden' : ''}`}>
          <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                          transition duration-200 cursor-pointer hover:bg-green-100"
              onClick={() => setNavbarState("login")}>
            <h2 className="text-lg">
              Log In
            </h2>
          </div>

          <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 border-2 border-transparent
                          transition duration-200 cursor-pointer hover:bg-green-700"
              onClick={() => setNavbarState("signup")}>
            <h2 className="text-lg">
              Sign Up
            </h2> 
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Navbar;
