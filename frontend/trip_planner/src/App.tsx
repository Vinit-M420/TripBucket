import './App.css'
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Top3 from './components/Top3';
import Login from './components/Login';
import Signup from './components/Signup';
import YourTrips from './components/YourTrips';
import TripContent from './components/TripContent';
import PublicContent from './components/PublicContent';
import Footer from './components/Footer';
import { useNavbarStore } from './store';


function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const {navbarState, setNavbarState} = useNavbarStore();
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

  // used to listen for changes to the storage area 
  window.addEventListener('storage', handleStorageChange); 
   
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
      <Navbar />
      <Routes>
        <Route path="/" element={
          token ? (
            <Navigate replace to="/trips" />
            ) : ( 
            <>
              <Hero scrollToPublic={() => scrollToRef(publicRef)} />          
              <div ref={publicRef}> <Top3 /> </div>
              <Footer />
            </>        
            )
        } />
        
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/trips" 
            element={ token
                ? <YourTrips /> 
                :  <Navigate replace to={"/"} /> }/>      

        <Route path="/trip/:tripId" element={ <TripContent /> } />

        <Route path="/public/:shareId" element={ <PublicContent /> } />
      </Routes>
    </div>
  )
}

export default App