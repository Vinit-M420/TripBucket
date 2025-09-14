import { useRef, useState } from "react";
import { X } from 'lucide-react';
import type { AddContentProp } from "../types/AddContentProp";
const API_BASE = import.meta.env.VITE_API_URL; 

const AddContent = ({tripId, toggleAddContent, setToggleAddContent, refreshContent, onClose}: AddContentProp) => {
    
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
        type: "note",
        title: "",
        value: ""
      });

  const handleClose = () => {
        setToggleAddContent(false);
        if (onClose) { onClose(); }
    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try{
            const response = await fetch(`${API_BASE}/api/v1/content/${tripId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(formData),
                    });

                    if (!response.ok) throw new Error("Failed to add content to your trip");

                    refreshContent();
                    handleClose();

          } catch(err){
              console.log("Error Detail:" , err)
              //alert("Error in adding content your trip")
          }
    }

    if (!toggleAddContent) return null;

    return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      <div ref={modalRef}
        className="border-2 border-green-800 bg-stone-50 rounded-2xl py-5 md:w-xl w-sm shadow relative" >
        <button
          aria-label="Close modal"
          onClick={handleClose}
          className="absolute top-5 right-5 text-green-800 hover:text-green-600 transition-colors duration-200 z-10">
          <X size={30} />
        </button>

        <div className="flex flex-col justify-center items-center">
          <h1 className="md:text-3xl text-2xl text-black font-bold">Add Content</h1>
          {/* <h2 className="text-base text-green-800">One Trip at a Time</h2> */}
          <form className="md:w-md w-xs py-4" onSubmit={handleSubmit}>
            
            <label className="md:text-base text-sm text-black pl-2">Type</label>
            <div>
                  <select name="type" value={formData.type} onChange={handleChange}
                  className="bg-green-100 rounded-2xl w-full p-3 mx-auto mt-2 shadow border-1 border-green-800">
                    <option value="note">Note</option>
                    <option value="link">Link</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
            </div> <br />

            <label className="md:text-base text-sm text-black pl-2">Title</label>
            <br />
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 mb-4 shadow border-1 border-green-800 placeholder:text-green-600"
              type="text" name="title" value={formData.title} onChange={handleChange} />
            <br />

            <label className="md:text-base text-sm text-black pl-2">Value</label>
            <br />
            <textarea name="value" rows={4} cols={40} value={formData.value} onChange={handleChange}
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-800"
            />

            <button
              className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 md:text-lg text-md 
              border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700"
              type="submit" >
              Save Content
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContent;