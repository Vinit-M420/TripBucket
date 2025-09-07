import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import type { AddTripProp } from '../types/AddTripProp';

const AddTrip = ({ onClose, toggleAddTrip, setToggleAddTrip, refreshTrips }: AddTripProp) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    destination: "",
    from_date: "",
    to_date: "",
    bannerURL: "",
    isPublic: true,
  });
  

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //       handleClose();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const handleClose = () => {
    setToggleAddTrip(false);
    if (onClose) { onClose(); }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "public" : value, // radio special case
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/trip/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to add trip");
      refreshTrips();
      handleClose();
    } catch (err) {
      alert("Error in adding your trip");
      console.error("Error Detail:", err);
    }
  };

  if (!toggleAddTrip) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      <div ref={modalRef}
        className="border-2 border-green-800 bg-stone-50 rounded-2xl py-5 md:w-xl w-md shadow relative" >
        <button
          aria-label="Close modal"
          onClick={handleClose}
          className="absolute top-5 right-5 text-green-800 hover:text-green-600 transition-colors duration-200 z-10">
          <X size={30} />
        </button>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl text-black font-bold">Add Trip</h1>
          <h2 className="text-base text-green-800">One Trip at a Time</h2>
          <form className="md:w-md w-sm py-4" onSubmit={handleSubmit}>
            <label className="text-base text-black pl-2">Destination *</label>
            <br />
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 mb-4 shadow border-1 border-green-800 placeholder:text-green-600"
              type="text" name="destination" value={formData.destination} onChange={handleChange}
              required
            />
            <br />

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col">
                <label className="text-base text-black pl-2">From Date</label>
                <input
                  type="date" name="from_date" value={formData.from_date} onChange={handleChange}
                  className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800"
                />
              </div>

              <div className="col-span-1 flex flex-col">
                <label className="text-base text-black pl-2">To Date</label>
                <input
                  type="date" name="to_date" value={formData.to_date} onChange={handleChange}
                  className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800"
                />
              </div>
            </div>

            <label className="text-base text-black pl-2">Status</label>
            <div className="flex gap-2 pl-2 mt-2 mb-4">
              <input
                type="radio"
                name="isPublic"
                value="public"
                checked={formData.isPublic === true}
                onChange={handleChange}
              />
              <label className="text-base text-black mr-5">Public</label>

              <input
                type="radio"
                name="isPublic"
                value="private"
                checked={formData.isPublic === false}
                onChange={handleChange}
              />
              <label className="text-base text-black">Private</label>
              <br />
            </div>

            <label className="text-base text-black pl-2">Banner URL</label>
            <br />
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800 placeholder:text-green-600"
              type="text"
              name="bannerURL"
              value={formData.bannerURL}
              onChange={handleChange}
            />

            <button
              className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 text-lg border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700"
              type="submit" >
              Save Trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrip;
