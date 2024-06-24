import React from "react";

const LocationList = ({ locations, expanded, onSelectLocation }) => {
  const defaultLocations = [
    { description: "บ้าน", formatted_address: "บ้าน" },
    { description: "ทีทำงาน", formatted_address: "ทีทำงาน" },
    { description: "โรงเรียน", formatted_address: "โรงเรียน" },
    { description: "ศูนย์การค้า", formatted_address: "ศูนย์การค้า" },
  ];

  const handleSelectLocation = async (location) => {
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    placesService.getDetails(
      {
        placeId: location.place_id,
        fields: ["geometry"],
      },
      (placeResult, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const selectedLocation = {
            lat: placeResult.geometry.location.lat(),
            lng: placeResult.geometry.location.lng(),
            description: location.description || location.formatted_address,
          };
          console.log("Location selected:", selectedLocation);
          onSelectLocation(selectedLocation);
        } else {
          console.error("Error fetching place details:", status);
          onSelectLocation({
            description: location.description || location.formatted_address,
          });
        }
      }
    );
  };

  const locationsToDisplay =
    locations.length > 0 ? locations : defaultLocations;

  return (
    <div className="">
      <div className="mt-2">ผลลัพธ์การค้นหา</div>
      <div
        className={`bg-white rounded-lg overflow-y-auto transition-all duration-500 flex flex-col ${
          expanded ? "max-h-[630px]" : "max-h-[290px]"
        }`}
      >
        {locationsToDisplay.map((location, index) => (
          <div key={index} className="bg-white p-[2px] rounded-2xl">
            <button
              className="bg-sky-800 flex items-center rounded-md h-[70px] w-full"
              onClick={() => handleSelectLocation(location)}
            >
              <div className="bg-sky-800 flex items-center rounded-md h-[70px]">
                <div className="flex items-center justify-center ml-2 bg-green-300 min-h-[44px] max-h-[44px] min-w-[44px] max-w-[44px]">
                  icon
                </div>
                <div className="p-2 flex flex-col flex-grow justify-center text-white">
                  <p className="line-clamp-2">
                    {location.description || location.formatted_address}
                  </p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
