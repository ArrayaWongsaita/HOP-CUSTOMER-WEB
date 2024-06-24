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
    } else if (activeInput === "B") {
      handleSetLocationB(location);
    }
    setSelectedAutocompleteResults([]);
  };

  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full">
          <button
            onClick={() => {
              setInputVisible(!inputVisible);
              setExtraVisible(!extraVisible);
              console.log("Input visibility toggled:", inputVisible);
            }}
          >
            <div className="p-2 w-[430px] flex items-center justify-center">
              <div className="bg-white h-[4px] w-[52px]"></div>
            </div>
          </button>
        </div>
        <div className="rounded-lg w-[387px]">
          {inputVisible && extraVisible && (
            <div className="bg-white flex items-center rounded-md h-[70px] w-[387px] mb-2">
              <div className="flex items-center justify-center ml-2.5 bg-green-500 min-h-[44px] max-h-[44px]">
                icon
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <LocationPicker
                  onAutocompleteResults={handleAutocompleteResults}
                  placeholder="จุดรับ"
                  onInputFocus={() => setActiveInput("A")}
                  value={valueA}
                  onChange={(value) =>
                    handleSetLocationA({ description: value })
                  }
                />
              </div>
            </div>
          )}
          <div className="bg-white flex items-center rounded-md h-[70px] w-[387px]">
            <div className="flex items-center justify-center ml-2.5 bg-red-600 min-h-[44px] max-h-[44px]">
              icon
            </div>
            <div className="p-2 flex flex-col flex-grow">
              <LocationPicker
                onAutocompleteResults={handleAutocompleteResults}
                placeholder="จุดส่ง"
                onInputFocus={() => setActiveInput("B")}
                value={valueB}
                onChange={(value) => handleSetLocationB({ description: value })}
              />
            </div>
          </div>
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
