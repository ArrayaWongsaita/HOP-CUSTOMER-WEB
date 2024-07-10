import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

function LocationPicker({
  onAutocompleteResults,
  placeholder,
  onInputFocus,
  value,
  onChange,
  onBlur,
}) {
  const [address, setAddress] = useState(value || "");
  const autocompleteServiceRef = useRef(null);
  const inputRef = useRef(null); // เพิ่ม ref สำหรับ input field
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

    if (autocompleteServiceRef.current && inputValue.length > 0) {
      autocompleteServiceRef.current.getPlacePredictions(
        { input: inputValue, componentRestrictions: { country: "th" } },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            onAutocompleteResults(predictions || []);
          } else {
            onAutocompleteResults([]);
          }
        }
      );
    } else {
      onAutocompleteResults([]);
    }
  };

  const handleFocus = (e) => {
    if (onInputFocus) onInputFocus();
    e.target.select(); // เลือกข้อความทั้งหมดเมื่อ focus
  };

  return (
    <div
      className="location-picker"
      style={{ position: "relative", zIndex: 1000 }}
    >
      <input
        ref={inputRef} // ตั้งค่า ref สำหรับ input field
        type="text"
        value={address}
        onChange={handleInputChange}
        onFocus={handleFocus} // ใช้ handleFocus สำหรับ onFocus event
        onBlur={onBlur}
        placeholder={placeholder}
        className="p-2 rounded w-full"
        style={{ padding: "10px", boxSizing: "border-box" }}
      />
    </div>
  );
}

export default LocationPicker;
