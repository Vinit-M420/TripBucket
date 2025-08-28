
const Navbar = () => {
    
    return (
        <div className="top-0 bg-stone-50 shadow-lg p-4">
            <div className="flex justify-around mx-auto items-center">
                <div className="flex gap-20">
                    <div className="flex items-center">
                        <h1 className="font-bold text-2xl tracking-tight cursor-pointer text-black ">
                            TripBucket</h1>
                    </div>
                    <div className="flex gap-10">
                        <div className="flex items-center">
                            <h2 className="text-lg tracking-wide cursor-pointer text-green-950 hover:text-green-600 ">
                                CREATE
                            </h2>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-lg tracking-wide cursor-pointer text-green-950 hover:text-green-600">
                                BROWSE
                            </h2>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-10">
                    <div className="flex items-center">
                        <h2 className="text-lg tracking-wide cursor-pointer text-green-950 hover:text-green-600">
                            LOGIN</h2>
                    </div>

                    <div className="bg-green-800 rounded-2xl px-5 py-1 border-2 border-transparent text-stone-50 transition duration-100 
                        cursor-pointer hover:bg-stone-50 hover:border-2 hover:border-green-800 hover:text-green-800">
                        <h2 className="text-lg tracking-wide">
                            SIGN UP</h2> 
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;