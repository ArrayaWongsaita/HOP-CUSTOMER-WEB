import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom"; // import useNavigate
import Card from "../components/Card";
import RiderPopUp from "../components/RiderPopUp";
import MapSection from "../components/MapSection";
import TripStatus from "../components/TripStatus";
import ModalChatNotification from "../features/Order/components/ModalChatNotification";
import socketIOClient from "socket.io-client";
import { useRef } from "react";
import { Routes } from "react-router-dom";

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
  const [mapHeight, setMapHeight] = useState("max-h-[455px]");
  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
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

  // ฟังก์ชันเพื่อ log ระยะเวลาในการเดินทางและตัดคำว่า "นาที" ออก
  const logTravelTime = (directionsResult) => {
    if (directionsResult.routes.length > 0) {
      const route = directionsResult.routes[0];
      if (route.legs.length > 0) {
        const leg = route.legs[0];
        const durationText = leg.duration.text;
        const durationNumber = parseInt(durationText.match(/\d+/)[0]);
        setDurationNumber(durationNumber); // อัปเดต state ของ durationNumber
      }
    }
  };

  // ลดเวลาลงตามจริงเมื่อ status เป็น 2 หรือ 4
  useEffect(() => {
    if ((order?.status === 2 || order?.status === 4) && durationNumber > 0) {
      const timer = setInterval(() => {
        setDurationNumber((prevDuration) =>
          prevDuration > 0 ? prevDuration - 1 : 0
        );
      }, 1000); // 60000 มิลลิวินาที = 1 นาที

      return () => clearInterval(timer);
    }
  }, [order?.status, durationNumber]);

  // เปลี่ยนฟังก์ชัน getTimeValue เพื่อใช้ durationNumber เสมอ
  const getTimeValue = () => {
    return durationNumber;
  };

  const getStatusMessage = () => {
    if (order?.status === 3) {
      return "ไรเดอร์ถึงแล้ว";
    }
    if (order?.status === 5) {
      return "สิ้นสุดการเดินทาง";
    }
    return durationNumber > 0 ? `${durationNumber} นาที` : "ใกล้ถึงแล้ว";
  };

  // ฟังก์ชันสำหรับการนำทางไปยัง Google Maps
  const handleChatClick = () => {
    navigate("/chat/rider");
  };

  return (
    <div className="max-w-[430px] min-w-[430px] h-[862px] relative overflow-hidden">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <div>
          {/* แสดงสถานะตามสถานะของ order */}
          <Card>{getStatusMessage()}</Card>
        </div>
        <div className="mt-2">
          {/* ส่ง locationA และ locationB ไปยัง MapSection */}
          <MapSection
            locationA={order?.locationA}
            locationB={order?.locationB}
            route={route}
            height="h-[450px]"
          />
        </div>
        <div className="mt-2">
          {/* ส่งชื่อและโปรไฟล์ของผู้ขับขี่ไปยัง RiderPopUp */}
          {order && (
            <RiderPopUp
              riderName={order.riderName}
              riderProfilePic={order.riderProfilePic}
              telRider={order.telRider} // เพิ่มหมายเลขโทรศัพท์ของผู้ขับขี่
              onChatClick={handleChatClick} // ส่งฟังก์ชัน handleChatClick เป็น prop
            />
          )}
        </div>
        <div>
          {order && <TripStatus status={order.status} time={getTimeValue()} />}
          {/* ใช้ getTimeValue */}
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
    </div>
  );
}

export default UserOrder;
