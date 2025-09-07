export const fetchContent = async (tripId:string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/content/${tripId}/all`, {
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