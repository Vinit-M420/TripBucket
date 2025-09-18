// import React from 'react';
// import { FileText, Play, Image, Link as LinkIcon, EllipsisVertical } from 'lucide-react';
// import ContentDropdown from './ContentDropdown';
// import type { ContentItem } from '../types/ContentItem';

// const getYouTubeId = (url: string) => {
//     const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
// };

// type ContentItemType = {
//     key: number,
//     item : ContentItem, 
//     tripId: string | undefined, 
//     openDropdownId: number | null, 
//     setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>, 
//     refreshContent: () => Promise<void>
// }


// const ContentItemDisplay = ({ key, item, tripId, openDropdownId, setOpenDropdownId, refreshContent }: ContentItemType) => {
//     return (
//         <div key={key} 
//         className="mb-5 break-inside-avoid border-2 border-green-200 rounded-xl p-4 
//                         shadow hover:shadow-lg transition">
//             <div className='flex justify-between'>
//                 <div className='flex gap-2 items-center text-green-800 mb-1'>
//                     {item.type === "note"  && <FileText className='size-5' />}
//                     {item.type === "image" && <Image className='size-5' />}
//                     {item.type === "video" && <Play className='size-5' />}
//                     {item.type === "link"  && <LinkIcon className='size-5' />}
//                     <h3 className="font-semibold text-lg text-green-800">{item.title}</h3>
//                 </div>
//                 <div className="relative">
//                     <div
//                         className="border border-transparent rounded-2xl p-1 hover:border hover:border-green-800 hover:bg-stone-100 cursor-pointer"
//                         onClick={() => {
//                             // console.log("item:", item)
//                             setOpenDropdownId(openDropdownId === item._id ? null : item._id)
//                         }}
//                     >
//                         <EllipsisVertical className="size-5" />
//                     </div>
//                     {openDropdownId === item._id && (
//                         <div className="absolute right-0 mt-1 z-50">
//                             <ContentDropdown
//                                 tripId={tripId}
//                                 contentId={item._id}
//                                 setOpenDropdownId={setOpenDropdownId}
//                                 refreshContent={refreshContent} 
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Content Value */}
//             {item.type === "note" && (
//                 <p className="whitespace-pre-wrap break-words text-gray-800">{item.value}</p>
//             )}
//             {item.type === "link" && (
//                 <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
//                     {item.value}
//                 </a>
//             )}
//             {item.type === 'image' && (
//                 <img src={item.value} alt={item.title} className='rounded-lg mt-2' />
//             )}
//             {item.type === "video" && (() => {
//                 const videoId = getYouTubeId(item.value ?? '');
//                 return videoId ? (
//                     <div className="w-full mt-2">
//                          <a href={item.value} target="_blank" rel="noopener noreferrer" className="block w-full overflow-hidden shadow-lg hover:opacity-90 transition relative">
//                              <img alt="YouTube thumbnail" className="w-full" src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} />
//                              <div className="absolute inset-0 flex items-center justify-center">
//                                  <Play size={40} className="text-white drop-shadow-lg opacity-90 bg-green-800 rounded-3xl p-1" />
//                              </div>
//                          </a>
//                     </div>
//                 ) : (
//                     <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-red-500 underline">Watch Video</a>
//                 );
//             })()}
//         </div>
//     );
// };

// // Wrap the component with React.memo
// export default React.memo(ContentItemDisplay);
