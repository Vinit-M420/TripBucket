const API_BASE = import.meta.env.VITE_API_URL; 

export const fetchContent = async (tripId:string | null) => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/content/${tripId}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error("Failed to fetch trip's content");
    }

    const data = await response.json();
    return data.content;
    
  } catch (err) {
        console.error("Error fetching trip's content:", err);
        return [];
  }
};