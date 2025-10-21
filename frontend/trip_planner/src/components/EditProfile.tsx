import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MemoizedLeft } from "../assets/left";
import { Eye, EyeOff } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(true);
    const [updateMessage, setUpdateMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch current user data
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`${API_BASE}/api/v1/user/get`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const userdata = await response.json();
                setFirstName(userdata.response.firstName || "");
                setLastName(userdata.response.lastName || "");
                setEmail(userdata.response.email || "");
                setLoading(false);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load profile");
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateMessage("");
        setError("");

        try {
            const body: any = { firstName, lastName, email };
            
            // Only include password if user entered one
            if (password) {
                body.password = password;
            }

            const response = await fetch(`${API_BASE}/api/v1/user/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const data = await response.json();
            setUpdateMessage(data.message || "Profile updated successfully!");
            setPassword(""); // Clear password field after update
            
            // Clear success message after 3 seconds
            setTimeout(() => setUpdateMessage(""), 3000);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-green-800 text-xl">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 min-h-[calc(100dvh-80px)] px-4 mt-10">
            <div className='flex gap-2 my-5 items-center w-full max-w-6xl mx-auto px-2 sm:px-4'>
                <Link to='/trips'>
                    <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 flex gap-2 items-center
                                    transition duration-200 cursor-pointer hover:bg-green-700">
                        <MemoizedLeft />
                    </div>
                </Link>
                <h1 className="text-green-800 md:text-2xl text-xl font-bold truncate">
                    Back to Trips
                </h1>
            </div>

            <div className="flex justify-center items-center pb-10">
                <div className="border border-green-800 rounded-2xl py-5 w-full max-w-xl shadow">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="md:text-3xl text-2xl text-black font-bold">Edit Profile</h1>
                        <h2 className="md:text-base text-sm text-green-800">Update your information</h2>

                        {updateMessage && (
                            <div className="mt-4 bg-green-100 border border-green-800 text-green-800 px-4 py-2 rounded-2xl">
                                {updateMessage}
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 bg-red-100 border border-red-800 text-red-800 px-4 py-2 rounded-2xl">
                                {error}
                            </div>
                        )}

                        <form className="w-[80%] max-w-sm py-4" onSubmit={handleSubmit}>
                            <label className="md:text-base text-sm text-black pl-2">First Name</label><br />
                            <input
                                className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="text"
                                placeholder="Enter your first name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                            />
                            <br />

                            <label className="md:text-base text-sm text-black pl-2">Last Name</label><br />
                            <input
                                className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="text"
                                placeholder="Enter your last name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                
                            />
                            <br />

                            <label className="md:text-base text-sm text-black pl-2">Email</label><br />
                            <input
                                className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800
                                            placeholder:text-green-600"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <br />

                            <label className="md:text-base text-sm text-black pl-2">
                                New Password <span className="text-xs text-gray-600">(leave blank to keep current)</span>
                            </label>
                            <div className="flex relative items-center">
                                <input
                                    className="bg-green-100 rounded-2xl w-full p-3 my-2 shadow border border-green-800
                                                placeholder:text-green-600 placeholder:text-base"
                                    type={hidePassword ? "password" : 'text'}
                                    placeholder="Enter new password (optional)"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <div
                                    className="absolute right-5 cursor-pointer"
                                    onClick={() => setHidePassword(!hidePassword)}
                                >
                                    {hidePassword ? <EyeOff /> : <Eye />}
                                </div>
                            </div>

                            {password && (
                                <div className="flex flex-col gap-2 items-center mb-5">
                                    <h4 className="text-xs text-center">
                                        Password should contain one uppercase, lowercase, number and special character
                                    </h4>
                                    <h4 className="text-xs text-center">
                                        Password should have atleast 8 characters
                                    </h4>
                                </div>
                            )}

                            <button
                                className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 
                                        md:text-lg text-md border-2 border-transparent transition duration-200 
                                        cursor-pointer hover:bg-green-700"
                                type="submit"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;