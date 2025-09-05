import { FileText, Play , Image, Link, Calendar  } from 'lucide-react';
import { useState } from 'react';

export type ContentTypeState = 'all' | 'videos' | 'links' | 'notes' | 'images';



const TripContent = () => {
    const [contentType, setContentType] = useState<ContentTypeState>("all"); 
    const typeOn: string = "bg-green-800 text-stone-50  hover:bg-green-700";
    const typeOff: string = "hover:border-2 hover:border-green-800 text-green-700";

    return (
        <div className="h-full lg:w-6xl w-2xl flex flex-col items-center mx-auto gap-5 mt-10">
            <div>
                <div className='flex justify-start my-5'>
                    <h1 className="text-green-800 text-2xl">
                        Iceland Itinerary
                    </h1>      
                </div>
                <div className="bg-green-100 rounded-xl p-1 flex gap-4">
                    <div className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer transition duration-200
                        flex items-center gap-2 ${contentType === 'all' ? typeOn : typeOff}`}
                        onClick={() => setContentType('all')}>
                        <h2 className="text-lg">
                            All
                        </h2> 
                    </div>

                    <div className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer transition duration-200
                        flex items-center gap-2 ${contentType === 'notes' ? typeOn : typeOff}`}
                        onClick={() => setContentType('notes')}>
                        <FileText /> 
                        <h2 className="text-lg">
                            Notes
                        </h2>
                    </div>
                    <div className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer transition duration-200
                        flex items-center gap-2 ${contentType === 'links' ? typeOn : typeOff}`}
                        onClick={() => setContentType('links')}>
                        <Link />
                    <h2 className="text-lg">
                        Links
                    </h2>
                    </div>
                    <div className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer transition duration-200 
                                    flex items-center gap-2 ${contentType === 'videos' ? typeOn : typeOff}`}
                        onClick={() => setContentType('videos')}>
                        <Play />
                    <h2 className="text-lg">
                        Videos
                    </h2>
                    </div>
                    <div className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer transition duration-200 
                                    flex items-center gap-2 ${contentType === 'images' ? typeOn : typeOff}`}
                        onClick={() => setContentType('images')}>
                        <Image />
                    <h2 className="text-lg">
                        Images
                    </h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TripContent;