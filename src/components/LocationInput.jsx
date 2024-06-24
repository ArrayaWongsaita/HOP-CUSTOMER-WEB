import React, { useState } from "react";
import LocationList from "./LocationList";
import LocationPicker from "./LocationPicker";

const LocationInput = ({
  setInputVisible,
  inputVisible,
  handleSetLocationA,
  handleSetLocationB,
  valueA,
  valueB,
  setShowConfirmOrder,
}) => {
  const [extraVisible, setExtraVisible] = useState(false);
  const [selectedAutocompleteResults, setSelectedAutocompleteResults] =
    useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const handleAutocompleteResults = (results) => {
    console.log("Autocomplete results:", results);
    setSelectedAutocompleteResults(results);
  };

  const handleSelectLocation = (location) => {
    if (activeInput === "A") {
      handleSetLocationA(location);
      handleSetLocationB(null); // Reset จุดส่ง
      console.log("Selected location A:", location);
    } else if (activeInput === "B") {
      handleSetLocationB(location);
      console.log("Selected location B:", location);
    }
    setSelectedAutocompleteResults([]);

    // เช็คว่ามี lat/lng ของจุดรับและจุดส่งครบหรือไม่
    if (location.lat && location.lng && valueA && valueB) {
      setShowConfirmOrder(true); // แสดง modal ยืนยันการสั่งซื้อ
      setInputVisible(false); // ปิด modal ป้อนข้อมูล
    } else {
      setShowConfirmOrder(false); // ซ่อน modal ยืนยันการสั่งซื้อ
      setInputVisible(true); // เปิด modal ป้อนข้อมูล
    }
  };

  const handleLocationChangeA = async (newLocation) => {
    if (newLocation.lat && newLocation.lng) {
      handleSetLocationA(newLocation);
      handleSetLocationB(null); // Reset จุดส่ง
      console.log("Location A changed:", newLocation);
    } else if (newLocation.description) {
      handleSetLocationA(newLocation);
      handleSetLocationB(null); // Reset จุดส่ง
      console.log("Location A description changed:", newLocation.description);
    } else {
      handleSetLocationA(null);
      handleSetLocationB(null); // Reset จุดส่ง
      console.log("Location A cleared");
    }
  };

  const handleButtonClick = () => {
    setInputVisible(!inputVisible);
    setExtraVisible(true); // ตั้งค่า extraVisible เป็น true เมื่อกดปุ่ม
    console.log("Input visibility toggled:", inputVisible);
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
              <div className="flex items-center justify-center ml-2.5 bg-green-500 min-h-[44px] max-h-[44px] min-w-[44px] max-w-[44px]">
                icon
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <LocationPicker
                  onAutocompleteResults={handleAutocompleteResults}
                  placeholder="จุดรับ"
                  onInputFocus={() => setActiveInput("A")}
                  value={valueA}
                  onChange={(value) =>
                    handleLocationChangeA({ description: value })
                  }
                />
              </div>
            </div>
          )}
          <button onClick={() => setInputVisible(true)}>
            {/* ตั้งค่า extraVisible เป็น true เมื่อกดปุ่ม */}
            <div className="bg-white flex items-center rounded-md h-[70px] w-[387px]">
              <div className="flex items-center justify-center ml-2.5 bg-red-600 min-h-[44px] max-h-[44px] min-w-[44px] max-w-[44px]">
                icon
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <LocationPicker
                  onAutocompleteResults={handleAutocompleteResults}
                  placeholder="จุดส่ง"
                  onInputFocus={() => setActiveInput("B")}
                  value={valueB}
                  onChange={(value) =>
                    handleSetLocationB({ description: value })
                  }
                />
              </div>
            </div>
          </button>

          <LocationList
            locations={selectedAutocompleteResults}
            expanded={extraVisible}
            onSelectLocation={handleSelectLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
