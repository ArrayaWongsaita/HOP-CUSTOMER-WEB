/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import RiderPopUp from "../components/RiderPopUp";
import MapSection from "../components/MapSection";
import TripStatus from "../components/TripStatus";
import ModalChatNotification from "../features/Order/components/ModalChatNotification";
import LoadScreen from "../components/LoadScreen";
import useSocket from "../hooks/socketIoHook";
import { useParams } from "react-router-dom";




const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function UserOrder() {
  const [route, setRoute] = useState(null);
  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [durationNumber, setDurationNumber] = useState(0); // เพิ่ม state สำหรับ durationNumber
  const navigate = useNavigate(); // ใช้งาน useNavigate


  const {socket, order,setNewOrder,setSocketIoClient } = useSocket()
  const {routeId} = useParams()


  useEffect(() => {
    if (socket) {
      const handleRouteHistory = (data) => {
        console.log(data.status)
        // if (data.status === "PENDING") data.status = 1;
         if (data.status === "ACCEPTED") data.status = 1;
        else if (data.status === "GOING") data.status = 2;
        else if (data.status === "ARRIVED") data.status = 3;
        else if (data.status === "PICKEDUP") data.status = 4;
        else if (data.status === "OTW") data.status = 5;
        // else if (data.status === "Dropoff") data.status = 6.5;
        else if (data.status === "FINISHED") data.status = 6;
        // data.status = 4
        setNewOrder(data);
      };

      socket.on("routeHistory", handleRouteHistory);

      if (!order) {
        socket.emit("requestRouteHistory", { routeId });
      }

      return () => {
        socket.off("routeHistory", handleRouteHistory);
      };
    } else {
      setSocketIoClient();
    }
  }, [socket, routeId, order, setNewOrder, setSocketIoClient]);


  useEffect(() => {
    if (order) {
      const isGoogleMapsLoaded = window.google && window.google.maps;
      if (isGoogleMapsLoaded) {
        if (order.status === 1 || order.status === 2) {
          console.log("status1")
          calculateRoute(order.riderGPS, order.locationA);
        } else if (order.status >= 3) {
          calculateRoute(order.locationA, order.locationB);
        }
      }
    }
  }, [order]);

  const calculateRoute = (origin, destination) => {
    console.log("origin",origin)
    console.log("defaultLocation",destination)
    if (!window.google || !window.google.maps) {
      console.error("Google Maps JavaScript API is not loaded.");
      setTimeout(() => {
        window.location.reload()
      }, 300);
      return;
    }
    if (!origin || !origin.lat || !origin.lng) {
      console.error("Invalid origin:", origin);
      return;
    }
    if (!destination || !destination.lat || !destination.lng) {
      console.error("Invalid destination:", destination);
      return;
    }
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
          console.log(result)
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
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [order?.status, durationNumber]);

  const getTimeValue = () => {
    console.log(durationNumber)
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

  const handleAbort = () => {
    socket.emit("cancelRoute", {routeId})
  }

  return (
    <div className="max-w-[430px] min-w-[430px] h-[862px] relative overflow-hidden">
      {order?.status === "PENDING"  && <LoadScreen onAbort={handleAbort} status="Finding a Rider" button="button"/>}
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
