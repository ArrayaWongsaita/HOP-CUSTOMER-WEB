import { useState, useRef } from "react";
import LocationList from "./LocationList";
import LocationPicker from "./LocationPicker";
import { reverseGeocode } from "../utils/geocodeUtils";
import { IconLocationA } from "../icons/IconLocationA";
import { IconLocationB } from "../icons/IconLocationB";
import { IconSearch } from "../icons/IconSearch";

const LocationInput = ({
  setInputVisible,
  inputVisible,
  handleSetLocationA,
  handleSetLocationB,
  valueA,
  valueB,
  setValueB,
  setShowConfirmOrder,
  setValueA,
}) => {
  const [extraVisible, setExtraVisible] = useState(false);
  const [selectedAutocompleteResults, setSelectedAutocompleteResults] =
    useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const handleAutocompleteResults = (results) => {
    setSelectedAutocompleteResults(results);
  };

  const handleSelectLocation = (location) => {
    if (activeInput === "A") {
      handleSetLocationA(location);
      handleSetLocationB(null);
      setValueB("");
      setValueA(location?.description || "");
    } else if (activeInput === "B") {
      handleSetLocationB(location);
    }
    setSelectedAutocompleteResults([]);

    if (location.lat && location.lng && valueA && valueB) {
      setShowConfirmOrder(true);
      setInputVisible(false);
    } else {
      setShowConfirmOrder(false);
      setInputVisible(true);
    }
  };

  const handleLocationChangeA = async (newLocation) => {
    handleSetLocationA(newLocation);
    handleSetLocationB(null);
    setValueB("");
    console.log("Location A changed:", newLocation);
  };

  const handleButtonClick = () => {
    setInputVisible(!inputVisible);
    setExtraVisible(true);
    handleSetLocationB(null);
    if (setValueB) setValueB("");
  };

  const handleBlur = async () => {
    if (selectedAutocompleteResults.length > 0) {
      const location = selectedAutocompleteResults[0];
      if (location.place_id) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: location.place_id }, (results, status) => {
          if (status === "OK" && results[0]) {
            const detailedLocation = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              description: results[0].formatted_address,
            };
            handleSelectLocation(detailedLocation);
            setValueA(detailedLocation?.description);
          } else {
            console.error(
              "Geocode was not successful for the following reason:",
              status
            );
          }
        });
      } else {
        const description =
          location.description ||
          (await reverseGeocode(
            location,
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          ));
        handleSelectLocation({ ...location, description });
        setValueA(description);
      }
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const placeName = await reverseGeocode(
            currentLocation,
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          );
          const location = { ...currentLocation, description: placeName };
          handleSetLocationA(location);
          setValueA(placeName);
        },
        (error) => {
          console.error("Error getting current location:", error);
          setValueA("Unknown Location");
        }
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full">
          <button onClick={handleButtonClick}>
            <div className="p-2 w-[430px] flex items-center justify-center">
              <div className="bg-white h-[4px] w-[52px]"></div>
            </div>
          </button>
        </div>
        <div className="rounded-lg w-[387px]">
          {inputVisible && (
            <div className="bg-white flex items-center rounded-md h-[70px] w-[387px] mb-2">
              <div className="flex items-center justify-center ml-2.5 min-h-[44px] max-h-[44px] min-w-[44px] max-w-[44px]">
                <IconLocationA />
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <LocationPicker
                  onAutocompleteResults={handleAutocompleteResults}
                  placeholder="Where from?"
                  onInputFocus={() => setActiveInput("A")}
                  value={valueA}
                  onChange={(value) =>
                    handleLocationChangeA({ description: value })
                  }
                  onBlur={handleBlur}
                />
              </div>
            </div>
          )}
          <button onClick={() => setInputVisible(true)}>
            <div className="bg-white flex items-center rounded-md h-[70px] w-[387px]">
              <div className="flex items-center justify-center ml-2.5 min-h-[44px] max-h-[44px] min-w-[44px] max-w-[44px]">
                {inputVisible ? <IconLocationB /> : <IconSearch />}
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <LocationPicker
                  onAutocompleteResults={handleAutocompleteResults}
                  placeholder="Where to?"
                  onInputFocus={() => setActiveInput("B")}
                  value={valueB}
                  onChange={(value) => {
                    if (setValueB) setValueB(value);
                    handleSetLocationB({ description: value });
                  }}
                />
              </div>
            </div>
          </button>

          <LocationList
            locations={selectedAutocompleteResults}
            expanded={extraVisible}
            onSelectLocation={handleSelectLocation}
            inputVisible={inputVisible}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
