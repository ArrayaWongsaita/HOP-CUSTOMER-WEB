import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

function LocationPicker({
  onAutocompleteResults,
  placeholder,
  onInputFocus,
  value,
  onChange,
}) {
  const [address, setAddress] = useState(value || "");
  const autocompleteServiceRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !autocompleteServiceRef.current) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  useEffect(() => {
    setAddress(value || "");
  }, [value]);

  useEffect(() => {
    const pacContainerStyle = document.createElement("style");
    pacContainerStyle.innerHTML = `
      .pac-container {
        z-index: 1050 !important;
      }
    `;
    document.head.appendChild(pacContainerStyle);
    return () => {
      document.head.removeChild(pacContainerStyle);
    };
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
    onChange(inputValue);
    console.log("Input changed:", inputValue);

    if (autocompleteServiceRef.current && inputValue.length > 0) {
      autocompleteServiceRef.current.getPlacePredictions(
        { input: inputValue, componentRestrictions: { country: "th" } },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log("Predictions received:", predictions);
            onAutocompleteResults(predictions || []);
          } else {
            console.log("No predictions received");
            onAutocompleteResults([]);
          }
        }
      );
    } else {
      onAutocompleteResults([]);
    }
  };

  return (
    <div
      className="location-picker"
      style={{ position: "relative", zIndex: 1000 }}
    >
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        onFocus={onInputFocus}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded w-full"
        style={{ padding: "10px", boxSizing: "border-box" }}
      />
    </div>
  );
}

export default LocationPicker;
