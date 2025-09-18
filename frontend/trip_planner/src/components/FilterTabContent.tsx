import React, { memo } from 'react';
import { FileText, Play, Image, Link as LinkIcon } from 'lucide-react';
import type { ContentTypeState } from '../types/ContentItem';

interface FilterTabInt {
    contentType: ContentTypeState;
    setContentType: React.Dispatch<React.SetStateAction<ContentTypeState>>;
    setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const FilterTabs = 
    memo(function FilterTabs({ contentType, setContentType, setOpenDropdownId}: FilterTabInt) {

    const typeOn = "bg-green-800 text-stone-50 hover:bg-green-700";
    const typeOff = "hover:border-2 hover:border-green-800 text-green-700";

    const filterOptions = [
        { key: "all", label: "All", icon: <FileText /> },
        { key: "note", label: "Notes", icon: <FileText /> },
        { key: "link", label: "Link", icon: <LinkIcon /> },
        { key: "video", label: "Videos", icon: <Play /> },
        { key: "image", label: "Images", icon: <Image /> },
    ];

    return (
        <div className="bg-green-100 rounded-xl p-1 gap-4 mb-5 justify-center md:flex hidden w-full max-w-6xl mx-auto px-2 sm:px-4">
        {filterOptions.map(({ key, label, icon }) => (
            <div
            key={key}
            className={`rounded-2xl px-5 py-1 border-2 border-transparent cursor-pointer transition duration-200 
                        flex items-center gap-2
                        ${contentType === key ? typeOn : typeOff}`}
            onClick={() => {
                setContentType(key as ContentTypeState);
                setOpenDropdownId(null);
            }}>
            {icon}
            <h2 className="text-lg">{label}</h2>
            </div>
        ))}
        </div>
    );
});
