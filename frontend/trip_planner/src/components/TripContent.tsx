import { FileText, Play , Image, Link, EllipsisVertical   } from 'lucide-react';
import { useEffect, useState } from 'react';
import PlusCircle from '../assets/pluscircle';
import ContentDropdown from './ContentDropdown';
import Left from '../assets/left';
import type { NavbarState } from "../types/navbarstate";
import { fetchContents } from '../utils/fetchContents';

export type ContentTypeState = 'all' | 'video' | 'link' | 'note' | 'image';

type ContentItem = {
  _id: number;
  type: ContentTypeState;
  title: string;
  value?: string;
};

type tripContentType = {
    tripId: string,
    tripName: string | null,
    setNavbarState: (state: NavbarState) => void;
}

const TripContent = ({tripId, tripName, setNavbarState}: tripContentType) => {
    const [contentType, setContentType] = useState<ContentTypeState>("all"); 
    const typeOn: string = "bg-green-800 text-stone-50  hover:bg-green-700";
    const typeOff: string = "hover:border-2 hover:border-green-800 text-green-700";
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [content, setContent] = useState<ContentItem[]>([])

    useEffect(() => {
        const loadContent = async () => {
            const response = await fetchContents(tripId);
            setContent(response)
            console.log(content);
        };
        loadContent();
    }, [tripId]);

    const filteredContent =
    contentType === "all" ? content : content.filter((c) => c.type === contentType);

    return (
        <div className="h-screen lg:w-6xl w-2xl flex flex-col items-center mx-auto gap-5 mt-10 bg-stone-50">
            <div>   
                {/* Header  */}
                <div className='flex gap-5 my-5'>
                    <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 flex gap-2 items-center
                                    transition duration-200 cursor-pointer hover:bg-green-700"
                        onClick={() => setNavbarState("profile")}>
                        <Left />
                        {/* <h2 className="text-lg">Back to Trips</h2>  */}
                    </div> 

                    <h1 className="text-green-800 text-2xl font-bold">
                        {tripName} Itinerary 
                    </h1>      
                </div>
                
                {/* Filter Tabs */}
                <div className="bg-green-100 rounded-xl p-1 flex gap-4 mb-5 justify-center">
                    {[
                        { key: "all", label: "All" },
                        { key: "note", label: "Notes", icon: <FileText /> },
                        { key: "link", label: "Links", icon: <Link /> },
                        { key: "video", label: "Videos", icon: <Play /> },
                        { key: "image", label: "Images", icon: <Image /> },
                    ].map(({ key, label, icon }) => (
                        <div
                            key={key}
                            className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer 
                                        transition duration-200 flex items-center gap-2 
                                ${contentType === key ? typeOn : typeOff}`}
                            onClick={() => 
                                {setContentType(key as ContentTypeState); 
                                setOpenDropdownId(null);
                                }}>
                            {icon}
                            <h2 className="text-lg">{label}</h2>
                        </div>
                    ))}
                </div>
                
                {/* Content Part */}
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-auto justify-center items-center
                                lg:w-6xl md:w-2xl w-sm'> 
                    {filteredContent.map((item) => (
                        <div key={item._id}
                            className="col-span-1 flex flex-col gap-5 border-2 border-green-200 rounded-xl p-4 shadow hover:shadow-lg transition">
                            <div className='flex justify-between'>  
                                <div className='flex gap-2 items-center text-green-800'>
                                    {item.type === "note"  && <FileText className='size-5 ' /> }
                                    {item.type === "image" && <Image className='size-5' /> }
                                    {item.type === "video" && <Play className='size-5' /> }
                                    {item.type === "link"  && <Link className='size-5' /> }
                                    <h3 className="font-semibold text-xl text-green-800">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="relative">
                                    <div className="border border-transparent rounded-2xl p-1
                                                hover:border hover:border-green-800 hover:bg-stone-100 cursor-pointer"
                                        onClick={() =>
                                        setOpenDropdownId(openDropdownId === item._id ? null : item._id)}>
                                        <EllipsisVertical className="size-5" />
                                    </div>

                                    {openDropdownId === item._id && (
                                        <div className="absolute right-0 mt-1 z-50">
                                        <ContentDropdown setOpenDropdownId={setOpenDropdownId} />
                                        </div>
                                    )}
                                    </div>

                            </div>
                            {item.type === "note" && (
                                    <p>{item.value}</p>
                            )}
                            {item.type === "link" && (
                                <a href={item.value} target="_blank" className="text-blue-600 underline" >
                                    {item.value}
                                </a>
                            )}
                            {item.type === 'video' && 
                                <a href={item.value} target='_blank' className='text-red-500 underline'>
                                    Watch Video
                                </a>
                            }
                            {item.type === 'image' && 
                                <img src={item.value} className='max-w-lg' ></img>
                            }
                        
                        </div>
                    )) }                
                </div>
                
            </div>
            
            
            <div className="fixed bottom-6 md:right-20 right-5">
                    <div className='flex justify-start gap-2 bg-green-800 text-white px-5 py-2 rounded-2xl 
                    hover:bg-green-700 transition-all duration-200 cursor-pointer items-center'>
                        <PlusCircle />
                        {/* <h3 className='text-lg'>Add Trip</h3> */}
                    </div>
            </div>
        </div>
    )
}

export default TripContent;