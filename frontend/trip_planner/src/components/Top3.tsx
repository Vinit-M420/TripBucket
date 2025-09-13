import type { NavbarProps } from "../types/navbarstate";
import { Link, useNavigate } from "react-router-dom";


const Top3 = ({setNavbarState} : NavbarProps ) => {
    const navigate = useNavigate(); 

    return (
        <div className="my-25 bg-stone-50">
            <div className="flex items-center mx-auto justify-center">
                <h3 className="font-semibold md:text-4xl text-3xl text-green-800 ">Public Trips</h3>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-auto justify-center items-center
                            lg:w-6xl md:w-2xl w-xs my-10">
                <div className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2
                                md:hover:translate-y-3 transition-all duration-200"
                    onClick={() => {
                        navigate("/public/icelandbaby");
                        setNavbarState("public");
                    }}>  
                    <img src="https://images.unsplash.com/photo-1500043357865-c6b8827edf10?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    className="w-full h-[70%] min-h-60 rounded-t-lg" />
                    <h1 className='text-green-800 text-xl font-semibold mx-5'>
                        Iceland
                    </h1>
                    <h2 className='text-green-600 md:text-md text-sm mx-5'>
                        Land of Fire & Ice—where glaciers and volcanoes meet.
                        Explore hot springs, black beaches, waterfalls, and northern lights.
                    </h2>
                    
                    <button className="bg-green-800 text-white hover:bg-green-700 transition-all duration-200 
                    cursor-pointer px-10 py-1 mx-auto rounded-2xl my-2"> 
                        <Link to="/public/icelandbaby">
                            <h3 className='md:text-lg text-md'>View</h3>
                        </Link>
                    </button>

                </div>   

                 <div className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2
                                md:hover:translate-y-3 transition-all duration-200"
                    onClick={() => { 
                        navigate("/public/ZU0U7AhV94");
                        setNavbarState("public");
                    }}>  
                    <img src="https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    className="w-full h-[70%] min-h-60 rounded-t-lg" />
                    <h1 className='text-green-800 text-xl font-semibold mx-5'>
                        Japan
                    </h1>
                    <h2 className='text-green-600 md:text-md text-sm mx-5'>
                        A stunning fusion of ancient temples and neon-lit cities.
                        Cherry blossoms, traditions, and world-famous cuisine await.    
                    </h2>
                    <button className="bg-green-800 text-white hover:bg-green-700 transition-all duration-200 
                    cursor-pointer px-10 py-1 mx-auto rounded-2xl my-2"> 
                        <h3 className='md:text-lg text-md'>View</h3>
                    </button>
                </div>

                 <div className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2 
                                md:hover:translate-y-2 transition-all duration-200"
                    onClick={() => {
                        navigate("/public/1ur7NZN6Xf");
                        setNavbarState("public");
                    }}>  
                    <img src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    className="w-full h-[70%] min-h-60 rounded-t-lg" />
                    <h1 className='text-green-800 text-xl font-semibold mx-5'>
                        Vietnam
                    </h1>
                    <h2 className='text-green-600 md:text-md text-sm mx-5'>
                        From emerald mountains to golden beaches and street food.
                        A vibrant blend of culture, nature, and adventure in Southeast Asia.
                    </h2>
                    <button className="bg-green-800 text-white hover:bg-green-700 transition-all duration-200 
                    cursor-pointer px-10 py-1 mx-auto rounded-2xl my-2"> 
                        <h3 className='md:text-lg text-md'>View</h3>
                    </button>
                </div>
            
            </div>   

        </div>
    )
}

export default Top3;