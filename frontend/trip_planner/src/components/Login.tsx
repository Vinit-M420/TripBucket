import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useHidePassword, useNavbarStore } from "../store";
import gsap from "gsap";

const API_BASE = import.meta.env.VITE_API_URL; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setNavbarState } = useNavbarStore();
    const { hidePassword, setHidePassword } = useHidePassword();
    const navigate = useNavigate(); 
    const loginRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loginRef.current) {
            gsap.fromTo(
                loginRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
            );
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Remove this setTimeout after testing
        // await new Promise(resolve => setTimeout(resolve, 30000));

        try {
            const response = await fetch(`${API_BASE}/api/v1/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                alert(data.message || "Login failed");
                setIsLoading(false);
                return;              
            }

            localStorage.setItem("token", data.token);
            setNavbarState("trip");
            navigate("/trips"); 
            
        } catch (err) {
            console.error("Error logging in:", err);
            alert("Network error. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div ref={loginRef} className="flex flex-col justify-center items-center gap-5 h-[calc(100dvh-80px)] px-4">     
            {/* {isLoading && (
                <div className="fixed inset-0 bg-[#fafaf9] bg-opacity-90 flex flex-col justify-center 
                                items-center z-50">
                    <Loader2 className="w-16 h-16 text-green-700 animate-spin" />
                    <p className="text-green-900 mt-4 text-lg font-semibold">Logging in...</p>
                    <p className="text-green-700 mt-2 text-sm">This may take up to a minute</p>
                </div>
            )} */}
            
            <div className="border border-green-800 rounded-2xl py-5 w-full max-w-xl shadow">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="md:text-3xl text-2xl text-black font-bold">Log In</h1>
                    <h2 className="md:text-base text-sm text-green-800">Build your Bucket list</h2>
                    <form className="w-[80%] max-w-sm py-4" onSubmit={handleSubmit}>
                        <label className="md:text-base text-sm text-black pl-2">Email</label><br/>
                        <input 
                            className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 
                                       border-green-800 placeholder:text-green-600"
                            type="text" 
                            placeholder="Enter your email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            disabled={isLoading}
                            required 
                        />
                        <br/>
                        <label className="md:text-base text-sm text-black pl-2">Password</label>
                        <div className="flex relative items-center">
                            <input 
                                className="bg-green-100 rounded-2xl w-full p-3 my-2 shadow border border-green-800
                                           placeholder:text-green-600 placeholder:text-base"
                                type={hidePassword ? "password" : 'text'} 
                                placeholder="Enter your password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                disabled={isLoading}
                                required
                            />
                            <div 
                                className="absolute right-5 cursor-pointer" 
                                onClick={() => !isLoading && setHidePassword()}
                            >
                                {hidePassword ? <EyeOff /> : <Eye />}
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
                        
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 md:text-lg text-md
                                       border-2 border-transparent transition duration-200 cursor-pointer 
                                       hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed 
                                       disabled:hover:bg-green-800 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Logging In...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex justify-end w-full max-w-lg mr-5">
                <div className="flex gap-5 md:gap-2">
                    <h3 className="flex items-center md:text-base text-sm">Don't have an account?</h3>
                    <div 
                        className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                                   transition duration-200 cursor-pointer hover:bg-green-100 md:text-base text-sm" 
                        onClick={() => setNavbarState("signup")}
                    >
                        <Link to="/signup">Sign Up</Link>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Login;