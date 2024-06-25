import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import MapSection from "../components/MapSection";
import LocationInput from "../components/LocationInput";
import Modal from "../components/Modal";
import ConfirmOrder from "../components/ConfirmOrder";
import { reverseGeocode } from "../utils/geocodeUtils"; // Import ฟังก์ชันจาก geocodeUtils

function Homepage() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [locationA, setLocationA] = useState(null);
  const [locationB, setLocationB] = useState(null);
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(currentLocation);
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

  const handleLocationChangeA = async (newLocation) => {
    if (newLocation && newLocation.lat && newLocation.lng) {
      const description =
        newLocation.description ||
        (await reverseGeocode(newLocation, GOOGLE_MAPS_API_KEY));
      setLocationA({ ...newLocation, description });
      setValueA(description);
    } else if (newLocation && newLocation.description) {
      setValueA(newLocation.description);
      // You may want to geocode the description to get lat/lng
    } else {
      setLocationA(null);
      setValueA("");
    }
  };

  const handleLocationChangeB = async (newLocation) => {
    if (newLocation && newLocation.lat && newLocation.lng) {
      const description =
        newLocation.description ||
        (await reverseGeocode(newLocation, GOOGLE_MAPS_API_KEY));
      setLocationB({ ...newLocation, description });
      setValueB(description);
    } else if (newLocation && newLocation.description) {
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

  const handleBackButtonClick = () => {
    setRoute(null);
    setShowConfirmOrder(false);
    setInputVisible(true);
  };

  return (
    <div>
      <div className="max-w-[430px] max-h-[932px] min-w-[430px] min-h-[932px] relative overflow-hidden">
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <div className="mt-[70px] h-[calc(100%-70px)]">
            {!inputVisible && (
              <MapSection
                locationA={locationA}
                locationB={locationB}
                route={route}
              />
            )}
            {!showConfirmOrder && (
              <Modal inputVisible={inputVisible}>
                <LocationInput
                  setInputVisible={setInputVisible}
                  inputVisible={inputVisible}
                  handleSetLocationA={handleLocationChangeA}
                  handleSetLocationB={handleLocationChangeB}
                  valueA={valueA}
                  valueB={valueB}
                  setValueB={setValueB}
                  setShowConfirmOrder={setShowConfirmOrder}
                  setValueA={setValueA} // ส่ง setValueA ไปด้วย
                />
              </Modal>
            )}
            {showConfirmOrder && (
              <Modal>
                <ConfirmOrder
                  locationA={locationA}
                  locationB={locationB}
                  duration={duration}
                  distance={distance}
                  onBackButtonClick={handleBackButtonClick}
                />
              </Modal>
            )}
          </div>
        </LoadScript>
      </div>
    </div>
  );
}

export default Homepage;
