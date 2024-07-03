import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import RiderPopUp from "../components/RiderPopUp";
import MapSection from "../components/MapSection";
import TripStatus from "../components/TripStatus";
import ModalChatNotification from "../features/Order/components/ModalChatNotification";
import socketIOClient from "socket.io-client";
import { useRef } from "react";
import LoadScreen from "../components/LoadScreen";

const ENDPOINT = import.meta.env.VITE_API_URL;

// const fetchOrder = async () => {

//   return {
//     locationA: {
//       lat: 13.744677,
//       lng: 100.5295593,
//       description:
//         "444 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330 ประเทศไทย",
//     },
//     locationB: {
//       lat: 13.7465337,
//       lng: 100.5391488,
//       description:
//         "centralwOrld, ถนน พระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร ประเทศไทย",
//     },
//     riderGPS: {
//       lat: 13.7583339,
//       lng: 100.5353214,
//     },
//     status: 1,
//     distanceInKm: 4.9,
//     fare: 49,
//     userId: 3,
//     riderName: "John Wick",
//     riderProfilePic: "", // แก้ไขเพื่อส่งโปรไฟล์รูปของผู้ขับขี่
//     telRider: "0987654321",
//   };
// };

function UserOrder() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [order, setOrder] = useState(null);
  const [route, setRoute] = useState(null);
  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [durationNumber, setDurationNumber] = useState(0); // เพิ่ม state สำหรับ durationNumber
  const navigate = useNavigate(); // ใช้งาน useNavigate
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = socketIOClient(ENDPOINT);
      socket.current.on("routeHistory", (routeInfo) => {
        console.log(routeInfo);
        setOrder(routeInfo);
      });
    }
  }, []);

  useEffect(() => {
    if (order) {
      const isGoogleMapsLoaded = window.google && window.google.maps;
      if (isGoogleMapsLoaded) {
        if (order.status === 1 || order.status === 2) {
          calculateRoute(order.riderGPS, order.locationA);
        } else if (order.status >= 3) {
          calculateRoute(order.locationA, order.locationB);
        }
      }
    }
  }, [order]);

  const calculateRoute = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setRoute(result);
          logTravelTime(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  const logTravelTime = (directionsResult) => {
    if (directionsResult.routes.length > 0) {
      const route = directionsResult.routes[0];
      if (route.legs.length > 0) {
        const leg = route.legs[0];
        const durationText = leg.duration.text;
        const durationNumber = parseInt(durationText.match(/\d+/)[0]);
        setDurationNumber(durationNumber);
      }
    }
  };

  useEffect(() => {
    if ((order?.status === 2 || order?.status === 4) && durationNumber > 0) {
      const timer = setInterval(() => {
        setDurationNumber((prevDuration) =>
          prevDuration > 0 ? prevDuration - 1 : 0
        );
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [order?.status, durationNumber]);

  const getTimeValue = () => {
    return durationNumber;
  };

  const getStatusMessage = () => {
    if (order?.status === 3) {
      return "Rider has arrived";
    }
    if (order?.status === 5) {
      return "End of trip";
    }
    if (order?.status === 6) {
      return "End of trip";
    }
    return durationNumber > 0 ? `${durationNumber} Mins` : "Almost there";
  };

  const handleChatClick = () => {
    navigate("/chat/rider");
  };

  useEffect(() => {
    if (order?.status === 6) {
      setTimeout(() => {
        setIsThankYouModalOpen(true);
      }, 1000); // 3 วินาที (3000 มิลลิวินาที)
      setTimeout(() => {
        setIsThankYouModalOpen(false);
        navigate("/");
      }, 3000); //
    }
  }, [order?.status, navigate]);

  return (
    <div className="max-w-[430px] min-w-[430px] h-[862px] relative overflow-hidden">
      {!order?.status && <LoadScreen status="Finding a Rider" />}
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <div>
          <Card>
            <div className="text-[24px]">{getStatusMessage()}</div>
          </Card>
        </div>
        <div className="mt-2">
          <MapSection route={route} height="h-[450px]" />
        </div>
        <div className="mt-2">
          {order && (
            <RiderPopUp
              riderName={order.riderName}
              riderProfilePic={order.riderProfilePic}
              telRider={order.telRider}
              onChatClick={handleChatClick}
            />
          )}
        </div>
        <div>
          {order && <TripStatus status={order.status} time={getTimeValue()} />}
        </div>
        <div className="mt-2"></div>
      </LoadScript>
      {order && (
        <ModalChatNotification
          isOpen={isModalChatOpen}
          onClose={() => setIsModalChatOpen(false)}
          riderName={order.riderName}
          riderProfilePic={order.riderProfilePic}
        />
      )}
      {order?.status === 6 &&
        isThankYouModalOpen && ( // ตรวจสอบว่า status เท่ากับ 6 และ isThankYouModalOpen เป็น true
          <LoadScreen
            isOpen={isThankYouModalOpen}
            text="Thank you for using our service"
          />
        )}
    </div>
  );
}

export default UserOrder;
