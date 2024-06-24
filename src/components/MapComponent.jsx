import React, { useEffect, useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function MapComponent({ locationA, locationB, route }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && locationA) {
      mapRef.current.panTo(locationA);
      console.log("GPS location A:", locationA);
    }
  }, [locationA]);

  useEffect(() => {
    if (mapRef.current && locationB) {
      mapRef.current.panTo(locationB);
      console.log("GPS location B:", locationB);
    }
  }, [locationB]);

  useEffect(() => {
    if (route) {
      console.log("Route details:", route);
    }
  }, [route]);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onError = (error) => {
    console.error("เกิดข้อผิดพลาดในการโหลดแผนที่:", error);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={locationA || { lat: 0, lng: 0 }}
      zoom={14}
      onLoad={onLoad}
      onError={onError}
    >
      {locationA && <Marker position={locationA} />}
      {locationB && <Marker position={locationB} />}
      {route && <DirectionsRenderer directions={route} />}
    </GoogleMap>
  );
}

export default React.memo(MapComponent);
