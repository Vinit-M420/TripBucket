import Edit from '../assets/edit';
import Trash from '../assets/trash';
import { useModalStore, useTypeofAlertStore } from '../store';
import type { ContentDropDownType } from '../types/ContentDropDownType';
const API_BASE = import.meta.env.VITE_API_URL; 

const ContentDropdown = ({tripId, contentId, setOpenDropdownId, refreshContent}: ContentDropDownType) => 
{
  const { setToggleAlert } = useTypeofAlertStore();
  const { isEditContentOpen, openEditContent} = useModalStore();

  
  const deleteContent = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/content/${tripId}/delete/${contentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend error:", errorText);
                throw new Error("Failed to delete content");
            }

            await refreshContent();
            setToggleAlert(true);

        } catch (err) {
            console.error("Error deleting content:", err);
        }
  };

  const handleDelete = async () => {
        try {
            await deleteContent();
            
        } catch (err) {
            console.error("Error deleting content:", err);
        }
  };
        
  return (
    <div className="bg-stone-200 shadow-xl w-32">
      <div className="flex flex-col">
        <div className="flex gap-2 border border-transparent p-2 cursor-pointer 
                transition-all duration-200 hover:border-green-800"
            onClick={() => { setOpenDropdownId(null); 
              // setToggleEditContent(!toggleEditContent);
              openEditContent(!isEditContentOpen);
              // console.log("Edit content btn clicked", contentId);
              }}>
          <Edit />
          <h2>Edit</h2>
        </div>
        <div className="flex gap-2 border border-transparent p-2 cursor-pointer 
                transition-all duration-200  hover:border-green-800"
            onClick={() => { 
              setOpenDropdownId(null); 
              handleDelete();
            }}>
            <Trash />
          <h2>Delete</h2>
        </div>
      </div>
    </div>
  );
};

export default ContentDropdown;