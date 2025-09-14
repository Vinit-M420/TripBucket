import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import type { NavbarState } from "../types/navbarstate";
const API_BASE = import.meta.env.VITE_API_URL; 

interface NavbarProps {
  setNavbarState: (state: NavbarState) => void;
}

const Login = ( { setNavbarState} : NavbarProps ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE}/api/v1/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                alert(data.message || "Login failed");
                console.log("API_BASE =", API_BASE);
                return;              
            }


            localStorage.setItem("token", data.token);
            setNavbarState("trip");
            navigate("/trips"); 
            
        } catch (err) {
            console.error("Error logging in:", err);
            alert("Network error. Please try again.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 h-[calc(100dvh-80px)]">     
        
            <div className="border border-green-800 rounded-2xl py-5 md:w-xl w-sm shadow">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="md:text-3xl text-2xl text-black font-bold">Log In</h1>
                    <h2 className="md:text-base text-sm text-green-800">Build your Bucket list</h2>
                    <form className="md:w-md w-xs py-4" 
                        onSubmit={handleSubmit}>
                        <label className="md:text-base text-sm text-black pl-2">Email</label><br/>
                        <input className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 
                                             border-green-800 placeholder:text-green-600"
                                type="text" placeholder="Enter your email" 
                                onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <br/>
                        <label className="md:text-base text-sm text-black pl-2">Password</label>
                        <div>
                            <input className="bg-green-100 rounded-2xl w-full p-3 my-2 shadow border border-green-800
                                                placeholder:text-green-600 placeholder:text-base"
                                    type="password" placeholder="Enter your password" 
                                    onChange={(e) => setPassword(e.target.value)} value={password} required/>
                        </div>
                        <div className="flex flex-col gap-2 items-center mb-5">
                            <h4 className="text-xs text-center">
                                Password should contain one uppercase, lowercase, number and special character
                            </h4>
                            <h4 className="text-xs text-center">
                                Password should have atleast 8 characters 
                            </h4>
                        </div>
                        
                        <button type="submit" 
                        className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 md:text-lg text-md
                        border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700">
                            Log In
                        </button>
                    </form>
                </div>
            </div>

             <div className="flex justify-end md:w-xl w-sm mr-5">
                <div className="flex gap-5">
                    <h3 className="flex items-center md:text-base text-sm">Don't have an account?</h3>
                    <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                            transition duration-200 cursor-pointer hover:bg-green-100 md:text-base text-sm" 
                        onClick={() => setNavbarState("signup")}>
                            <Link to="/signup">Sign Up</Link>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Login