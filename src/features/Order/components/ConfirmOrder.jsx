import { useEffect, useState, useContext } from "react";
import CircleButton from "../../../components/CircleButton";
import { IconArrowLeft } from "../../../icons/IconArrowLeft";
import { CustomerContext } from "../../../contexts/CustomerContext"; // Import context
import useSocket from "../../../hooks/socketIoHook";
import { useNavigate } from "react-router-dom";

function ConfirmOrder({
  locationA,
  locationB,
  duration,
  distance,
  onBackButtonClick,
}) {
  const { socket, setNewOrder } = useSocket();
  const navigate = useNavigate(); // ใช้ useNavigate
  const [durationInMinutes, setDurationInMinutes] = useState(0);
  const [distanceInKm, setDistanceInKm] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // เพิ่ม state สำหรับการโหลด
  const { customerUser } = useContext(CustomerContext); // ใช้ useContext เพื่อดึงข้อมูล user

  useEffect(() => {
    const handleRouteHistory = (newRoute) => {
      setNewOrder(newRoute);
      navigate(`/route/${newRoute.id}`);
      socket.off("routeHistory", handleRouteHistory); // ยกเลิกการรับฟังหลังจาก navigate
    };
    socket.on("routeHistory", handleRouteHistory);
    return () => {
      socket.off("routeHistory", handleRouteHistory);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const parseDuration = (durationStr) => {
      let totalMinutes = 0;
      const hourMinuteParts = durationStr.match(
        /(\d+)\s*ชั่วโมง\s*(\d*)\s*นาที/
      );
      const hourOnlyParts = durationStr.match(/(\d+)\s*ชั่วโมง/);
      const minuteOnlyParts = durationStr.match(/(\d+)\s*นาที/);

      if (hourMinuteParts) {
        const hours = parseInt(hourMinuteParts[1], 10);
        const minutes = parseInt(hourMinuteParts[2], 10) || 0;
        totalMinutes = hours * 60 + minutes;
      } else if (hourOnlyParts) {
        const hours = parseInt(hourOnlyParts[1], 10);
        totalMinutes = hours * 60;
      } else if (minuteOnlyParts) {
        const minutes = parseInt(minuteOnlyParts[1], 10);
        totalMinutes = minutes;
      }

      return totalMinutes;
    };

    const parseDistance = (distanceStr) => {
      return +distanceStr.slice(0, -3);
    };
    setDurationInMinutes(+duration.slice(0, -4));
    setDistanceInKm(parseDistance(distance));
  }, [duration, distance]);

  const handleConfirm = () => {
    setIsLoading(true); // เริ่มการโหลด
    const fare = distanceInKm < 3 ? 30 : distanceInKm * 10;

    const order = {
      userId: customerUser.id, // เพิ่ม id ของผู้ใช้ใน order
      locationA,
      locationB,
      distanceInKm,
      durationInMinutes,
      fare,
    };
    socket.emit("newRoute", order);
  };

  return (
    <div className="">
      <div className="w-full items-center justify-center flex ">
        <div
          className="bg-white w-[387px] h-[70px] absolute top-[-400px] border border-black rounded-lg p-4 flex items-center"
          onClick={onBackButtonClick}
        >
          <div className="flex items-center justify-center border-black border-2 min-h-[56px] max-h-[56px] min-w-[56px] max-w-[56px] rounded-full cursor-pointer">
            <IconArrowLeft />
          </div>

          <div className="flex items-center ml-2.5 text-[24px] w-[280px] max-h-[80px] overflow-hidden truncate whitespace-nowrap">
            {locationB.description || "Location B"}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full"></div>

        <div className="relative rounded-t-lg w-[387px] h-[250px] bg-white flex items-start mt-[50px]">
          <div className="text-left flex flex-grow p-4 mt-[20px] w-[185px]">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="self-end w-full text-left text-[24px] mb-[-10px] text-[#FF004D]">
                Est
              </div>
              <div className="self-center w-full text-center text-[38px] text-[#FF004D] flex items-end justify-center">
                <div className="flex-1 text-right font-bold">
                  {durationInMinutes}
                </div>
                <div className=" text-left text-[15px]">min</div>
              </div>

              <div className="self-center w-full text-center text-[38px] text-[#FF004D] flex items-end justify-center">
                <div className="flex-1 text-right font-bold ">
                  {distanceInKm}
                </div>
                <div className="text-left text-[15px]">
                  km<span className="text-[12px] invisible">-</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[17px] flex items-center justify-center mt-[10px]">
            <div className="bg-torchRed w-[8px] h-[150px]"></div>
          </div>
          <div className="text-right flex flex-grow p-4 mt-[20px] w-[185px]">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="self-start w-full text-left text-[24px] mb-[-10px] text-[#FF004D]">
                Fee
              </div>
              <div className="self-center w-full text-center text-[60px] text-[#FF004D] ">
                {/* {distanceInKm} */}
                {+distanceInKm * 10}
              </div>
              <div className="self-end w-full text-right text-[24px] mt-[-10px] text-[#FF004D]">
                {/* Distance (km) */}
                THB
              </div>
            </div>
          </div>
          <div className="absolute bottom-[-80px] flex w-full items-center justify-center">
            <CircleButton
              outlineColor="confirm"
              outlineWidth="confirm"
              onClick={handleConfirm}
            >
              Confirm
            </CircleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
