import { useRef, useState, useEffect } from "react";
import { X } from 'lucide-react';
import type { EditContentProp } from "../types/EditContentProps";

const EditContent = (
  {tripId, contentId, setToggleEditContent, refreshContent, onClose}: EditContentProp) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const [EditformData, setEditFormData] = useState({
        type: "note",
        title: "",
        value: ""
      });

    useEffect(() => {
      const fetchContentToEdit = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/content/${tripId}/${contentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Backend error:", errorText);
          throw new Error("Failed to fetch trip's content data");
        }

        const data = await response.json();
        setEditFormData({
          type: data.content.type || "note",
          title: data.content.title || "",
          value: data.content.value || ""
        });
        
      } catch (err) {
            console.error("Error fetching trip's content:", err);
            return [];
      }
    };

     fetchContentToEdit(); 
  }, [tripId, contentId])

    const handleClose = () => {
        setToggleEditContent(false);
        if (onClose) { 
          onClose(); 
        }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
      const { name, value } = e.target;
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:5000/api/v1/content/${tripId}/edit/${contentId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(EditformData),
                    });

                    if (!response.ok) throw new Error("Failed to edit content to your trip");

                    refreshContent();
                    handleClose();

          } catch(err){
              console.log("Error Detail:" , err)
              //alert("Error in editing content your trip")
          }
    }

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
          <h1 className="text-3xl text-black font-bold">Edit Content</h1>
          <form className="md:w-md w-sm py-4" onSubmit={handleSubmit}>
            
            <label className="text-base text-black pl-2">Type</label>
            <div>
                  <select name="type" value={EditformData.type} onChange={handleChange}
                  className="bg-green-100 rounded-2xl w-full p-3 mx-auto mt-2 shadow border-1 border-green-800">
                    <option value="note">Note</option>
                    <option value="link">Link</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
            </div><br />

            <label className="text-base text-black pl-2">Title</label>
            <br />
            <input
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 mb-4 shadow border-1 border-green-800 placeholder:text-green-600"
              type="text" name="title" value={EditformData.title} onChange={handleChange} />
            <br />

            <label className="text-base text-black pl-2">Value</label>
            <br />
            <input name="value" value={EditformData.value} onChange={handleChange}
              className="bg-green-100 rounded-2xl w-full p-3 mt-2 my-4 shadow border-1 border-green-80"
              
            />

            <button
              className="w-full bg-green-800 rounded-2xl px-10 py-2 text-stone-50 text-lg border-2 border-transparent transition duration-200 cursor-pointer hover:bg-green-700"
              type="submit" >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditContent;