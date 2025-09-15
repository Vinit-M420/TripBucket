import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from "react-router-dom";
import PlusCircle from '../assets/pluscircle';
import ContentDropdown from './ContentDropdown';
import Left from '../assets/left';
import AddContent from './AddContent';
import EditContent from './EditContent';
import { fetchContent } from '../utils/fetchContents';
import type { ContentTypeState, ContentItem } from '../types/ContentItem';
import { FileText, Play , Image, Link as LinkIcon, EllipsisVertical, X , ListFilter } from 'lucide-react';
import { fetchTripName } from '../utils/fetchTripName';
import type { NavbarProps } from '../types/navbarstate';
import FilterDropDown from './FilterDropDown';

const TripContent = ({setNavbarState}: NavbarProps) => {
    const { tripId } = useParams();
    const [tripName, setTripName] = useState<string | null>(null);
    const [contentType, setContentType] = useState<ContentTypeState>("all");
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [content, setContent] = useState<ContentItem[]>([])
    const [toggleAddContent, setToggleAddContent] = useState<boolean>(false);
    const [toggleEditContent, setToggleEditContent] = useState<boolean>(false);
    const [selectedContentId, setSelectedContentId] = useState<number | null>(null);
    const [filterToggle, setFilterToggle] = useState<boolean>(false);
    const [toggleAlert, setToggleAlert] = useState<boolean>(false);
    const modalAlert = useRef<HTMLDivElement>(null);

    const typeOn: string = "bg-green-800 text-stone-50  hover:bg-green-700";
    const typeOff: string = "hover:border-2 hover:border-green-800 text-green-700";    

    useEffect(() => {
        if (!tripId) return;

        const loadTripName = async () => {
        try {
            const destination = await fetchTripName(tripId);
            setTripName(destination);
        } catch (error) {
            console.error('Error loading trip name:', error);
        }
        };

    const loadContent = async () => {
        try {
            const response = await fetchContent(tripId);
            setContent(response);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    };      

        loadTripName();
        loadContent();
    }, [tripId]);

    useEffect(() => {
        const showAlert = setTimeout(() => setToggleAlert(false), 3000);
        return () => clearTimeout(showAlert)

    }, [toggleAlert])

    const handleClose = () => {
        setToggleAlert(false);
    }

    const filteredContent =
    contentType === "all" ? content : content.filter((c) => c.type === contentType);

    const refreshContent = async () => {
        if (!tripId) return;
        const tripsContent = await fetchContent(tripId);
        setContent(tripsContent);
    }

    const getYouTubeId = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };
    

    return (
        <div className="bg-stone-50 min-h-screen w-full flex flex-col items-center mx-auto gap-5 mt-10 px-4">
            <div>   
                {/* Header  */}
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 my-5 items-center w-full max-w-6xl mx-auto px-2 sm:px-4'>
                        <Link to='/trips'>
                            <div className="bg-green-800 rounded-2xl px-5 py-1 text-stone-50 flex gap-2 items-center
                                            transition duration-200 cursor-pointer hover:bg-green-700"
                                onClick={() => setNavbarState("trip")}>
                                <Left />
                            </div>
                        </Link> 
                        <h1 className="text-green-800 md:text-2xl text-xl font-bold truncate">
                            {tripName} Itinerary 
                        </h1>      
                    </div>
                    <div className='md:hidden flex'>
                        <div className='hover:border border-green-800 rounded-lg p-1'
                            onClick={() => setFilterToggle(!filterToggle)}>
                            <ListFilter className='size-6'/>
                        </div>
                    </div>
                </div>
                
                {/* Filter Tabs */}
                <div className="bg-green-100 rounded-xl p-1 gap-4 mb-5 justify-center md:flex hidden w-full max-w-6xl mx-auto px-2 sm:px-4">
                    {[
                        { key: "all", label: "All" },
                        { key: "note", label: "Notes", icon: <FileText /> },
                        { key: "link", label: "Link", icon: <LinkIcon /> },
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
                <div className={`columns-1 md:columns-2 lg:columns-3 gap-5 mx-auto lg:w-6xl md:w-2xl w-xs mb-10`}>
                                
                    {filteredContent.map((item) => (
                        <div key={item._id}
                            className="mb-5 break-inside-avoid border-2 border-green-200 rounded-xl p-4 
                                        shadow hover:shadow-lg transition">
                            <div className='flex justify-between'>  
                                <div className='flex gap-2 items-center text-green-800 mb-1'>
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
                                        onClick={() => {setSelectedContentId(item._id);}}>
                                        <ContentDropdown 
                                            tripId={tripId}
                                            contentId={item._id}
                                            setOpenDropdownId={setOpenDropdownId}
                                            setToggleAlert={setToggleAlert}
                                            toggleEditContent={toggleEditContent}
                                            setToggleEditContent={setToggleEditContent}
                                            refreshContent={refreshContent} 
                                        />
                                        </div>
                                    )}
                                    </div>

                            </div>
                            {item.type === "note" && (
                                <p className="whitespace-pre-wrap break-words text-gray-800">
                                    {item.value}
                                </p>
                            )}
                            {item.type === "link" && (
                                <a href={item.value} target="_blank" 
                                className="text-blue-600 underline w-full" >
                                    {/* Visit Link */} {item.value}
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
                                <img src={item.value} className='column-1' ></img>
                            }
                            </div>
                    )) }                
                </div>
            </div>

        <div className="fixed bottom-6 lg:right-15 md:right-10 sm:bottom">
            <div className='group flex justify-start bg-green-800 text-white p-3 rounded-3xl 
            hover:bg-green-700 transition-all duration-300 cursor-pointer items-center overflow-hidden'
                  onClick={() => { setToggleAddContent(!toggleAddContent) }}>
                <div className="flex-shrink-0"><PlusCircle /></div>
                <h3 className='text-lg whitespace-nowrap transition-all duration-300 
                w-0 group-hover:w-auto group-hover:ml-2 opacity-0 group-hover:opacity-100'>
                    Add Content
                </h3>
            </div>
        </div>
            
            {toggleAddContent && 
            <AddContent 
                tripId={tripId}
                toggleAddContent={toggleAddContent}
                setToggleAddContent={setToggleAddContent}
                refreshContent={refreshContent}
                onClose={() => setToggleAddContent(false)} 
                toggleAddTrip={false}
                />
            }

            {toggleEditContent  && 
                <EditContent 
                    tripId={tripId}
                    contentId={selectedContentId}
                    toggleEditContent={toggleEditContent}
                    setToggleEditContent={setToggleEditContent}
                    refreshContent={refreshContent}
                    onClose={() => setToggleEditContent(false)} 
                    />
            } 

            { filterToggle &&
                (<div className="absolute right-5 mt-15 z-50">
                <FilterDropDown 
                    setContentType={setContentType} /> 
                </div>
                )
            }
            
            {toggleAlert ? (
            <div ref={modalAlert} role="alert"
                className='fixed inset-x bottom-0 flex items-center justify-between p-4 mb-4 text-sm text-green-800 
                border border-green-300 rounded-lg bg-green-50 w-[200px] h-10 z-50'>
                <div className="flex items-center">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <span className="font-medium">Deleted!</span> 
                    </div>
                    <div onClick={handleClose}>
                        <X className='size-3' />
                    </div>
                </div>
            ) : (null)}
            

        </div>
    )
}

export default TripContent;