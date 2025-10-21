import { AnimatedList } from "./ui/animated-list"
import { cn } from "../lib/utils"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { CityItem } from "../types/cityitem";
gsap.registerPlugin(ScrollTrigger);


const CityArray: CityItem[] = [
  {
    city: "Barcelona",
    country: "Spain",
    icon: "🏖️",
    color: "#E32636", 
  },
  {
    city: "Tokyo",
    country: "Japan",
    icon: "🗼",
    color: "#BC002D", 
  },
  {
    city: "Singapore",
    country: "Singapore",
    icon: "🦁",
    color: "#ED2939", 
  },
  {
    city: "Rio De Janeiro",
    country: "Brazil",
    icon: "🕺",
    color: "#FFC107",
  },
  {
    city: "Venice",
    country: "Italy",
    icon: "🛶",
    color: "#009246", 
  },
  {
    city: "San Francisco",
    country: "USA",
    icon: "🌉",
    color: "#B22234",
  },
  {
    city: "Copenhagen",
    country: "Denmark",
    icon: "🧜‍♀️",
    color: "#C8102E", 
  },
  {
    city: "St. Petersburg",
    country: "Russia",
    icon: "🏛️",
    color: "#003087", 
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    icon: "🏙️",
    color: "#FFD700", 
  },
]

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const City = ({ city, country, icon, color }: CityItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre text-black">
            <span className="text-sm sm:text-lg">{city}</span>
          </figcaption>
          <p className="text-sm font-normal text-black/60">{country}</p>
        </div>
      </div>
    </figure>
  )
}

export default function Cities({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const shuffledCities = shuffleArray(CityArray);

  useEffect(() => {
    if (listRef.current && containerRef.current) {
      // Select all child elements of AnimatedList for animation
      const items = listRef.current.querySelectorAll(".animated-list-item");

      if (items.length === 0) {
        console.warn("No .animated-list-item elements found in AnimatedList");
      }

      gsap.set(items, { y: 50, opacity: 0 });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Adjusted to trigger later
          end: "bottom 20%", // Ensure animation completes before leaving viewport
          toggleActions: "play none none none",
          // markers: true, // Uncomment for debugging trigger points
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex gap-10 h-[500px] w-full flex-col overflow-hidden p-2 my-25",
        className
      )}
    >
      <div className="flex items-center justify-center">
        <h3 className="font-semibold md:text-4xl text-3xl text-green-800 text-center">
          Where Will Your Next Adventure Take You?
        </h3>
      </div>

      <div ref={listRef}>
        <AnimatedList>
          {shuffledCities.map((item, idx) => (
            <div key={idx} className="animated-list-item">
              <City {...item} />
            </div>
          ))}
        </AnimatedList>
      </div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  );
}