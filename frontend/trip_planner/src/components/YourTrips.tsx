import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import CheckCircle from '../assets/checkcircle';
import Edit from '../assets/edit';
import Lock from '../assets/lock';
import PlusCircle from '../assets/pluscircle';
import Trash from '../assets/trash';
import AddTrip from './AddTrip';
import EditTrip from './EditTrip';
import DeleteTrip from './DeleteTrip';
import type { tripInterface } from '../types/tripInterface';
import type { YourTripsProps } from '../types/YourTripsProps';
import { ExternalLink  } from 'lucide-react';
import { fetchTrips } from '../utils/fetchtrips';
import { X } from 'lucide-react';



const YourTrips = ({ setNavbarState,setSelectedTripId, setSelectedTripName }: YourTripsProps ) => {
    const [toggleAddTrip, setToggleAddTrip] = useState<boolean>(false);
    const [trips, setTrips] = useState<tripInterface[]>([]);
    const [toggleEditTrip, setToggleEditTrip] = useState<boolean>(false);
    const [toggleDeleteTrip, setToggleDeleteTrip] = useState<boolean>(false);
    const [editingTripId, setEditingTripId] = useState<string | null>(null);
    const [deletingTripId, SetDeletingTripId] = useState<string | null>(null);
    const [typeOfAlert, setTypeOfAlert] = useState<string | null>(null);
    const [toggleAlert, setToggleAlert] = useState<boolean>(false);
    const modalAlert = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const loadTrips = async () => {
        const tripsData = await fetchTrips();
        setTrips(tripsData);
    };
    loadTrips();
    }, []);

    useEffect(() => {
        const showAlert = setTimeout(() => setToggleAlert(false), 3000);
        return () => clearTimeout(showAlert)
    }, [toggleAlert]);

    const handleClose = () => {
        setToggleAlert(false);
    }

    const handleEdit = (id: string) => {
        console.log("Edit trip with id:", id);
        setEditingTripId(id)
    };

    const refreshTrips = async () => {
        const tripsData = await fetchTrips();
        setTrips(tripsData);
    }

    return (
        <div className="bg-stone-50 min-h-screen lg:w-6xl md:w-2xl w-sm flex flex-col items-center mx-auto gap-5 mt-10 ">
        <div>
            <h1 className="text-green-800 text-2xl font-semibold my-5">
                {trips.length > 0 ? "Your Trips" : 'You have no trips yet'}                     
            </h1>      

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-auto justify-center items-center
                            lg:w-6xl md:w-2xl w-sm mb-10">
                {trips.map((trip) => (
                    
                    <div key={trip._id} 
                        className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2 cursor-pointer" >  
                        <Link to={`/trip/${trip._id}`} className="block cursor-pointer"
                            onClick={() => {
                            setNavbarState("content");
                            setSelectedTripId(trip._id);
                            setSelectedTripName(trip.destination);
                            }}>
   
                        {trip.bannerURL ? (
                            <img src={trip.bannerURL} className="w-full h-[70%] min-h-60 rounded-t-lg mb-2" />
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
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(`${window.location.origin}/public/${trip.shareId}`);
                                        setTypeOfAlert('shareurl');
                                        setToggleAlert(true); }                                     
                                     }>
                                    <ExternalLink className="size-5" />
                                </div>
                            ) : (
                                <div className="border border-transparent rounded-2xl p-1">
                                    <Lock />
                                </div>
                            )}

                        </div>
                         </Link>
                        <div className='flex gap-2 mx-5 items-center'>
                            <h2 className='text-green-600 text-sm'>Bucket List</h2>
                            <CheckCircle />
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
                                e.stopPropagation();
                                setToggleEditTrip(!toggleAddTrip);
                                handleEdit(trip._id);
                            }}>
                                <Edit /> 
                                <h3 className='text-base'>Edit</h3>
                            </button>
                            <div className='border border-transparent rounded-2xl p-1
                                        hover:border hover:border-green-800 hover:bg-stone-200'
                                 onClick={(e) =>{
                                    e.stopPropagation();
                                    setToggleDeleteTrip(!toggleDeleteTrip);
                                    SetDeletingTripId(trip._id);
                                    setTypeOfAlert("delete");                               
                                 } }>
                                <Trash  />
                            </div>
                        </div>
                    </div>
                ))
                }
            
            </div>         
        </div>

        <div className="fixed bottom-6 lg:right-15 md:right-10 sm:right-7 right-5">
            <div className='group flex justify-start bg-green-800 text-white p-3 rounded-3xl 
            hover:bg-green-700 transition-all duration-300 cursor-pointer items-center overflow-hidden'
                onClick={() => setToggleAddTrip(!toggleAddTrip)}>
                <div className="flex-shrink-0"><PlusCircle /></div>
                <h3 className='text-lg whitespace-nowrap transition-all duration-300 
                w-0 group-hover:w-auto group-hover:ml-2 opacity-0 group-hover:opacity-100'>
                    Add Trip
                </h3>
            </div>
        </div>



        {toggleAddTrip === true && 
            <AddTrip 
                toggleAddTrip={toggleAddTrip} 
                setToggleAddTrip={setToggleAddTrip} 
                refreshTrips={refreshTrips}
                onClose={() => setToggleAddTrip(false)} />
        }

        {toggleEditTrip === true && 
            <EditTrip
                tripId={editingTripId}
                toggleEditTrip={toggleEditTrip}
                setToggleEditTrip={setToggleEditTrip}
                onClose={() => setEditingTripId(null)}
                refreshTrips={refreshTrips}
            />
        }

        {toggleDeleteTrip === true && 
            <DeleteTrip
                tripId={deletingTripId}
                setToggleDeleteTrip={setToggleDeleteTrip}
                setToggleAlert={setToggleAlert}
                onClose={() => SetDeletingTripId(null)}
                refreshTrips={refreshTrips}
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
                {typeOfAlert === "delete" && <span className="font-medium">Deleted!</span>}
                {typeOfAlert === "shareurl" && (
                    <span className="font-medium">Copied share URL to clipboard</span>
                )}
                </div>

                <button onClick={handleClose} className="ml-3">
                <X className="size-3" />
                </button>
            </div>
        )}
    
    </div>
    )
}

export default YourTrips;