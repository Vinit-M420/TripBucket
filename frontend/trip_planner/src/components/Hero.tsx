import heropic from '../images/hero1.png'

const Hero = () => {
    return (
        <div className="flex flex-col gap-5 justify-center items-center mx-auto h-[calc(100dvh-80px)]">
        <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-green-800 font-bold">
            Never Lose Another Travel Idea
        </h1>
        <h4 className="md:text-lg text-sm text-green-700 md:w-lg text-center w-md">
            Organize ideas, photos, videos, and notes for every destination. Create detailed itineraries others can follow.
        </h4>
        <div className='flex justify-evenly gap-5'>
            <button className="bg-green-800 text-white px-5 py-1 rounded-2xl hover:bg-green-700 transition-all duration-200
                                hover:scale-105 hover:-translate-y-0.5 cursor-pointer">
                Create Your First Trip
            </button>
            
            <button className="bg-transparent border-2 border-green-700 text-green-700 text-base transition-all duration-200
                                px-5 py-1 rounded-2xl hover:bg-green-100 hover:scale-105 hover:-translate-y-0.5 cursor-pointer">
                Browse Public Trips
            </button>
        </div>
        <img src={heropic} alt="maps" className='w-[500px] h-auto' />
    </div>
    
)}

export default Hero