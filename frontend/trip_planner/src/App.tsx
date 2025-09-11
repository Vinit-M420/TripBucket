import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import { useState } from 'react';
import { type NavbarState } from './types/navbarstate';
import Login from './components/Login';
import Signup from './components/Signup';
import YourTrips from './components/YourTrips';
import TripContent from './components/TripContent';
import PublicContent from './components/PublicContent';
import Top3 from './components/Top3';

function App() {
 const [navbarState, setNavbarState] =  useState<NavbarState>(localStorage.getItem("token") ? "trip" : "hero");
 const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
 const [selectedTripName, setSelectedTripName] = useState<string | null>(null);

  return (
    <div className="bg-stone-50 transition-colors duration-200 min-h-screen">
      <Navbar navbarState={navbarState} setNavbarState={setNavbarState} />
      <Routes>

        <Route path="/" element={
          (<div>
            <Hero setNavbarState={setNavbarState} navbarState={navbarState} />
            <Top3 setNavbarState={setNavbarState} navbarState={'hero'} />
         </div>)
        } />
        <Route path="/login" element={<Login setNavbarState={setNavbarState} />} />
        <Route path="/signup" element={<Signup setNavbarState={setNavbarState} />} />

        <Route path="/trips" element={
            <YourTrips 
            setNavbarState={setNavbarState} 
            setSelectedTripId={setSelectedTripId}
            setSelectedTripName={setSelectedTripName}/>} />

        <Route path="/trip/:tripId" element={
          <TripContent 
            tripId={selectedTripId} 
            tripName={selectedTripName}
            setNavbarState={setNavbarState}
            />
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
