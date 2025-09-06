import { FileText, Play , Image, Link, EllipsisVertical   } from 'lucide-react';
import { useState } from 'react';
import PlusCircle from '../assets/pluscircle';
import ContentDropdown from './ContentDropdown';

export type ContentTypeState = 'all' | 'videos' | 'links' | 'notes' | 'images';

type ContentItem = {
  id: number;
  type: ContentTypeState;
  title: string;
//   url?: string;
  value?: string;
};

const TripContent = () => {
    const [contentType, setContentType] = useState<ContentTypeState>("all"); 
    const typeOn: string = "bg-green-800 text-stone-50  hover:bg-green-700";
    const typeOff: string = "hover:border-2 hover:border-green-800 text-green-700";
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);


    const contents: ContentItem[] = [
    { id: 1, type: "notes", title: "Day 1 Itinerary", value: "1) Explore Reykjavik city 2) Get Car" },
    { id: 2, type: "links", title: "Google Maps", value: "https://maps.google.com" },
    { id: 3, type: "videos", title: "Iceland Vlog", value: "https://youtube.com" },
    { id: 4, type: "images", title: "Northern Lights", 
        value: "https://plus.unsplash.com/premium_photo-1721858125013-0216cb83af53?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

    const filteredContent =
    contentType === "all" ? contents : contents.filter((c) => c.type === contentType);

    return (
        <div className="h-screen lg:w-6xl w-2xl flex flex-col items-center mx-auto gap-5 mt-10 bg-stone-50">
            <div>
                <div className='text-center my-5'>
                    <h1 className="text-green-800 text-2xl font-bold">
                        Trip to Iceland 
                    </h1>      
                </div>

                <div className="bg-green-100 rounded-xl p-1 flex gap-4 mb-5 justify-center">
                    {[
                        { key: "all", label: "All" },
                        { key: "notes", label: "Notes", icon: <FileText /> },
                        { key: "links", label: "Links", icon: <Link /> },
                        { key: "videos", label: "Videos", icon: <Play /> },
                        { key: "images", label: "Images", icon: <Image /> },
                    ].map(({ key, label, icon }) => (
                        <div
                            key={key}
                            className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer transition duration-200 flex items-center gap-2 ${
                                contentType === key ? typeOn : typeOff}`}
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
                        <div key={item.id}
                            className="col-span-1 flex flex-col gap-5 border-2 border-green-200 rounded-xl p-4 shadow hover:shadow-lg transition">
                            <div className='flex justify-between'>  
                                <div className='flex gap-2 items-center text-green-800'>
                                    {item.type === "notes"  && <FileText className='size-5 ' /> }
                                    {item.type === "images" && <Image className='size-5' /> }
                                    {item.type === "videos" && <Play className='size-5' /> }
                                    {item.type === "links"  && <Link className='size-5' /> }
                                    <h3 className="font-semibold text-xl text-green-800">{item.title}</h3>
                                </div>
                                <div className="relative">
                                    <div className="border border-transparent rounded-2xl p-1
                                                hover:border hover:border-green-800 hover:bg-stone-100 cursor-pointer"
                                        onClick={() =>
                                        setOpenDropdownId(openDropdownId === item.id ? null : item.id)}>
                                        <EllipsisVertical className="size-5" />
                                    </div>

                                    {openDropdownId === item.id && (
                                        <div className="absolute right-0 mt-1 z-50">
                                        <ContentDropdown />
                                        </div>
                                    )}
                                    </div>

                            </div>
                            {item.type === "notes" && (
                                    <p>{item.value}</p>
                            )}
                            {item.type === "links" && (
                                <a href={item.value} target="_blank" className="text-blue-600 underline" >
                                    {item.value}
                                </a>
                            )}
                            {item.type === 'videos' && 
                                <a href={item.value} target='_blank' className='text-red-500 underline'>
                                    Watch Video
                                </a>
                            }
                            {item.type === 'images' && 
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