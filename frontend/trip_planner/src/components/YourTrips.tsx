import { useState } from 'react';
import CheckCircle from '../assets/checkcircle';
import Edit from '../assets/edit';
import Lock from '../assets/lock';
import PlusCircle from '../assets/pluscircle';
import Trash from '../assets/trash';
import iceland from '../images/iceland.jpg'
import AddTrip from './AddTrip';

const YourTrips = () => {
    const [toggleAddTrip, setToggleAddTrip] = useState<boolean>(false);

    return (
    <div className="h-[calc(100dvh-80px)] w-6xl flex flex-col items-center mx-auto gap-5 mt-10">
        <div>
            <div className='flex justify-start gap-5 my-5'>
                <h1 className="text-green-800 text-2xl">Your Trips</h1>
                
            </div>
            <div className="grid grid-flow-col grid-cols-3 gap-5">
                <div className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2 cursor-pointer ">
                    <img src={iceland} className='w-full h-[70%] rounded-t-lg' />
                    <div className='flex justify-between items-center mx-5'>
                        <h1 className='text-green-800 text-xl font-semibold'>Iceland</h1>
                        <div className='border border-transparent rounded-2xl p-1'>
                            <Lock />
                        </div>
                    </div>
                    <div className='flex gap-2 mx-5 items-center'>
                        <h2 className='text-green-600 text-sm'>Bucket List</h2>
                        <CheckCircle />
                    </div>
                    <div className='mx-5'>
                        <h2 className='text-green-600 text-sm'>May 10-17, 2026 • 7 days</h2>
                    </div>
                    <div className='flex justify-between mx-5 gap-5 items-center'>
                        <button className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 
                        transition-all duration-200 cursor-pointer my-2 flex gap-2 items-center">
                            <Edit /> 
                            <h3 className='text-base'>Edit</h3>
                        </button>
                        <div className='border border-transparent rounded-2xl p-1 
                                    hover:border hover:border-green-800 hover:bg-stone-200'>
                            <Trash />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2 cursor-pointer">
                    <div className='bg-green-200 w-full h-[70%] rounded-t-lg place-content-center'>
                            <h2 className='text-center text-green-800'>No Banner Yet</h2>
                    </div>
                    <div className='flex justify-between items-center mx-5'>
                        <h1 className='text-green-800 text-xl font-semibold'>Vietnam</h1>
                        <div className='border border-transparent rounded-2xl p-1'>
                            <Lock />
                        </div>
                    </div>
                    <div className='flex gap-2 mx-5 items-center'>
                        <h2 className='text-green-600 text-sm'>Bucket List</h2>
                        <CheckCircle />
                    </div>
                    <div className='mx-5'>
                        <h2 className='text-green-600 text-sm'>Someday ...</h2>
                    </div>
                    <div className='flex justify-between mx-5 gap-5 items-center'>
                        <button className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 
                        transition-all duration-200 cursor-pointer my-2 flex gap-2 items-center">
                            <Edit /> 
                            <h3 className='text-base'>Edit</h3>
                        </button>
                        <div className='border border-transparent rounded-2xl p-1 
                                    hover:border hover:border-green-800 hover:bg-stone-200'>
                            <Trash />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                
            </div>
            <div className="fixed bottom-6 right-20">
                    <div className='flex justify-start gap-2 bg-green-800 text-white px-5 py-2 rounded-2xl hover:bg-green-700 
                            transition-all duration-200 cursor-pointer items-center'
                        onClick={() => {
                            setToggleAddTrip(!toggleAddTrip);
                            console.log("Add Trip Btn toggled", toggleAddTrip)}}>
                        <PlusCircle />
                        <h3 className='text-lg'>Add Trip</h3>           
                    </div>
            </div>
        </div>
        {toggleAddTrip === true && 
            <AddTrip toggleAddTrip={toggleAddTrip} setToggleAddTrip={setToggleAddTrip} 
                onClose={function (): void {
                throw new Error('Function not implemented.');
            } } />}
    </div>
    )
}

export default YourTrips;