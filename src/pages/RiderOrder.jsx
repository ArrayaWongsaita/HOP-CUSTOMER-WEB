import { useState, useEffect, useCallback } from "react";
import { LoadScript } from "@react-google-maps/api";
import MapSection from "../components/MapSection";
import { reverseGeocode } from "../utils/geocodeUtils";
import CommonButton from "../components/CommonButton";
import ModalCommon from "../components/ModalCommon";
import { AdminIcon, CallIcon, ChatIcon } from "../icons";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * ดึงข้อมูล order จาก backend
 * @returns {Object} ข้อมูล order
 */
const fetchOrder = async () => {
  // จำลองการดึงข้อมูลจาก backend
  return {
    distanceInKm: 4.9,
    durationInMinutes: 15,
    fare: 49,
    locationA: {
      lat: 13.744677,
      lng: 100.5295593,
      description:
        "444 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330 ประเทศไทย",
    },
    locationB: {
      lat: 13.7465337,
      lng: 100.5391488,
      description:
        "centralwOrld, ถนน พระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร ประเทศไทย",
    },
    userId: 3,
  };
};

const RiderOrder = () => {
  const [riderGPS, setRiderGPS] = useState({ start: "Your location" });
  const [route, setRoute] = useState(null);
  const [buttonText, setButtonText] = useState("ฉันมาถึงแล้ว");
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  // ดึงข้อมูล order เมื่อ component ถูก mount
  useEffect(() => {
    const initializeOrder = async () => {
      try {
        const fetchedOrder = await fetchOrder();
        setOrder(fetchedOrder);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูล order ได้");
      }
    };

    initializeOrder();
  }, []);

  // ตั้งค่าตำแหน่งปัจจุบันของ rider
  useEffect(() => {
    const setCurrentLocation = async () => {
      if (!order) return;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const placeName = await reverseGeocode(
              currentLocation,
              GOOGLE_MAPS_API_KEY
            );
            setRiderGPS({ ...currentLocation, description: placeName });
            calculateRoute(currentLocation, order.locationA);
          } catch (err) {
            console.error("เกิดข้อผิดพลาดในการดึงตำแหน่งปัจจุบัน:", err);
            setRiderGPS((prev) => ({ ...prev, start: "Unknown Location" }));
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("เกิดข้อผิดพลาดในการดึงตำแหน่งปัจจุบัน:", error);
          setRiderGPS((prev) => ({ ...prev, start: "Unknown Location" }));
          setLoading(false);
        }
      );
    };

    setCurrentLocation();
  }, [order]);

  /**
   * คำนวณเส้นทางระหว่างต้นทางและปลายทาง
   * @param {Object} origin - ตำแหน่งเริ่มต้น
   * @param {Object} destination - ตำแหน่งปลายทาง
   */
  const calculateRoute = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setRoute(result);
        } else {
          console.error(`เกิดข้อผิดพลาดในการดึงข้อมูลเส้นทาง: ${result}`);
        }
      }
    );
  };

  /**
   * จัดการคลิกปุ่มนำทาง
   */
  const handleNavigate = useCallback(() => {
    if (!order || !riderGPS) return;

    const getNavigateUrl = () => {
      if ((step === 0 || step === 1) && order.locationA) {
        return `https://www.google.com/maps/dir/?api=1&origin=${riderGPS.lat},${riderGPS.lng}&destination=${order.locationA.lat},${order.locationA.lng}&travelmode=driving`;
      }
      if (step === 2 && order.locationA && order.locationB) {
        return `https://www.google.com/maps/dir/?api=1&origin=${order.locationA.lat},${order.locationA.lng}&destination=${order.locationB.lat},${order.locationB.lng}&travelmode=driving`;
      }
      return "";
    };

    const navigateUrl = getNavigateUrl();
    if (navigateUrl) {
      window.open(navigateUrl, "_blank");
    }
  }, [step, riderGPS, order]);

  /**
   * จัดการคลิกปุ่มหลัก
   */
  const handleButtonClick = useCallback(() => {
    if (step === 0) {
      setButtonText("รับผู้โดยสารแล้ว");
      setStep(1);
    } else if (step === 1 || step === 2) {
      setModalVisible(true);
    }
  }, [step]);

  /**
   * จัดการปิด modal
   * @param {boolean} confirmed - ยืนยันการกระทำหรือไม่
   */
  const handleModalClose = useCallback(
    (confirmed) => {
      setModalVisible(false);
      if (confirmed && order) {
        if (step === 1) {
          setButtonText("ส่งผู้โดยสารสำเร็จ");
          calculateRoute(order.locationA, order.locationB);
          setStep(2);
        } else if (step === 2) {
          alert("พาไปหน้าถัดไป");
          setButtonText("พาไปหน้าถัดไป");
          setStep(3);
        }
      }
    },
    [step, order]
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Loading order...</div>;
  }

  return (
    <div className="flex flex-col min-h-[862px]">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <OrderDetails order={order} />
        <MapSectionWrapper loading={loading} route={route} />
        <NavigationButton onClick={handleNavigate} />
        <FareDetails
          order={order}
          buttonText={buttonText}
          onClick={handleButtonClick}
        />
        <FooterIcons />
        <ModalCommon
          isOpen={modalVisible}
          onClose={() => handleModalClose(false)}
        >
          <p>{buttonText} ?</p>
          <div className="flex w-full items-center justify-between">
            <CommonButton onClick={() => handleModalClose(true)}>
              Yes
            </CommonButton>
            <CommonButton onClick={() => handleModalClose(false)}>
              No
            </CommonButton>
          </div>
        </ModalCommon>
      </LoadScript>
    </div>
  );
};

