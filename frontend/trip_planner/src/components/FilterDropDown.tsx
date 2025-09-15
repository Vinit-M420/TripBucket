import { FileText, Play , Image, Link as LinkIcon, Book  } from 'lucide-react';
// import type { ContentTypeState, ContentItem } from '../types/ContentItem';


const FilterDropDown = ({setContentType}: any) => {

    return (
        <div className="bg-stone-200 shadow-xl w-32 rounded-xl">
        {[
            { key: "all", label: "All", icon: <Book /> },
            { key: "note", label: "Notes", icon: <FileText /> },
            { key: "link", label: "Link", icon: <LinkIcon /> },
            { key: "video", label: "Videos", icon: <Play /> },
            { key: "image", label: "Images", icon: <Image /> },
        ].map(({ key, label, icon }) => (
            
            <div key={key}
                className="flex gap-2 border border-transparent p-2 cursor-pointer 
                            transition-all duration-200 hover:border-green-800"
                onClick={() => {setContentType(key); }}>
                {icon}
                <h2 className="text-base">{label}</h2>
            </div>
        ))}
        </div>

    )
}

export default FilterDropDown;