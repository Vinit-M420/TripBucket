import { useState, useEffect, useRef } from 'react';
import type { tripInterface } from '../types/tripInterface';
import { X } from 'lucide-react';
import type { EditTripProps } from '../types/EditTripProps';
const API_BASE = import.meta.env.VITE_API_URL; 

const EditTrip = ({ tripId, setToggleEditTrip, setToggleAlert, onClose, refreshTrips }: EditTripProps ) => {

    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [trip, setTrip] = useState<tripInterface | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

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
            setTrip(data.trip);
            setIsPublic(data.trip.isPublic);
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
            from_date: trip.from_date ? new Date(trip.from_date).toISOString() : '',
            to_date: trip.to_date ? new Date(trip.to_date).toISOString() : '',
            bannerURL: trip.bannerURL,
          };
          const response = await fetch(`${API_BASE}/api/v1/trip/edit/${tripId}`, {
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
          setToggleAlert(true);
        } 
        catch (err) {
          console.error("Error saving trip:", err);
        }
      };


    return (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-2">
    <div
      ref={modalRef}
      className="relative bg-stone-50 border-2 border-green-800 rounded-2xl py-6 px-4 md:px-6 
                 w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow max-h-[90vh] overflow-y-auto"
    >
      {/* Close Button */}
      <button
        aria-label="Close modal"
        onClick={handleClose}
        className="absolute top-4 right-4 text-green-800 hover:text-green-600 transition-colors duration-200"
      >
        <X size={28} />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="md:text-3xl text-2xl text-black font-bold">Edit Trip</h1>

        {/* Form */}
        <form className="w-full mt-5 space-y-4" onSubmit={handleSubmit}>
          {/* Destination */}
          <div>
            <label className="md:text-base text-sm text-black pl-1">Destination *</label>
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 shadow border border-green-800 placeholder:text-green-600"
              type="text"
              value={trip.destination || ""}
              onChange={(e) => setTrip({ ...trip, destination: e.target.value })}
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="md:text-base text-sm text-black pl-1">From Date</label>
              <input
                type="date"
                value={trip.from_date ? trip.from_date.split("T")[0] : ""}
                onChange={(e) => setTrip({ ...trip, from_date: e.target.value })}
                className="bg-green-100 rounded-2xl w-full p-3 mt-2 shadow border border-green-800"
              />
            </div>

            <div>
              <label className="md:text-base text-sm text-black pl-1">To Date</label>
              <input
                type="date"
                value={trip.to_date ? trip.to_date.split("T")[0] : ""}
                onChange={(e) => setTrip({ ...trip, to_date: e.target.value })}
                className="bg-green-100 rounded-2xl w-full p-3 mt-2 shadow border border-green-800"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="md:text-base text-sm text-black pl-1">Status</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 text-sm md:text-base">
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                Public
              </label>

              <label className="flex items-center gap-2 text-sm md:text-base">
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                />
                Private
              </label>
            </div>
          </div>

          {/* Banner URL */}
          <div>
            <label className="md:text-base text-sm text-black pl-1">Banner URL</label>
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 shadow border border-green-800 placeholder:text-green-600"
              value={trip.bannerURL || ""}
              onChange={(e) => setTrip({ ...trip, bannerURL: e.target.value })}
              type="text"
            />
          </div>

          {/* Submit */}
          <button
            className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 md:text-lg text-base 
                       border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
);

};

export default EditTrip;