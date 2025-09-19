import { useState } from "react";

const Note = ({ value }: { value?: string  }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    if (!value) return null; 

    const words = value.split(" ");
    const isLong = words.length > 40;
    const preview = words.slice(0, 40).join(" ") + (isLong ? "..." : "");

    return (
        <div>
            <p className="whitespace-pre-wrap break-words text-gray-800">
                { isExpanded || !isLong ? value : preview }
            </p>

            {isLong && (
                <div className="flex justify-center">
                <button onClick={() => setIsExpanded(!isExpanded)}
                className="text-green-700 hover:underline mt-1">
                    { isExpanded ? "Read Less" : "Read More" }
                </button>
                </div>
            )}
        </div>

    )

}

export default Note;