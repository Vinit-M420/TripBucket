import CheckCircle from '../assets/checkcircle';
import Edit from '../assets/edit';
import Lock from '../assets/lock';
import PlusCircle from '../assets/pluscircle';
import iceland from '../images/iceland.jpg'

const Trips = () => {
    return (
    <div className="h-[calc(100dvh-80px)] mx-25 flex flex-col gap-5">
        <div>
            <h1 className="text-green-800 text-2xl mt-10 mb-5">Your Trips</h1>

            <div className="grid grid-flow-col grid-cols-3 gap-5">
                <div className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2 cursor-pointer ">
                    <img src={iceland} className='w-full h-[70%] rounded-t-lg' />
                    <div className='flex justify-between items-center mx-5'>
                        <h1 className='text-green-800 text-xl font-semibold'>Iceland</h1>
                        <Lock />
                    </div>
                    <div className='flex gap-2 mx-5 items-center'>
                        <h2 className='text-green-600 text-sm'>Bucket List</h2>
                        <CheckCircle />
                    </div>
                    <div className='mx-5'>
                        <h2 className='text-green-600 text-sm'>May 10-17, 2026 • 7 days</h2>
                    </div>
                    <div className='flex mx-5 gap-5'>
                        <button className="bg-green-800 text-white px-10 py-1 rounded-2xl hover:bg-green-700 
                        transition-all duration-200 cursor-pointer my-2">
                            Edit
                        </button>
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
                        <Lock />
                    </div>
                    <div className='flex gap-2 mx-5 items-center'>
                        <h2 className='text-green-600 text-sm'>Bucket List</h2>
                        <CheckCircle />
                    </div>
                    <div className='mx-5'>
                        <h2 className='text-green-600 text-sm'>Someday ...</h2>
                    </div>
                    <div className='flex mx-5 gap-5'>
                        <button className="bg-green-800 text-white px-10 py-1 rounded-2xl hover:bg-green-700 
                        transition-all duration-200 cursor-pointer my-2">
                            Edit
                        </button>
                    </div>
                    <div>

                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default Trips;