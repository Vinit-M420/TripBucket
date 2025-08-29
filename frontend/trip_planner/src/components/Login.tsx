import type { NavbarState } from "../types/navbarstate";

interface NavbarProps {
//   navbarState: NavbarState;
  setNavbarState: (state: NavbarState) => void;
}


const Login = ( { setNavbarState} : NavbarProps ) => {
    return (
        <div className="flex flex-col justify-center items-center gap-5 h-[calc(100dvh-80px)]">
           
            <div className="border border-green-800 rounded-2xl py-5 w-2xl shadow">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl text-black font-bold">Log In</h1>
                    <h2 className="text-base text-green-800">Build your Bucket list</h2>
                    <form className="w-md pb-4">
                        <label className="text-base text-black pl-2">Email</label><br/>
                        <input className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="text" placeholder="Enter your email" required />
                        <br/>
                        <label className="text-base text-black pl-2">Password</label>
                        <div>
                            <input className="bg-green-100 rounded-2xl w-full p-3 my-2 shadow border border-green-800
                                                placeholder:text-green-600 placeholder:text-base"
                                    type="password" placeholder="Enter your password" required/>
                        </div>
                        <div className="flex items-center mb-5">
                            <h4 className="text-xs text-center hidden">
                                Password should contain one uppercase, lowercase, number and special character
                            </h4>
                        </div>
                        
                        <button className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 text-lg
                        border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700" 
                                type="submit">Log In</button>

                    </form>
                </div>
            </div>
             <div className="flex gap-5">
                <h3 className="flex items-center">Don't have an account?</h3>
                <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                          transition duration-200 cursor-pointer hover:bg-green-100" 
                    onClick={() => setNavbarState("signup")}>
                        <h2 className="text-base">Sign Up</h2> 
                </div> 
            </div>
        </div>
    )
}

export default Login