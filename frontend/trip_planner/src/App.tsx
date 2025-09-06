import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import { useState } from 'react';
import { type NavbarState } from './types/navbarstate';
import Login from './components/Login';
import Signup from './components/Signup';
import YourTrips from './components/YourTrips';
import TripContent from './components/TripContent';


function App() {
 const [navbarState, setNavbarState] = useState<NavbarState>('hero');
 const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
 const [selectedTripName, setSelectedTripName] = useState<string | null>(null);
 
  return (
    <div className='bg-stone-50 transition-colors duration-200'>
      <Navbar navbarState={navbarState} setNavbarState={setNavbarState} />
      <div className="flex-1">
        {navbarState === 'hero' && <Hero />}
        {navbarState === 'login' && <Login setNavbarState={setNavbarState} />}
        {navbarState === 'signup' && <Signup setNavbarState={setNavbarState} />}
        {navbarState === 'profile' && 
          <YourTrips 
            setNavbarState={setNavbarState} 
            setSelectedTripId={setSelectedTripId}
            setSelectedTripName={setSelectedTripName}/>
        }
        
        {navbarState === 'content' && selectedTripId && 
          <TripContent 
            tripId={selectedTripId} 
            tripName={selectedTripName}
            setNavbarState={setNavbarState}
            />
        }
      </div>
    </div>
    )
}

export default App
