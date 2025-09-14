const API_BASE = import.meta.env.VITE_API_URL; 

export const fetchTrips = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/trip/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error("Failed to fetch trips");
    }

    const data = await response.json();
    return data.trips || data;
  } catch (err) {
    console.error("Error fetching trips:", err);
    return [];
  }
};