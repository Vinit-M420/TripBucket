import { useState, useEffect } from "react";
import { Bars } from "../assets/bars";
import { ChevronDown, CircleUser } from 'lucide-react';
import ProfileDropDown from "./ProfileDropdown";
import { Link, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const location = useLocation(); // Get current route
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false);
  const [userFname, setUserFname] = useState("");

  // const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isTripOrContentPage = location.pathname.includes('/trip') || location.pathname.includes('/content')
          || location.pathname.includes('/profile')  ;
  const isHeroPage = location.pathname === '/';

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${API_BASE}/api/v1/user/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Backend error:", errorText);
          throw new Error("Failed to fetch user");
        }

        const userdata = await response.json();
        setUserFname(userdata.response.firstName);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }

    if (localStorage.getItem("token") && isTripOrContentPage) {
      fetchUser();
    }
  }, [location.pathname, isTripOrContentPage]); 

  if (toggleNavbar) {
    return (
      <div className="fixed inset-0 bg-stone-100 z-50 mx-auto">
        <div className="flex justify-between p-4 min-h-[60px] items-center md:hidden">
          <Link to={isTripOrContentPage ? "" : "/"}>
            <h1 className="font-bold md:text-2xl text-xl tracking-tight text-green-950 cursor-pointer">
              TripBucket
            </h1>
          </Link>
          <div
            className={`border border-transparent hover:border hover:border-green-800 rounded-lg p-1
            ${isTripOrContentPage ? "hidden" : 'flex'}`}
            onClick={() => setToggleNavbar(!toggleNavbar)}
          >
            <Bars />
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center mt-10">
          <div className="flex items-center justify-center border-b border-gray-400 w-xs">
            <Link to="/login">
              <h2 className="md:text-lg text-base tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                    transition duration-200 pb-2"
                onClick={() => setToggleNavbar(false)}>
                Log In
              </h2>
            </Link>
          </div>
          <div className="flex items-center justify-center border-b border-gray-400 w-xs">
            <Link to="/signup">
              <h2
                className="text-lg tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                    transition duration-200 pb-2"
                onClick={() => setToggleNavbar(false)}
              >
                Sign Up
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="top-0 left-0 w-full z-50 bg-stone-100 shadow-sm p-4 min-h-[80px] md:flex items-center hidden">
        <div className="flex justify-between md:mx-20 mx-5 items-center w-full">
          <div className="flex lg:gap-20 gap-10 items-center">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="font-bold md:text-2xl text-xl tracking-tight text-green-950 cursor-pointer">
                  TripBucket
                </h1>
              </Link>
            </div>
          </div>

          {/* Show Login/Signup buttons only on hero page */}
          {isHeroPage && (
            <div className="flex gap-5 items-center">
              <Link to="/login">
                <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                              transition duration-200 cursor-pointer hover:bg-green-100">
                  <h2 className="text-lg">Log In</h2>
                </div>
              </Link>
              <Link to="/signup">
                <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 border-2 border-transparent
                              transition duration-200 cursor-pointer hover:bg-green-700">
                  <h2 className="text-lg">Sign Up</h2>
                </div>
              </Link>
            </div>
          )}

          {/* Show profile dropdown on trip/content pages */}
          {isTripOrContentPage && (
            <div
              className="flex gap-3 items-center cursor-pointer"
              onClick={() => setToggleProfileDropdown(!toggleProfileDropdown)}
            >
              <CircleUser className="size-7" />
              <div className="flex items-center">
                <h2 className="font-bold text-xl">Hi {userFname}</h2>
              </div>
              <ChevronDown
                className={`transition-transform duration-200 ${toggleProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between p-4 min-h-[60px] items-center md:hidden shadow-sm">
        <Link to="/">
          <h1 className="font-bold md:text-2xl text-xl tracking-tight text-green-950 cursor-pointer">
            TripBucket
          </h1>
        </Link>

        {isHeroPage && (
          <div
            className="border border-transparent hover:border hover:border-green-800 rounded-lg p-1"
            onClick={() => setToggleNavbar(!toggleNavbar)}
          >
            <Bars />
          </div>
        )}

        {isTripOrContentPage && (
          <div
            className="flex gap-2 items-center cursor-pointer hover:bg-stone-200 p-1 rounded-xl"
            onClick={() => setToggleProfileDropdown(!toggleProfileDropdown)}
          >
            <CircleUser className="size-5" />
            <div className="flex items-center">
              <h2 className="font-bold text-md">Hi {userFname}</h2>
            </div>
            <ChevronDown
              className={`size-5 transition-transform duration-200 ${toggleProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        )}
      </div>

      {toggleProfileDropdown && (
        <ProfileDropDown setToggleProfileDropdown={setToggleProfileDropdown} />
      )}
    </div>
  );
};

export default Navbar;