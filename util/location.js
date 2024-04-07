// Google API key for accessing Google Maps API
const GOOGLE_API_KEY = "AIzaSyCoVVe5ejKXp8Ov7oG4P5zcyWPDVHAXIDU";

// Function to get a static map preview image URL based on latitude and longitude
export function getMapPreview(lat, lng) {
  // Construct the URL for the static map image
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

// Function to get the address based on latitude and longitude using Google Geocoding API
export async function getAddress(lat, lng) {
  try {
    // Construct the URL for reverse geocoding
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    
    // Fetch the address data from the API
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch address!");
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract the formatted address from the response
    const address = data.results[0].formatted_address;

    // Return the address
    return address;
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error("Error fetching address:", error);
    throw error; 
  }
}