/**
 * แสดงรายละเอียด order
 * @param {Object} order - ข้อมูล order
 */
const OrderDetails = ({ order }) => (
  <div className="p-4 m-4 rounded-lg shadow-lg min-h-[150px] flex border-white text-white border-[2px]">
    <div className="bg-slate-500">logo</div>
    <div className="flex flex-col justify-between w-full ml-2">
      <OrderDetailLine description="Your Location" />
      <OrderDetailLine description={order.locationA.description} />
      <OrderDetailLine description={order.locationB.description} />
    </div>
  </div>
);

/**
 * แสดงบรรทัดรายละเอียด order
 * @param {string} description - คำอธิบายของรายละเอียด order
 */
const OrderDetailLine = ({ description }) => (
  <div className="border-b-2 max-w-[320px] min-w-[320px]">
    <p className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
      {description}
    </p>
  </div>
);

/**
 * คอมโพเนนต์ห่อสำหรับส่วนของแผนที่
 * @param {boolean} loading - สถานะการโหลด
 * @param {Object} route - ข้อมูลเส้นทาง
 */
const MapSectionWrapper = ({ loading, route }) => (
  <div className="flex-grow relative max-h-[500px]">
    {loading ? (
      <div className="flex items-center justify-center h-full">
        <div>Loading...</div>
      </div>
    ) : (
      <MapSection route={route} />
    )}
  </div>
);

/**
 * ปุ่มนำทาง
 * @param {function} onClick - ฟังก์ชันจัดการคลิกของปุ่ม
 */
const NavigationButton = ({ onClick }) => (
  <div className="relative">
    <div className="absolute w-full flex items-center justify-center min-h-[80px] top-[-120px]">
      <CommonButton onClick={onClick}>นำทาง</CommonButton>
    </div>
  </div>
);

/**
 * แสดงรายละเอียดค่าโดยสาร
 * @param {Object} order - ข้อมูล order
 * @param {string} buttonText - ข้อความของปุ่มหลัก
 * @param {function} onClick - ฟังก์ชันจัดการคลิกของปุ่มหลัก
 */
const FareDetails = ({ order, buttonText, onClick }) => (
  <div className="w-full flex items-center justify-center min-h-[80px] p-4 border-white text-white border-[2px]">
    <div className="w-full flex flex-col">
      <FareDetailLine label="Fare" value={`${order.fare} THB.`} />
      <FareDetailLine label="Distance" value={`${order.distanceInKm} Km.`} />
    </div>
    <div className="flex items-center w-full">
      <CommonButton onClick={onClick} width="riderStatus">
        {buttonText}
      </CommonButton>
    </div>
  </div>
);

/**
 * แสดงบรรทัดรายละเอียดค่าโดยสาร
 * @param {string} label - ป้ายของรายละเอียดค่าโดยสาร
 * @param {string} value - ค่าของรายละเอียดค่าโดยสาร
 */
const FareDetailLine = ({ label, value }) => (
  <div className="flex w-full">
    <div className="min-w-[80px]">{label}: </div>
    <div>{value}</div>
  </div>
);

/**
 * แสดงไอคอนในส่วนท้าย
 */
const FooterIcons = () => (
  <div className="flex justify-around bg-gray-800 p-4 text-white max-h-[85px] min-h-[85px]">
    <FooterIcon icon={<CallIcon />} />
    <FooterIcon icon={<ChatIcon />} />
    <FooterIcon icon={<AdminIcon />} />
  </div>
);

/**
 * แสดงไอคอนเดี่ยวในส่วนท้ายพร้อมป้ายกำกับ
 * @param {Object} icon - คอมโพเนนต์ไอคอน
 * @param {string} label - ป้ายกำกับสำหรับไอคอน
 */
const FooterIcon = ({ icon, label }) => (
  <div>
    {icon} {label}
  </div>
);

export default RiderOrder;
