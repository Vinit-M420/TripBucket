import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import type { NavbarState } from "../types/navbarstate";

interface NavbarProps {
  setNavbarState: (state: NavbarState) => void;
}

const Signup = ({setNavbarState} : NavbarProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/api/v1/user/signup", {
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
        <div className="flex flex-col justify-center items-center gap-5 h-[calc(100dvh-80px)]">
           
            <div className="border border-green-800 rounded-2xl py-5 md:w-xl w-md shadow">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl text-black font-bold">Create Account</h1>
                    <h2 className="text-base text-green-800">Welcome to TripBucket</h2>
                    <form className="md:w-md w-sm py-4" onSubmit={handleSubmit}>
                        <label className="text-base text-black pl-2">Name</label><br/>
                        <input className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="text" placeholder="Enter your Name" 
                                onChange={(e) => setName(e.target.value)} value={name} required />
                        <br/>
                        <label className="text-base text-black pl-2">Email</label><br/>
                        <input className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="text" placeholder="Enter your email" 
                                onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <br/>
                        <label className="text-base text-black pl-2">Password</label>
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
                        
                        <button className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 text-lg
                        border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700" 
                                type="submit">Sign Up</button>

                    </form>
                </div>
            </div>
            <div className="flex justify-end md:w-xl w-md mr-5">
                <div className="flex gap-5">
                    <h3 className="flex items-center">Already have an account?</h3>
                    <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                            transition duration-200 cursor-pointer hover:bg-green-100"
                        onClick={() => setNavbarState("login")}>
                            <Link to='/login'><h2 className="text-base">Log In</h2></Link>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Signup