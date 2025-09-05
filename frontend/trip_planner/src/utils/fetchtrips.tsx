export const fetchTrips = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/trip/all", {
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