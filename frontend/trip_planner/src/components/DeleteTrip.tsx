import { X } from 'lucide-react';
import type { DeleteTripProps } from '../types/DeleteTripProps';
import { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_API_URL; 

const DeleteTrip = ({ tripId, setToggleDeleteTrip, setToggleAlert, onClose, refreshTrips }: DeleteTripProps) => {
    const [trip, setTrip] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/trip/single/${tripId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend error:", errorText);
                throw new Error("Failed to fetch trip");
            }

            const data = await response.json();
            setTrip(data.trip[0].destination);
            // console.log(data);

        } catch (err) {
            console.error("Error fetching trip:", err);
        }
        };

        fetchTrip();
        
    }, [tripId]);

    
    const deleteTrip = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/trip/delete/${tripId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend error:", errorText);
                throw new Error("Failed to delete trip");
            }

            await refreshTrips();
            setToggleAlert(true);

        } catch (err) {
            console.error("Error deleting trip:", err);
        }
    };
    

    const handleClose = () => {
          setToggleDeleteTrip(false);
          if (onClose) {
          onClose();
          }
    };

    const handleDelete = async () => {
        try {
            await deleteTrip();
            handleClose();
        } catch (err) {
            console.error("Error deleting trip:", err);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-2">
            <div className="border-2 border-green-800 bg-stone-50 rounded-2xl py-5 md:w-xl w-sm shadow relative">
                <button
                    aria-label="Close modal"
                    onClick={handleClose}
                    className="absolute top-5 right-5 text-green-800 hover:text-green-600 
                            transition-colors duration-200 z-10">
                    <X size={30} /> 
                </button>  
                <div className="flex flex-col justify-center items-center">
                    <h1 className="md:text-3xl text-2xl text-black font-bold">Delete {trip}</h1>

                    <h2 className='my-5'>Are you sure you want to Delete?</h2>
                    <div className={`flex gap-5 items-center`}>
                        <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 border-2 border-transparent
                                        transition duration-200 cursor-pointer hover:bg-green-700"
                            onClick={handleDelete}>
                            <h2 className="md:text-lg text-sm">Delete</h2> 
                        </div>  

                        <div className="bg-transparent rounded-2xl px-5 py-1 border-2 border-green-700 text-green-700
                                        transition duration-200 cursor-pointer hover:bg-green-100"
                            onClick={handleClose}>
                            <h2 className="md:text-lg text-sm">Cancel</h2>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteTrip