const API_BASE = import.meta.env.VITE_API_URL; 

export const fetchTripName = async (tripId: string) => {
    try {
        const response = await fetch(`${API_BASE}/api/v1/trip/single/${tripId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error:", errorText);
            throw new Error("Failed to fetch trip name");
        }

        const data = await response.json();
        
        if (data.trip && data.trip.length > 0) {
            return data.trip[0].destination;
        } else {
            return "Trip not found";
        }
        
    } catch (err) {
        console.error("Error fetching trip name:", err);
        return "Unknown Destination";
    }
};