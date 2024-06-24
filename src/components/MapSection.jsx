import MapComponent from "./MapComponent";

const MapSection = ({ locationA, locationB, route }) => (
  <div className="flex justify-center items-center bg-slate-400">
    <div className="w-full max-h-[410px] min-h-[497px] bg-slate-200 flex items-center justify-center overflow-hidden">
      <MapComponent locationA={locationA} locationB={locationB} route={route} />
    </div>
  </div>
);

export default MapSection;
