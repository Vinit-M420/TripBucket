import { useState, useEffect, useRef } from 'react';
import type { tripInterface } from '../types/tripInterface';
import { X } from 'lucide-react';
import type { EditTripProps } from '../types/EditTripProps';

const EditTrip = ( { tripId, setToggleEditTrip, onClose, refreshTrips }: EditTripProps ) => {

    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [trip, setTrip] = useState<tripInterface | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTrip = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/trip/single/${tripId}`, {
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
            setTrip(data.trip[0]);
            setIsPublic(data.trip[0].isPublic);
            // console.log(data);

        } catch (err) {
            console.error("Error fetching trip:", err);
        }
        };

        fetchTrip();
    }, [tripId]);


    if (!trip) return null;

    const handleClose = () => {
          setToggleEditTrip(false);
          if (onClose) {
          onClose();
          }
    };

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const payload = {
            destination: trip.destination,
            isPublic,
            from_date: trip.from_date ? new Date(trip.from_date).toISOString() : undefined,
            to_date: trip.to_date ? new Date(trip.to_date).toISOString() : undefined,
            bannerURL: trip.bannerURL,
          };
          const response = await fetch(`http://localhost:5000/api/v1/trip/edit/${tripId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(payload),
          });

          // console.log(response);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Update failed:", errorText);
            throw new Error("Failed to update trip");

          }
          
          await refreshTrips();
          handleClose();
        } 
        catch (err) {
          console.error("Error saving trip:", err);
        }
      };


    return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      <div ref={modalRef} 
            className="border-2 border-green-800 bg-stone-50 rounded-2xl py-5 md:w-xl w-md shadow relative">
              <button
                aria-label="Close modal"
                onClick={handleClose}
                className="absolute top-5 right-5 text-green-800 hover:text-green-600 transition-colors duration-200 z-10">
                <X size={30} /> 
            </button>  
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl text-black font-bold">Edit Trip</h1>

          <form className="md:w-md w-sm py-4" onSubmit={handleSubmit}>
            <label className="text-base text-black pl-2">Destination *</label><br/>
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 mb-4 shadow border-1 border-green-800 placeholder:text-green-600"
              type="text"
              value={trip.destination || ""}
              onChange={(e) => setTrip({ ...trip, destination: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col">
                <label className="text-base text-black pl-2">From Date</label>
                <input
                  type="date"
                  value={trip.from_date ? trip.from_date.split("T")[0] : ""}
                  onChange={(e) => setTrip({ ...trip, from_date: e.target.value })}
                  className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800"
                />
              </div>

              <div className="col-span-1 flex flex-col">
                <label className="text-base text-black pl-2">To Date</label>
                <input
                  type="date"
                  value={trip.to_date ? trip.to_date.split("T")[0] : ""}
                  onChange={(e) => setTrip({ ...trip, to_date: e.target.value })}
                  className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800"
                />
              </div>
            </div>

            <label className="text-base text-black pl-2">Status</label>
            <div className="flex gap-2 pl-2 mt-2 mb-4">
              <input type="radio" checked={isPublic} onChange={() => setIsPublic(true)} />
              <label className="text-base text-black mr-5">Public</label>

              <input type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} />
              <label className="text-base text-black">Private</label>
            </div>

            <label className="text-base text-black pl-2">Banner URL</label><br/>
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800 placeholder:text-green-600"
              value={trip.bannerURL || ""}
              onChange={(e) => setTrip({ ...trip, bannerURL: e.target.value })}
              type="text"
            />

            <button
                className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 
                text-lg border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700"
                type="submit">Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTrip;