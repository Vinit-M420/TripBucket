import { useEffect, useState } from 'react';
import CheckCircle from '../assets/checkcircle';
import Edit from '../assets/edit';
import Lock from '../assets/lock';
import PlusCircle from '../assets/pluscircle';
import Trash from '../assets/trash';
import AddTrip from './AddTrip';
import type { tripInterface } from '../types/tripInterface';
import EditTrip from './EditTrip';
import DeleteTrip from './DeleteTrip';
import { ExternalLink  } from 'lucide-react';
import { fetchTrips } from '../utils/fetchtrips';


const YourTrips = () => {
    const [toggleAddTrip, setToggleAddTrip] = useState<boolean>(false);
    const [trips, setTrips] = useState<tripInterface[]>([]);
    const [toggleEditTrip, setToggleEditTrip] = useState<boolean>(false);
    const [toggleDeleteTrip, setToggleDeleteTrip] = useState<boolean>(false);
    const [editingTripId, setEditingTripId] = useState<string | null>(null);
    const [deletingTripId, SetDeletingTripId] = useState<string | null>(null);

    useEffect(() => {
    const loadTrips = async () => {
        const tripsData = await fetchTrips();
        setTrips(tripsData);
    };
    loadTrips();
    }, []);

    const handleEdit = (id: string) => {
        console.log("Edit trip with id:", id);
        setEditingTripId(id)
    };

    const refreshTrips = async () => {
        const tripsData = await fetchTrips();
        setTrips(tripsData);
    }

    return (
    <div className="h-full lg:w-6xl w-2xl flex flex-col items-center mx-auto gap-5 mt-10">
        <div>
            <div className='flex justify-start gap-5 my-5'>
                <h1 className="text-green-800 text-2xl">
                    Your Trips
                </h1>      
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-auto justify-center items-center
                            lg:w-6xl md:w-2xl w-sm">
                { trips.map((trip) => (
                    
                    <div key={trip._id} 
                        className="col-span-1 flex flex-col border-2 border-green-800 rounded-xl gap-2 cursor-pointer">  
                        {trip.bannerURL ? (
                            <img src={trip.bannerURL} className="w-full h-[70%] min-h-60 rounded-t-lg" />
                            ) : (
                            <div className="bg-green-200 w-full h-[70%] min-h-60 rounded-t-lg place-content-center">
                                <h2 className="text-center text-green-800">No Banner Yet</h2>
                            </div>
                            )}
   
                        <div className='flex justify-between items-center mx-5'>

                            <h1 className='text-green-800 text-xl font-semibold'>{trip.destination}</h1>
                            {trip.isPublic ? (
                                <div className="border border-transparent rounded-2xl p-1">
                                    <ExternalLink className="size-5" />
                                </div>
                            ) : (
                                <div className="border border-transparent rounded-2xl p-1">
                                    <Lock  />
                                </div>
                            )}

                        </div>
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
                            onClick={() => { 
                                setToggleEditTrip(!toggleAddTrip);
                                handleEdit(trip._id);}} >
                                <Edit /> 
                                <h3 className='text-base'>Edit</h3>
                            </button>
                            <div className='border border-transparent rounded-2xl p-1
                                        hover:border hover:border-green-800 hover:bg-stone-200'
                                 onClick={() =>{
                                    setToggleDeleteTrip(!toggleDeleteTrip);
                                    SetDeletingTripId(trip._id);
                                 } }>
                                <Trash  />
                            </div>
                        </div>
                </div>
                ))
                }
            
            </div>         
        </div>

        <div className="fixed bottom-6 md:right-20 right-5">
                    <div className='flex justify-start gap-2 bg-green-800 text-white px-5 py-2 rounded-2xl 
                    hover:bg-green-700 transition-all duration-200 cursor-pointer items-center'
                        onClick={() => {
                            setToggleAddTrip(!toggleAddTrip);
                            console.log("Add Trip Btn toggled", toggleAddTrip)}}>
                        <PlusCircle />
                        {/* <h3 className='text-lg'>Add Trip</h3> */}
                    </div>
        </div>

        {toggleAddTrip === true && 
            <AddTrip 
                toggleAddTrip={toggleAddTrip} 
                setToggleAddTrip={setToggleAddTrip} 
                refreshTrips={refreshTrips}
                onClose={function (): void { 
                    throw new Error('Function not implemented.');
                }}/>
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
                onClose={() => SetDeletingTripId(null)}
                refreshTrips={refreshTrips}
            />
        }
        
    </div>
    )
}

export default YourTrips;