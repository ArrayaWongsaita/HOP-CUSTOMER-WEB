import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import { reverseGeocode } from "../utils/geocodeUtils"; // Import ฟังก์ชันจาก geocodeUtils
import LoadScreen from "../components/LoadScreen";
import { useRef } from "react";

function UserOrder() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [locationA, setLocationA] = useState(null);
  const [locationB, setLocationB] = useState(null);
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLocation = {
          lat: position.coords.latitude || 13.7583339,
          lng: position.coords.longitude || 100.5353214,
        };
        // console.log(currentLocation);
        const placeName = await reverseGeocode(
          currentLocation,
          GOOGLE_MAPS_API_KEY
        );
        setLocationA({ ...currentLocation, description: placeName });
        setValueA(placeName);
      },
      (error) => {
        console.error("Error getting current location:", error);
        setValueA("Unknown Location");
      }
    );
  }, []);

  useEffect(() => {
    if (locationA && locationB) {
      calculateRoute();
      setShowConfirmOrder(true);
    }
  }, [locationA, locationB]);

  const calculateRoute = () => {
    if (locationA && locationB) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: locationA,
          destination: locationB,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setRoute(result);
            const leg = result.routes[0].legs[0];
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
    <div>
      <div className="max-w-[430px] min-w-[430px] h-[862px]  relative overflow-hidden">
        <LoadScript></LoadScript>
      </div>
    </div>
  );
}

export default UserOrder;
