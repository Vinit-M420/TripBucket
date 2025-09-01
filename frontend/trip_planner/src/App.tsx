import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import { useState } from 'react';
import type { NavbarState } from './types/navbarstate';
import Login from './components/Login';
import Signup from './components/Signup';
import Trips from './components/Trips';


function App() {
 const [navbarState, setNavbarState] = useState<NavbarState>('profile');

  return (
    <div className='bg-stone-50 transition-colors duration-200'>
      <Navbar navbarState={navbarState} setNavbarState={setNavbarState} />
      <div className="flex-1">
        {navbarState === 'hero' && <Hero />}
        {navbarState === 'login' && <Login setNavbarState={setNavbarState} />}
        {navbarState === 'signup' && <Signup setNavbarState={setNavbarState} />}
        {navbarState == 'profile' && <Trips /> }
      </div>
    </div>
    )
}

export default App
