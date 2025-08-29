import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import { useState } from 'react';
import type { NavbarState } from './types/navbarstate';
// import Login from './components/Login';


function App() {
 const [navbarState, setNavbarState] = useState<NavbarState>('hero');

  return (
    <div className='bg-stone-50 transition-colors duration-200'>
      <Navbar navbarState={navbarState} setNavbarState={setNavbarState} />
      <Hero />
      <Login />
    </div>
    )
}

export default App
