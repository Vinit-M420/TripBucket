import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import { useState } from 'react';
import { type NavbarState } from './types/navbarstate';
import Login from './components/Login';
import Signup from './components/Signup';
import YourTrips from './components/YourTrips';
import TripContent from './components/TripContent';
import Top3 from './components/Top3';
import PublicContent from './components/PublicContent';


function App() {
 const [navbarState, setNavbarState] =  useState<NavbarState>(localStorage.getItem("token") ? "trip" : "hero");

 const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
 const [selectedTripName, setSelectedTripName] = useState<string | null>(null);

  return (
    <div className='bg-stone-50 transition-colors duration-200'>
      <Navbar navbarState={navbarState} setNavbarState={setNavbarState} />
      
      <div className="flex-1">
        {navbarState === 'hero' && 
          (<div>
            <Hero setNavbarState={setNavbarState} navbarState={'hero'} />
            <Top3 setNavbarState={setNavbarState} navbarState={'hero'} />
          </div>
        )}
        {navbarState === 'login' && <Login setNavbarState={setNavbarState} />}
        {navbarState === 'signup' && <Signup setNavbarState={setNavbarState} />}
        {navbarState === 'trip' && 
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

        {navbarState ==='public' && 
          <PublicContent 
          
          />
        }
        
      </div>
    </div>
    )
}

export default App
