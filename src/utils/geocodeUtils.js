export const reverseGeocode = async (location, apiKey) => {
  if (
    !location ||
    typeof location.lat !== "number" ||
    typeof location.lng !== "number"
  ) {
    console.error("Invalid location:", location);
    return "Unknown Location";
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return "Unknown Location";
    }
  } catch (error) {
    console.error("Error in reverseGeocode:", error);
    return "Unknown Location";
  }
};
