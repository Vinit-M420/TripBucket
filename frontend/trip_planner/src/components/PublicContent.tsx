import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
// import ContentDropdown from './ContentDropdown';
import Left from '../assets/left';
import { FileText, Play , Image, Link as LinkIcon, EllipsisVertical } from 'lucide-react';
import type { ContentTypeState, ContentItem } from '../types/ContentItem';
import { Link } from "react-router-dom";
import type { NavbarProps } from '../types/navbarstate';


const PublicContent = ({setNavbarState}: NavbarProps) => {
    const { shareId } = useParams<{ shareId: string }>();
    const [tripName, setTripName] = useState<string | null>(null);
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [contentType, setContentType] = useState<ContentTypeState>("all");
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

    const typeOn: string = "bg-green-800 text-stone-50  hover:bg-green-700";
    const typeOff: string = "hover:border-2 hover:border-green-800 text-green-700";    


    useEffect(() => {
        const fetchPublicTrip = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/trip/public/${shareId}`);
            if (!res.ok) throw new Error("Trip not found or private");
            const data = await res.json();
            setTripName(data.trip.destination);
            setContents(data.contents);
        } catch (err: any) {
            setError(err.message);
        }
        };
        fetchPublicTrip();
    }, [shareId]);

    const getYouTubeId = (url: string) => {
        const regex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
    if (!contents) return <div className="text-center mt-20">Loading trip...</div>;

    return (
        <div className="bg-stone-50 min-h-screen lg:w-6xl md:w-2xl w-sm flex flex-col items-center mx-auto gap-5 mt-10 ">

            <div>   
                {/* Header  */}
                <div className='flex gap-5 my-5'>
                    <Link to="/">
                        <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 flex gap-2 items-center
                                        transition duration-200 cursor-pointer hover:bg-green-700" 
                            onClick={() => { setNavbarState("hero");}}>
                            <Left /> 
                        </div> 
                    </Link>

                    <h1 className="text-green-800 text-2xl font-bold">
                        {tripName} Itinerary 
                    </h1>      
                </div>
                
                {/* Filter Tabs */}
                <div className="bg-green-100 rounded-xl p-1 gap-4 mb-5 justify-center md:flex hidden">
                    {[
                        { key: "all", label: "All" },
                        { key: "note", label: "Notes", icon: <FileText /> },
                        { key: "link", label: "Links", icon: <LinkIcon /> },
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
                <div 
                className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-auto lg:w-6xl md:w-2xl w-sm mb-10
                        `}>
                                
                    {contents.map((item) => (
                        <div key={item._id}
                            className="col-span-1 flex flex-col gap-5 border-2 border-green-200 rounded-xl p-4 
                                        shadow hover:shadow-lg transition">
                            <div className='flex justify-between'>  
                                <div className='flex gap-2 items-center text-green-800'>
                                    {item.type === "note"  && <FileText className='size-5' /> }
                                    {item.type === "image" && <Image className='size-5' /> }
                                    {item.type === "video" && <Play className='size-5' /> }
                                    {item.type === "link"  && <LinkIcon className='size-5' /> }
                                    <h3 className="font-semibold text-lg text-green-800">
                                        {item.title }
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
                                        <div className="absolute right-0 mt-1 z-50"
                                        onClick={() => {}}>
                                       
                                        </div>
                                    )}
                                    </div>

                            </div>
                            {item.type === "note" && (
                                <p className="whitespace-pre-wrap text-gray-800">
                                    {item.value}
                                </p>
                            )}
                            {item.type === "link" && (
                                <a href={item.value} target="_blank" className="text-blue-600 underline" >
                                    Visit Link
                                </a>
                            )}
                            {item.type === "video" && (() => {
                                const videoId = getYouTubeId(item.value ?? '');
                                return videoId ? (
                                    <div className="w-full place-content-center">
                                        <a href={item.value}  target="_blank" rel="noopener noreferrer" 
                                        className="block w-full overflow-hidden shadow-lg hover:opacity-90 transition relative">
                                            <img alt="YouTube thumbnail" 
                                            className="w-full"
                                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}  />

                                            <div className="absolute inset-0 flex items-center justify-center">
                                            <Play size={40} 
                                            className="text-white drop-shadow-lg opacity-90 bg-green-800
                                             rounded-3xl p-1" />
                                            </div>
                                        </a>
                                    </div>

                                ) : (
                                    <a href={item.value} target="_blank" className="text-red-500 underline">
                                    Watch Video
                                    </a>
                                );
                                })()}

                            {item.type === 'image' && 
                                <img src={item.value} className='max-w-lg' ></img>
                            }
                            </div>
                    )) }                
                </div>
            </div>
     

        </div>
    )
}

export default PublicContent

