import { Edit, LogOut } from 'lucide-react';
import type { NavbarState } from '../types/navbarstate';

type ProfileDropDowntype = {
    setNavbarState:React.Dispatch<React.SetStateAction<NavbarState>>, 
    setToggleProfileDropdown:React.Dispatch<React.SetStateAction<boolean>> 
}

const ProfileDropDown = ({ setNavbarState ,setToggleProfileDropdown }: ProfileDropDowntype  ) => {
    return (
        <div className='transition-all duration-100 absolute z-50 right-25 bg-stone-200 shadow p-2 mt-2 rounded-xl'>
            <div className='flex flex-col gap-2'>
            <div className='flex gap-2 border-2 border-stone-500 p-2 rounded-xl cursor-pointer hover:bg-stone-100
                            hover:border-green-800'>
                <Edit />
                <h2>Edit Profile</h2>
            </div>

            <div className='flex gap-2 border-2 border-stone-500 p-2 rounded-xl cursor-pointer 
                hover:bg-stone-100 hover:border-green-800'
                onClick={() => {
                        localStorage.removeItem("Authorization");
                        setToggleProfileDropdown(false);
                        setNavbarState("hero");
                        
                    }}>
                <LogOut />
                <h2>Logout</h2>
            </div>
            </div>
        </div>
    )
}

export default ProfileDropDown