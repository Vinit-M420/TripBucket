import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const AddTrip = ({ onClose, toggleAddTrip, setToggleAddTrip }:
                {onClose: () => void, toggleAddTrip:boolean , setToggleAddTrip: any}
) => {
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setToggleAddTrip(false);
    if (onClose) {
      onClose();
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
          <form className="md:w-md w-sm py-4">
            <label className="text-base text-black pl-2">Destination *</label>
            <br />
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 mb-4 shadow border-1 border-green-800 placeholder:text-green-600"
              type="text"
              required
            />
            <br />

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col">
                <label className="text-base text-black pl-2">To Date</label>
                <input
                  type="date"
                  className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800"
                />
              </div>

              <div className="col-span-1 flex flex-col">
                <label className="text-base text-black pl-2">From Date</label>
                <input
                  type="date"
                  className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800"
                />
              </div>
            </div>

            <label className="text-base text-black pl-2">Status</label>
            <div className="flex gap-2 pl-2 mt-2 mb-4">
              <input
                type="radio"
                value="public"
                checked={isPublic === true}
                onChange={() => setIsPublic(true)}
              />
              <label className="text-base text-black mr-5">Public</label>

              <input
                type="radio"
                value="private"
                checked={isPublic === false}
                onChange={() => setIsPublic(false)}
              />
              <label className="text-base text-black">Private</label>
              <br />
            </div>

            <label className="text-base text-black pl-2">Banner URL</label>
            <br />
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800 placeholder:text-green-600"
              type="text"
            />

            <button
              className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 text-lg border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700"
              type="submit"
            >
              Save Trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrip;
