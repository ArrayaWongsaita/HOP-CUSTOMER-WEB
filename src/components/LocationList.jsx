import useCustomer from "../hooks/customerHook";
import { IconLocation } from "../icons/IconLocation";
import { IconTime } from "../icons/IconTime";

const LocationList = ({
  locations,
  expanded,
  onSelectLocation,
  // inputVisible,
  
}) => {
  
  const { routeHistory } = useCustomer()
  
const  defaultLocations = routeHistory.map(item => ({ description:item.desPlace}))
  // defaultLocations = [
  //   { description: "Recent Location 1" },
  //   { description: "Recent Location 2" },
  //   { description: "Recent Location 3" },
  //   { description: "Recent Location 4" },
  // ]
  const isUsingDefaultLocations = locations.length === 0;

  const handleSelectLocation = async (location) => {
    if (location.place_id) {
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
            // console.log("Location selected:", selectedLocation);
            onSelectLocation(selectedLocation);
          } else {
            console.error("Error fetching place details:", status);
            onSelectLocation({
              description: location.description || location.formatted_address,
            });
          }
        }
      );
    } else {
      onSelectLocation({
        description: location.description || location.formatted_address,
      });
    }
  };

  const locationsToDisplay = isUsingDefaultLocations
    ? defaultLocations
    : locations;

  return (
    <div className="">
      <div className="mt-2">Travel Options</div>
      <div
        className={`bg-white rounded-lg overflow-y-auto transition-all duration-500 flex flex-col ${
          expanded ? "max-h-[630px]" : "max-h-[296px]"
        }`}
      >
        {locationsToDisplay.map((location, index) => (
          <div key={index} className="bg-white p-[2px] rounded-2xl">
            <button
              className="flex items-center rounded-md h-[70px] w-full"
              onClick={() => handleSelectLocation(location)}
            >
              <div className="bg-gradient-to-r from-[#516293] from-0% to-[#1D2B53] to-100% flex items-center rounded-md h-[70px] w-full">
                <div className="flex items-center justify-center ml-2 min-h-[44px] max-h-[44px] min-w-[44px] max-w-[44px]">
                  {!isUsingDefaultLocations ? <IconLocation /> : <IconTime />}
                </div>
                <div className="p-2 flex flex-col flex-grow justify-center items-start text-white">
                  <p className="line-clamp-2 text-left">
                    {location.description}
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
