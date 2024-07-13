/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
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
import ChatContainer from "../features/chat/components/ChatContainer";
import ModalCommon from "../components/ModalCommon";
import CommonButton from "../components/CommonButton";


const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
let chatOpen = false;

function UserOrder() {
  const [route, setRoute] = useState(null);
  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [durationNumber, setDurationNumber] = useState(0); // เพิ่ม state สำหรับ durationNumber
  const [riderInfo, setRiderInfo] = useState(null)
  const navigate = useNavigate(); // ใช้งาน useNavigate

  const [chatAdminId, setChatAdminId] = useState(null);
  const [messagesAdmin, setMessagesAdmin] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const { socket, order, setNewOrder, setSocketIoClient } = useSocket();
  const { routeId } = useParams();
  const [modalTelephone, setModalTelephone] = useState(false);
  const [isChatAdminOpen, setIsChatAdminOpen] = useState(false);


  useEffect(() => {
    if (socket) {
      const handleRouteHistory = (data) => {
        if (data.status === "PENDING" && data?.chatInfo) {
          return;
        }
        if(data.rider){
          setRiderInfo(data.rider)
        }
        if (data?.chatInfo) {
          setChatId(data.chatInfo.id);
          socket.emit("joinChat", { chatId: data.chatInfo.id });
        }
        switch (data.status) {
          case "ACCEPTED":
            data.status = 1;
            break;
          case "PICKINGUP":
            data.status = 2;
            break;
          case "ARRIVED":
            data.status = 3;
            break;
          case "PICKEDUP":
            data.status = 4;
            break;
          case "DELIVERING":
            data.status = 5;
            break;
          case "FINISHED":
            data.status = 6;
            break;
          default:
            console.log("Unknown status");
        }
        setNewOrder(data);
      };

      socket.on("routeHistory", handleRouteHistory);

      if (!order || !chatId) {
        socket.emit("requestRouteHistory", { routeId });
      }
      return () => {
        socket.off("routeHistory", handleRouteHistory);
      };
    } else {
      setSocketIoClient();
    }
  }, [socket]);

  // ---------- chat -------------------
  useEffect(() => {
    if (socket && chatId) {
      const handleChatHistory = (messages) => {
        setMessages(messages);
      };
      const handleNewMessage = (message) => {
        if (!chatOpen) {
          setIsModalChatOpen(true);
        }
        setMessages((messages) =>
          messages.filter((item) => item.senderRole !== "TYPING")
        );
        setMessages((messages) => [...messages, message]);
      };
      const handleTyping = ({ role }) => {
        if (role !== "USER") {
          setMessages((messages) => {
            const newMessages = messages.filter(
              (item) => item.senderRole !== "TYPING"
            );
            return [
              ...newMessages,
              { senderRole: "TYPING", content: "message" },
            ];
          });
          setTimeout(() => {
            setMessages((messages) =>
              messages.filter((item) => item.senderRole !== "TYPING")
            );
          }, 5000);
        }
      };
      socket.emit("joinChat", { chatId });
      socket.on("chatHistory", handleChatHistory);
      socket.on("newMessage", handleNewMessage);
      socket.on("typing", handleTyping);
      return () => {
        socket.off("chatHistory", handleChatHistory);
        socket.off("newMessage", handleNewMessage);
        socket.off("typing", handleTyping);
      };
    }
  }, [chatId, socket]);

  useEffect(()=>{
    if(socket){
        const handleChatAdminId = (data) =>{
          setChatAdminId(data.id)
          if(data?.messages){
            setMessagesAdmin(data.messages);
          }
        }
      socket.on("chatAdminInfo",handleChatAdminId)

      if(chatAdminId){
        const handleNewMessageAdmin = (message) => {
          setMessagesAdmin((messagesAdmin) =>
            messagesAdmin.filter((item) => item.senderRole !== "TYPING")
          );
          setMessagesAdmin((messages) => [...messages, message]);
        };
        socket.on("newMessageAdmin", handleNewMessageAdmin);
        return () => {
          socket.off("chatAdminId",handleChatAdminId)
        }
      }
    }
  },[socket , chatAdminId])

  const handleChatClick = () => {
    setIsChatOpen((isChatOpen) => !isChatOpen);
    chatOpen = true;
  };
  const handleChatClose = () => {
    setIsChatOpen(false);
    chatOpen = false;
  };

  const handleChatAdminClick = () => {
    if(!chatAdminId){
      socket.emit("chatToAdmin")
    }
    setIsChatAdminOpen(true);
    chatOpen = true;
  };
  const handleChatAdminClose = () => {
    setIsChatAdminOpen(false);
    chatOpen = false;
  };

  // ----------end chat -------------------

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
    if (!window.google || !window.google.maps) {
      console.error("Google Maps JavaScript API is not loaded.");
      setTimeout(() => {
        window.location.reload();
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

  useEffect(() => {
    if (order?.status === 6) {
      setTimeout(() => {
        setIsThankYouModalOpen(true);
      }, 1000); // 3 วินาที (3000 มิลลิวินาที)
      setTimeout(() => {
        setIsThankYouModalOpen(false);
        socket.emit("leaveRoute", { routeId });
        socket.emit("leaveChat", { chatId });
        if(chatAdminId){
          socket.emit("leaveChat", { chatAdminId });
        }
        navigate("/");
      }, 3000); //
    }
  }, [order?.status, navigate]);

  const handleAbort = () => {
    socket.emit("cancelRoute", { routeId });
  };
  const handleModalTelClose = useCallback((confirmedTel) => {
    setModalTelephone(false);
    if (confirmedTel) {
      window.location.href = "tel:"+riderInfo?.phone; // หมายเลขโทรศัพท์ที่ต้องการโทรออก
    }
  }, []);


  const handleButtonTelClick = useCallback(() => {
    setModalTelephone(true);
  }, []);
  return (
    <>
      <div className=" w-full h-full overflow-hidden">
        {order?.status === "PENDING" && (
          <LoadScreen
            onAbort={handleAbort}
            status="Finding a Rider"
            button="button"
          />
        )}
        {isChatOpen && (
          <ChatContainer
          chatWithInfo={riderInfo}
            messages={messages}
            socket={socket}
            chatId={chatId}
            closeChat={handleChatClose}
            senderId={order.customerId}
          />
        )}
        {isChatAdminOpen && (
          <ChatContainer
            messages={messagesAdmin}
            socket={socket}
            chatId={chatAdminId}
            closeChat={handleChatAdminClose}
            senderId={order.customerId}
            chatWith="Admin"
          />
        )}
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
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
                riderProfilePic={riderInfo?.profileImage}
                onChatClick={handleChatClick}
                onClickChatAdmin={handleChatAdminClick}
                onClickTelUser={handleButtonTelClick}
              />
            )}
          </div>
          <div className="">
            {order && (
              <TripStatus status={order.status} time={getTimeValue()} />
            )}
          </div>
          <div className="mt-2"></div>
        </LoadScript>

        {order && (
          <ModalChatNotification
            isOpen={isModalChatOpen}
            openChat={handleChatClick}
            onClose={() => setIsModalChatOpen(false)}
            message={messages[messages.length - 1]?.content}
            riderName={order.riderName}
            riderProfilePic={order.riderProfilePic}
          />
        )}
        <ModalCommon
          isOpen={modalTelephone}
          onClose={() => handleModalTelClose(false)}
        >
          <p>{`tel ${riderInfo?.phone}`}</p>
          <div className="flex w-full items-center justify-between">
            <CommonButton onClick={() => handleModalTelClose(true)}>
              Yes
            </CommonButton>
            <CommonButton onClick={() => handleModalTelClose(false)}>
              No
            </CommonButton>
          </div>
        </ModalCommon>
        {order?.status === 6 &&
          isThankYouModalOpen && ( // ตรวจสอบว่า status เท่ากับ 6 และ isThankYouModalOpen เป็น true
            <LoadScreen
              isOpen={isThankYouModalOpen}
              text="Thank you for using our service"
            />
          )}
      </div>
    </>
  );
}

export default UserOrder;
