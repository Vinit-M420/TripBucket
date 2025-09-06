import { useState, useEffect } from "react";
import { Bars } from "../assets/bars";
import ProfileCircle from "../assets/profileCircle";
import { ChevronDown } from 'lucide-react';
import ProfileDropDown from "./ProfileDropdown";
import type { NavbarProps } from "../types/navbarstate";

const Navbar = ({navbarState, setNavbarState }: NavbarProps) => {
    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false);
    const [userFname, setUserFname] = useState("");

    useEffect(() => {
            async function fetchUser() {
                try {
                    const response = await fetch("http://localhost:5000/api/v1/user/get", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    });
        
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error("Backend error:", errorText);
                        throw new Error("Failed to fetch trips");
                    }
    
                    const userdata = await response.json();
                    setUserFname(userdata.response.firstName);
                    // console.log(userdata.firstName);
    
                } catch (err) {
                    console.error("Error fetching trips:", err);
                }
            }
    
            fetchUser();
        }, []);
  
  if (toggleNavbar) {
    return (
      <div className="fixed inset-0 bg-stone-100 z-50 mx-auto">
          <div className="flex justify-around p-4 min-h-[60px] items-center md:hidden">
            <h1 className="font-bold text-2xl tracking-tight text-green-950 cursor-pointer"
                    onClick={() => setNavbarState("hero")}>
                  TripBucket
            </h1>
            <div className={`border border-transparent hover:border hover:border-green-800 rounded-lg p-1 `}       
                onClick={() => setToggleNavbar(!toggleNavbar)} >
                <Bars />
            </div>
          </div>

          <div className="flex flex-col gap-10 items-center mt-10">
            <div className="flex items-center justify-center border-b border-gray-400 w-xs">
                <h2 className="text-lg tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                          transition duration-200 text-center pb-2">
                  Create
                </h2>
              </div>
              <div className="flex items-center justify-center border-b border-gray-400 w-xs">
                <h2 className="text-lg tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                    transition duration-200 text-center pb-2">
                  Browse
                </h2>
              </div>
              <div className="flex items-center justify-center border-b border-gray-400 w-xs">
                <h2 className="md:text-lg text-base tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                    transition duration-200 pb-2"
                    onClick={() => {setNavbarState("login"); setToggleNavbar(false)}}>
                  Log In
                </h2>
              </div>
              <div className="flex items-center justify-center border-b border-gray-400 w-xs">
                <h2 className="text-lg tracking-wide cursor-pointer text-green-800 hover:text-green-600 
                    transition duration-200 pb-2"
                    onClick={() => {setNavbarState("signup"); setToggleNavbar(false)}}>
                  Sign Up
                </h2>
              </div>
          </div>

      </div>
    )
  }

  return (
    <div>
      <div className="top-0 bg-stone-100 shadow-sm p-4 min-h-[80px] md:flex items-center hidden">
        <div className="flex justify-between md:mx-20 mx-5 items-center w-full">
          <div className="flex lg:gap-20 gap-10 items-center">
            <div className="flex items-center">
              <h1 className="font-bold text-2xl tracking-tight text-green-950 cursor-pointer"
                  onClick={() => setNavbarState("hero")}>
                TripBucket
              </h1>
            </div>
            <div className={`flex lg:gap-10 gap-5 items-center 
              ${(navbarState === 'login' || navbarState === 'signup' || navbarState === 'profile') ? 'hidden' : ''}`}>
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
          
          <div className={`flex gap-5 items-center 
            ${(navbarState === 'login' || navbarState === 'signup' || navbarState === 'profile') ? 'hidden' : ''}`}>
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

          <div className={`flex gap-3 items-center cursor-pointer ${(navbarState === 'profile') ? 'block' : "hidden"}`}
                onClick={() => {
                  setToggleProfileDropdown(!toggleProfileDropdown);
                  }
                }>
              <ProfileCircle   />
              <div className="flex items-center">
                <h2 className="font-bold text-xl">Hi {userFname}</h2>
              </div>
              <ChevronDown  
                className={`transition-transform duration-200 ${toggleProfileDropdown ? 'rotate-180' : 'rotate-0'}`}/>
          </div>

        </div>
      </div>
      <div className="flex justify-around p-4 min-h-[60px] items-center md:hidden shadow-sm">
          <h1 className="font-bold text-2xl tracking-tight text-green-950 cursor-pointer"
                  onClick={() => setNavbarState("hero")}>
                TripBucket
          </h1>
          <div className={`border border-transparent hover:border hover:border-green-800 rounded-lg p-1
                ${(navbarState === 'login' || navbarState === 'signup' || navbarState === 'profile') ? 'hidden' : ''}`}
              onClick={() => setToggleNavbar(!toggleNavbar)} >
              <Bars />
          </div>
      </div>
      {toggleProfileDropdown && 
      <ProfileDropDown 
          // navbarState={navbarState} 
          setNavbarState={setNavbarState} 
          setToggleProfileDropdown={setToggleProfileDropdown}
      /> }

    </div>
  );
};

export default Navbar;
