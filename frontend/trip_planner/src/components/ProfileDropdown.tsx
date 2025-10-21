import { Link, useNavigate } from "react-router-dom";
import { Edit, LogOut } from 'lucide-react';

type ProfileDropDowntype = {
    setToggleProfileDropdown: React.Dispatch<React.SetStateAction<boolean>> 
}

const ProfileDropDown = ({ setToggleProfileDropdown } : ProfileDropDowntype) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event('storage'));
        setToggleProfileDropdown(false);
        navigate("/");
    };
    
    return (
        <div className='transition-all duration-100 absolute z-50 md:right-25 right-5 bg-stone-200 shadow p-2 mt-2 rounded-xl'>
            <div className='flex flex-col gap-2'>
                <Link to={"/profile"}>
                    <div className='flex gap-2 border-2 border-stone-500 p-2 rounded-xl cursor-pointer hover:bg-stone-100
                                    hover:border-green-800'
                        onClick={() => setToggleProfileDropdown(false)}>
                        <Edit className="md:size-7 size-5" />
                        <h2 className="md:text-base text-sm">Edit Profile</h2>
                    </div>
                </Link>
        
                <div className='flex gap-2 border-2 border-stone-500 p-2 rounded-xl cursor-pointer 
                        hover:bg-stone-100 hover:border-green-800 items-center'
                    onClick={handleLogout}>
                    <LogOut className="md:size-7 size-5" />
                    <h2 className="md:text-base text-sm">Logout</h2>
                </div>
            </div>
        </div>
    )
}

export default ProfileDropDown