import React, { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import MapSection from "./components/MapSection";
import LocationInput from "./components/LocationInput";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ConfirmOrder from "./components/ConfirmOrder";

function App() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [locationA, setLocationA] = useState(null);
  const [locationB, setLocationB] = useState(null);
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocationA(currentLocation);
        const placeName = await reverseGeocode(currentLocation);
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
    }
  }, [locationA, locationB]);

  const reverseGeocode = async (location) => {
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
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_MAPS_API_KEY}`
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

  const handleLocationChangeA = async (newLocation) => {
    if (newLocation.lat && newLocation.lng) {
      setLocationA(newLocation);
      setValueA(newLocation.description || (await reverseGeocode(newLocation)));
    } else if (newLocation.description) {
      setValueA(newLocation.description);
      // You may want to geocode the description to get lat/lng
    } else {
      setLocationA(null);
      setValueA("");
    }
  };

  const handleLocationChangeB = async (newLocation) => {
    if (newLocation.lat && newLocation.lng) {
      setLocationB(newLocation);
      setValueB(newLocation.description || (await reverseGeocode(newLocation)));
    } else if (newLocation.description) {
      setValueB(newLocation.description);
      // You may want to geocode the description to get lat/lng
    } else {
      setLocationB(null);
      setValueB("");
    }
  };

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
    <div className="App">
      <div className="max-w-[430px] max-h-[932px] min-w-[430px] min-h-[932px] relative overflow-hidden">
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <Header />
          <div className="mt-[70px] h-[calc(100%-70px)]">
            {!inputVisible && (
              <MapSection
                locationA={locationA}
                locationB={locationB}
                route={route}
              />
            )}
            {/* <Modal inputVisible={inputVisible}>
              <LocationInput
                setInputVisible={setInputVisible}
                inputVisible={inputVisible}
                handleSetLocationA={handleLocationChangeA}
                handleSetLocationB={handleLocationChangeB}
                valueA={valueA}
                valueB={valueB}
              />
            </Modal> */}

            <Modal>
              <ConfirmOrder></ConfirmOrder>
            </Modal>
          </div>
        </LoadScript>
      </div>
    </div>
  );
}

export default App;
