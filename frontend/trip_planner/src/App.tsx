import './App.css'
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate  } from "react-router-dom";
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Top3 from './components/Top3';
import Login from './components/Login';
import Signup from './components/Signup';
import YourTrips from './components/YourTrips';
import TripContent from './components/TripContent';
import PublicContent from './components/PublicContent';
import { type NavbarState } from './types/navbarstate';

function App() {
 const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
 const [navbarState, setNavbarState] =  useState<NavbarState>(token ? "trip" : "hero");
 const [hidePassword, setHidePassword] = useState<boolean>(true);
 const publicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     const handleStorageChange = () => {
     const newToken = localStorage.getItem("token");
     setToken(newToken);
     
     if (newToken && navbarState === "hero") {
       setNavbarState("trip");
     } else if (!newToken && navbarState === "trip") {
       setNavbarState("hero");
     }
   };

   // Listen for storage events (when localStorage changes in other tabs)
   window.addEventListener('storage', handleStorageChange);
   
   // Initial check
   const currentToken = localStorage.getItem("token");
   if (currentToken !== token) {
     handleStorageChange();
   }

   return () => {
     window.removeEventListener('storage', handleStorageChange);
   };
 }, [token, navbarState]); 

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-stone-50 transition-colors duration-200 min-h-screen scroll-smooth">
      <Navbar navbarState={navbarState} setNavbarState={setNavbarState} />
      <Routes>

        <Route path="/" element={
          token ? (
            <Navigate replace to="/trips" />
          ) : ( 
            <>
              <Hero 
                setNavbarState={setNavbarState} 
                navbarState={navbarState} 
                scrollToPublic={() => scrollToRef(publicRef)} />          
              <div ref={publicRef} >
                <Top3  setNavbarState={setNavbarState} navbarState={'hero'} />
              </div>
            </>        
          )
        } />
        
        <Route path="/login" element={
          <Login 
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}      
            setNavbarState={setNavbarState} />} />

        <Route path="/signup" element={
          <Signup 
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}   
            setNavbarState={setNavbarState} />} />

        <Route path="/trips" 
            element={
              token
                ? <YourTrips setNavbarState={setNavbarState} navbarState={'trip'} /> 
                :  <Navigate replace to={"/"} />
          }
        />      

        <Route path="/trip/:tripId" element={
          <TripContent 
            setNavbarState={setNavbarState} navbarState={'content'} />
        } />

        <Route path="/public/:shareId" element={
          <PublicContent 
            setNavbarState={setNavbarState} 
            navbarState={'hero'}  
            />
          } />
      </Routes>
    </div>
  )
}

export default App