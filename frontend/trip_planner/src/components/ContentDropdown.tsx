import Edit from '../assets/edit';
import Trash from '../assets/trash';

const ContentDropdown = () => {
  return (
    <div className="bg-stone-200 shadow-xl  w-32">
      <div className="flex flex-col">
        <div className="flex gap-2 border border-transparent p-2 cursor-pointer 
                transition-all duration-200 hover:border-green-800">
          <Edit />
          <h2>Edit</h2>
        </div>
        <div className="flex gap-2 border border-transparent p-2 cursor-pointer 
                transition-all duration-200  hover:border-green-800">
        <Trash />
          <h2>Delete</h2>
        </div>
      </div>
    </div>
  );
};


export default ContentDropdown;