import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import AddTrip from './AddTrip';
import EditTrip from './EditTrip';
import DeleteTrip from './DeleteTrip';
import type { tripInterface } from '../types/tripInterface';
import { MemoizedCheck } from '../assets/checkcircle';
import { MemoizedEdit } from '../assets/edit';
import { MemoizedLock } from '../assets/lock';
import { MemoizedPlusCircle } from '../assets/pluscircle';
import { MemoizedTrash } from '../assets/trash';
import { ExternalLink, Loader2, X } from 'lucide-react';
import { fetchTrips } from '../utils/fetchtrips';
import { useModalStore, useToggleAddStore, useTypeofAlertStore } from "../store";


const YourTrips = () => {
    const [trips, setTrips] = useState<tripInterface[]>([]);
    const {toggleAddTrip, setToggleAddTrip} = useToggleAddStore();
    const {isEditTripOpen, isDeleteTripOpen, openEditTrip, openDeleteTrip} = useModalStore();
    const {typeOfAlert, toggleAlert, setTypeOfAlert, setToggleAlert} = useTypeofAlertStore(); 
    const modalAlert = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
    const loadTrips = async () => {
        const tripsData = await fetchTrips();
        setTrips(tripsData);
        setIsLoading(false);
    };
    loadTrips();
    }, []);

    useEffect(() => {
        const showAlert = setTimeout(() => setToggleAlert(false), 3000);
        return () => clearTimeout(showAlert)
    }, [toggleAlert]);

    const handleAlertClose = () => {
        setToggleAlert(false);
    }

    // const handleEdit = (id: string) => {
    //     // console.log("Edit trip with id:", id);
    //     setEditingTripId(id);
    // };

    const refreshTrips = async () => {
        const tripsData = await fetchTrips();
        setTrips(tripsData);
    }

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#fafaf9] bg-opacity-90 flex flex-col justify-center 
                                items-center z-50">
                    <Loader2 className="w-16 h-16 text-green-700 animate-spin" />
                    <p className="text-green-900 mt-4 text-lg font-semibold">Loading your planned trips</p>
                </div>
        );
    }

    return (
        <div className="bg-stone-50 min-h-screen w-full flex flex-col items-center mx-auto gap-5 mt-10 px-4">
        <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-green-800 md:text-2xl text-xl font-semibold my-5">
                {trips.length > 0 ? "Your Trips" : 'You have no trips yet'}                     
            </h1>      

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-10">
                {trips.map((trip) => (
                    
                    <div key={trip._id} 
                        className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2 cursor-pointer" >  
                        <Link to={`/trip/${trip._id}`} className="block cursor-pointer">

                        {trip.bannerURL ? (
                            <img src={trip.bannerURL} 
                                className="w-full h-[70%] min-h-60 object-cover rounded-t-lg mb-2" />
                            ) : (
                            <div className="bg-green-200 w-full h-[70%] min-h-60 rounded-t-lg place-content-center mb-2">
                                <h2 className="text-center text-green-800">No Banner Yet</h2>
                            </div>
                            )}
   
                        <div className='flex justify-between items-center mx-5'>

                            <h1 className='text-green-800 text-xl font-semibold'>{trip.destination}</h1>
                            {trip.isPublic ? (
                                <div className="border border-transparent rounded-2xl p-1
                                                hover:border hover:border-green-800 hover:bg-stone-200"
                                    onClick={(e) => { 
                                        e.preventDefault();
                                        e.stopPropagation(); /// To stop event bubbling up & make the button work
                                        navigator.clipboard.writeText(`${window.location.origin}/public/${trip.shareId}`);
                                        setTypeOfAlert('shareurl');
                                        setToggleAlert(true); }                                     
                                     }>
                                    <ExternalLink className="size-5" />
                                </div>
                            ) : (
                                <div className="border border-transparent rounded-2xl p-1">
                                    <MemoizedLock />
                                </div>
                            )}

                        </div>
                         </Link>
                        <div className='flex gap-2 mx-5 items-center'>
                            <h2 className='text-green-600 text-sm'>Bucket List</h2>
                            <MemoizedCheck />
                        </div>
                        <div className='mx-5'>
                            <h2 className='text-green-600 text-sm'>
                                {trip.from_date && trip.to_date
                                ? `${new Date(trip.from_date).toLocaleDateString()} → 
                                ${new Date(trip.to_date ).toLocaleDateString()}`
                                : "Someday ..."}
                            </h2>
                        </div>
                        

                        <div className='flex justify-between mx-5 gap-5 items-center mb-2'>
                            <button className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 
                            transition-all duration-200 cursor-pointer my-2 flex gap-2 items-center"
                            onClick={(e) => { 
                                e.stopPropagation(); /// To stop event bubbling up & make the button work
                                openEditTrip(true, trip._id)                            
                                setTypeOfAlert("edit");    
                            }}>
                                <MemoizedEdit /> 
                                <h3 className='text-base'>Edit</h3>
                            </button>
                            <div className='border border-transparent rounded-2xl p-1
                                        hover:border hover:border-green-800 hover:bg-stone-200'
                                 onClick={(e) =>{
                                    e.stopPropagation(); /// To stop event bubbling up & make the button work
                                    openDeleteTrip(true, trip._id)
                                    setTypeOfAlert("delete");                               
                                 } }>
                                <MemoizedTrash  />
                            </div>
                        </div>
                    </div>
                ))
                }
            
            </div>         
        </div>

        <div className="fixed bottom-6 lg:right-15 md:right-10 sm:bottom">
            <div className='group flex justify-start bg-green-800 text-white p-3 rounded-3xl 
            hover:bg-green-700 transition-all duration-300 cursor-pointer items-center overflow-hidden'
                onClick={() => setToggleAddTrip(!toggleAddTrip)}>
                <div className="flex-shrink-0"><MemoizedPlusCircle /></div>
                <h3 className='text-lg whitespace-nowrap transition-all duration-300 
                w-0 group-hover:w-auto group-hover:ml-2 opacity-0 group-hover:opacity-100'>
                    Add Trip
                </h3>
            </div>
        </div>


        {toggleAddTrip === true && 
            <AddTrip 
                refreshTrips={refreshTrips}
                onClose={() => setToggleAddTrip(false)} />
        }

        {isEditTripOpen && 
            <EditTrip
                onClose={(shouldRefresh = false) => {
                    openEditTrip(false, null);
                    if (shouldRefresh) {
                    refreshTrips();
                    }
                }}
            />
        }

        {isDeleteTripOpen && 
            <DeleteTrip
                onClose={(shouldRefresh = false) => {
                openDeleteTrip(false, null);
                if (shouldRefresh) {
                    refreshTrips();
                }
                }}
            />
        }

        {toggleAlert && (
            <div ref={modalAlert}
                role="alert"
                className="fixed inset-x bottom-6 mx-auto flex items-center justify-between 
                        p-4 text-sm text-green-800 border border-green-300 
                        rounded-lg bg-green-50 w-fit max-w-xs shadow z-50">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20" >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 
                                1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 
                                0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    {typeOfAlert === "delete" && <span className="font-medium">Deleted trip successfully!</span>}
                    {typeOfAlert === "edit" && <span className="font-medium">Edited trip successfully!</span>}
                    {typeOfAlert === "shareurl" && (
                        <span className="font-medium">Copied share URL to clipboard</span>
                    )}
                </div>
                
                <button onClick={handleAlertClose} className="ml-3">
                    <X className="size-3" />
                </button>
            </div>
        )} 
    </div>
    )
}

export default YourTrips;