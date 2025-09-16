import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import type { NavbarState } from "../types/navbarstate";
import { Eye, EyeOff } from 'lucide-react';
const API_BASE = import.meta.env.VITE_API_URL; 

type SignupProps = { 
    hidePassword: boolean;
    setHidePassword: React.Dispatch<React.SetStateAction<boolean>>;
    setNavbarState: (state: NavbarState) => void;
}

const Signup = ({hidePassword, setHidePassword, setNavbarState} : SignupProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch(`${API_BASE}/api/v1/user/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    firstName: name.split(" ")[0] , lastName: name.split(" ")[1], email, password }),
            });

            const data = await response.json();

            if (!response.ok){
                alert(data.message || "Signup failed");
                return;
            }

            alert("You're successfully Signed up!");
            setNavbarState("login");
            navigate("/login");

        } catch(err){
            console.error("Error signing up:", err);
            alert("Network error. Please try again.");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5 h-[calc(100dvh-80px)] px-4">
           
            <div className="border border-green-800 rounded-2xl py-5 w-full max-w-xl shadow">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="md:text-3xl text-2xl text-black font-bold">Create Account</h1>
                    <h2 className="md:text-base text-sm text-green-800">Welcome to TripBucket</h2>

                    <form className="w-[80%] max-w-sm py-4" onSubmit={handleSubmit}>
                        <label className="md:text-base text-sm text-black pl-2">Name</label><br/>
                        <input className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="text" placeholder="Enter your Name" 
                                onChange={(e) => setName(e.target.value)} value={name} required />
                        <br/>
                        <label className="md:text-base text-sm text-black pl-2">Email</label><br/>
                        <input className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="text" placeholder="Enter your email" 
                                onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <br/>
                        <label className="md:text-base text-sm text-black pl-2">Password</label>
                        <div className="flex relative items-center ">
                            <input className="bg-green-100 rounded-2xl w-full p-3 my-2 shadow border border-green-800
                                                placeholder:text-green-600 placeholder:text-base"
                                    type={hidePassword ? "password" : 'text'} 
                                    placeholder="Enter your password" 
                                    onChange={(e) => setPassword(e.target.value)} value={password} required/>
                            <div className="absolute right-5" 
                                onClick={() => setHidePassword(!hidePassword)}>
                                { hidePassword ? <Eye /> : <EyeOff />}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center mb-5">
                            <h4 className="text-xs text-center">
                                Password should contain one uppercase, lowercase, number and special character
                            </h4>
                            <h4 className="text-xs text-center">
                                Password should have atleast 8 characters 
                            </h4>
                        </div>
                        
                        <button className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 
                                        md:text-lg text-md border-2 border-transparent transition duration-200 
                                        cursor-pointer hover:bg-green-700" 
                                type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
            
            <div className="flex justify-end w-full max-w-xl mr-5">
                <div className="flex gap-5">
                    <h3 className="flex items-center md:text-base text-sm">Already have an account?</h3>
                    <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                                    transition duration-200 cursor-pointer hover:bg-green-100"
                        onClick={() => setNavbarState("login")}>
                            <Link to='/login'><h2 className="md:text-base text-sm">Log In</h2></Link>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Signup