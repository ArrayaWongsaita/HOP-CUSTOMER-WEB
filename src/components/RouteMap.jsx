import React, { useEffect, useRef } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function RouteMap({ route }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && route) {
      mapRef.current.fitBounds(route.routes[0].bounds);
    }
  }, [route]);

  const onError = (error) => {
    console.error("เกิดข้อผิดพลาดในการโหลดแผนที่:", error);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={route?.routes[0]?.overview_path[0] || { lat: 0, lng: 0 }}
      zoom={15}
      onLoad={(map) => (mapRef.current = map)}
      onError={onError}
    >
      {route && <DirectionsRenderer directions={route} />}
    </GoogleMap>
  );
}

export default React.memo(RouteMap);
