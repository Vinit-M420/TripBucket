import { Share2, CirclePlus, CalendarDays, NotebookPen } from 'lucide-react';
import { useEffect, useRef, type JSX } from 'react';
import clsx from 'clsx';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const iconClass = `size-10 group-hover:scale-75 transition-all duration-500 ease-in-out`

interface Feature {
    icon: JSX.Element,
    title: string,
    description: string,
    colSpan: 1 | 2 
}

const FeatureItems1: Feature[] = [
    {
        icon: <CirclePlus className={iconClass} />,
        title: "Create Bucket List",
        description: "Add destinations to your travel bucket list and make your dream destinations tangible.",
        colSpan: 2
    },
    {
        icon: <CalendarDays className={iconClass} />,
        title: "Add Timeline",
        description: "Set tentative dates as pseudo-deadlines for your destinations—time flies, so don't wait too long!",
        colSpan: 1
    }
]

const FeatureItems2: Feature[] = [
    {
        icon: <Share2 className={iconClass} />,
        title: "Share Your Itinerary",
        description: "Created something amazing? Share your detailed itinerary with fellow travelers and inspire others.",
        colSpan: 1
    },
    {
        icon: <NotebookPen className={iconClass} />,
        title: "Build Trip Itinerary",
        description: "Organize every detail about your destination to craft an unforgettable travel experience.",
        colSpan: 2
    }
]



const FeatureCard = ({ feature }: { feature: Feature }) => {
    return (
        <div className={clsx(
            "group grid col-span-1",
            "border-2 border-green-800 rounded-xl p-2",
            "hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100",
            "transition-all duration-500 ease-in-out",
            // Responsive column spans
            feature.colSpan === 2 ? "lg:col-span-2 md:col-span-2" : "lg:col-span-1 md:col-span-1"
        )}>
            <div className='flex flex-col justify-end gap-4 h-[200px]'>
                <span className='ml-2'>{feature.icon}</span>
                <h2 className='text-green-800 font-bold text-2xl'>{feature.title}</h2>
                <p className='text-md opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-700 ease-in-out'>
                    {feature.description}
                </p>
            </div>
        </div>
    )
}


const Features = () => {
    
    const featureRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (featureRef.current) {
        
        gsap.fromTo(featureRef.current, 
            {y: -50, opacity: 0, duration: 3, ease: "power3.out" }, 
            {y: 0, opacity: 1, duration: 1, 
                scrollTrigger: {
                trigger: featureRef.current,  start: "top 80%", 
                toggleActions: "play none none none", // play only once
                },
            });
        }
    }, []);
    return (
    <section className="flex flex-col justify-center items-center mx-auto gap-10 max-w-4xl lg:w-4xl md:w-xl w-sm my-25">
        <div className="flex flex-col gap-2 items-center justify-center">
            <h3 className="font-semibold md:text-4xl text-3xl text-green-800 text-center">
            Features
            </h3>
            <p className="text-green-700 text-center text-lg">
                Turn your travel dreams into reality
            </p>
        </div>
        <div ref={featureRef} className='flex flex-col gap-5'>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto items-center justify-center gap-4 w-full">
            {FeatureItems1.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
            ))}
        </div> 

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto items-center justify-center gap-4 w-full">
            {FeatureItems2.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
            ))}
        </div>
        </div>
    </section>
    )
}

export default Features;