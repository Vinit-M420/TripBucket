import { useState, useEffect } from "react";
import { Bars } from "../assets/bars";
import { ChevronDown, CircleUser  } from 'lucide-react';
import ProfileDropDown from "./ProfileDropdown";
import type { NavbarProps } from "../types/navbarstate";
import { Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL; 

const Navbar = ({navbarState, setNavbarState }: NavbarProps) => {
    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false);
    const [userFname, setUserFname] = useState("");

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

    if (localStorage.getItem("token")) {
      fetchUser();
    }
  }, [navbarState]); 

  
  if (toggleNavbar) {
    return (
      <div className="fixed inset-0 bg-stone-100 z-50 mx-auto w-sm">
          <div className="flex justify-between mx-2 p-4 min-h-[60px] items-center md:hidden">
            <Link to={navbarState === "trip" || navbarState === "content" || navbarState === "profile" ? "" : "/"}>
              <h1 className="font-bold text-2xl tracking-tight text-green-950 cursor-pointer"
                      onClick={navbarState === "trip" || navbarState === "content" || navbarState === "profile"
                        ? undefined : () => setNavbarState("hero") }>
                    TripBucket
              </h1>
            </Link>
            <div className={`border border-transparent hover:border hover:border-green-800 rounded-lg p-1
            ${navbarState === "trip" || navbarState === "content" ? "hidden" : 'flex'}`}       
                onClick={() => setToggleNavbar(!toggleNavbar)} >
                <Bars />
            </div>           
          </div>

          <div className="flex flex-col gap-10 items-center mt-10">
              <div className="flex items-center justify-center border-b border-gray-400 w-xs">
                <Link to="/login">
                <h2 className="md:text-lg text-base tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                    transition duration-200 pb-2"
                    onClick={() => {setNavbarState("login"); setToggleNavbar(false)}}>
                  Log In
                </h2>
                </Link>
              </div>
              <div className="flex items-center justify-center border-b border-gray-400 w-xs">
                <Link to="/signup">
                <h2 className="text-lg tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                    transition duration-200 pb-2"
                    onClick={() => {setNavbarState("signup"); setToggleNavbar(false)}}>
                  Sign Up
                </h2>
                </Link>
              </div>
              
          </div>
      </div>
    )
  }

  return (
    <div>
      <div className=" top-0 left-0 w-full z-50 
                  bg-stone-100 shadow-sm p-4 min-h-[80px] md:flex items-center hidden">
        <div className="flex justify-between md:mx-20 mx-5 items-center w-full">
          <div className="flex lg:gap-20 gap-10 items-center">
            <div className="flex items-center">
              <Link to="/">
              <h1 className="font-bold text-2xl tracking-tight text-green-950 cursor-pointer"
                  onClick={navbarState === "trip" || navbarState === "content" || navbarState === "profile"
                    ? undefined : () => setNavbarState("hero")}>
                TripBucket
              </h1>
              </Link>
            </div>
          </div>
          
          <div className={`flex gap-5 items-center 
            ${(navbarState === "hero" ) ? '' : 'hidden'}`}>
            <Link to="/login">
              <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                              transition duration-200 cursor-pointer hover:bg-green-100"
                  onClick={() => setNavbarState("login")}>

                  <h2 className="text-lg">Log In</h2>         
              </div>
            </Link>
            <Link to="/signup">
              <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 border-2 border-transparent
                              transition duration-200 cursor-pointer hover:bg-green-700"
                  onClick={() => setNavbarState("signup")}>
               
                  <h2 className="text-lg">Sign Up</h2>    
              </div>
            </Link> 
          </div>

          <div className={`flex gap-3 items-center cursor-pointer 
                ${(navbarState === "trip" || navbarState === 'content') ? '' : "hidden"}`}
                onClick={() => setToggleProfileDropdown(!toggleProfileDropdown)}>
              <CircleUser className="size-7"  />
              <div className="flex items-center">
                <h2 className="font-bold text-xl">Hi {userFname}</h2>
              </div>
              <ChevronDown  
                className={`transition-transform duration-200 ${toggleProfileDropdown ? 'rotate-180' : 'rotate-0'}`}/>
          </div>

        </div>
      </div>
      
      <div className="flex justify-between p-4 min-h-[60px] items-center md:hidden shadow-sm mx-2">
           <Link to="/">
              <h1 className="font-bold text-2xl tracking-tight text-green-950 cursor-pointer"
                      onClick={navbarState === "trip" || navbarState === "content" || navbarState === "profile"
                            ? undefined
                            : () => setNavbarState("hero")
                          }>
                    TripBucket
              </h1>
          </Link>
          <div className={`border border-transparent hover:border hover:border-green-800 rounded-lg p-1
                ${(navbarState === 'hero') ? '' : 'hidden'}`}
              onClick={() => setToggleNavbar(!toggleNavbar)} >
              <Bars />
          </div>

          <div className={`flex gap-3 items-center cursor-pointer hover:bg-stone-200
                ${(navbarState === "trip" || navbarState === 'content') ? '' : "hidden"}`}
                onClick={() => setToggleProfileDropdown(!toggleProfileDropdown)}>
              <CircleUser className="size-5" />
              <div className="flex items-center">
                <h2 className="font-bold text-md">Hi {userFname}</h2>
              </div>
              <ChevronDown  
                className={`size-5 transition-transform duration-200 ${toggleProfileDropdown ? 'rotate-180' : 'rotate-0'}`}/>
          </div>
      </div>

      {toggleProfileDropdown && 
      <ProfileDropDown 
          setNavbarState={setNavbarState} 
          setToggleProfileDropdown={setToggleProfileDropdown}/> 
      }
    </div>
  );
};

export default Navbar;
