import AdminIcon from "../icons/AdminIcon";
import { IconCall } from "../icons/IconCall";
import { IconChat } from "../icons/IconChat";
import { IconRider } from "../icons/IconRider";

export default function RiderPopUp({
  riderName,
  riderProfilePic,
  onChatClick,
  onClickChatAdmin,
  onClickTelUser,
}) {
  return (
    <div className="border-4 border-white w-screen h-[150px] rounded-[14px] flex items-center justify-center px-2">
      <div className="w-[35%] flex justify-center items-center h-full">
        <div className="border-[3px] border-torchRed rounded-[14px] min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] flex items-center justify-center">
          {/* แสดงโปรไฟล์ของผู้ขับขี่ */}
          {riderProfilePic ? (
            <img
              src={riderProfilePic}
              alt={riderName}
              className="rounded-full h-full"
            />
          ) : (
            <IconRider width="riderCall" />
          )}
        </div>
      </div>
      <div className="w-[65%] flex flex-col gap-4">
        <div className="text-white text-[32px] font-semibold text-center">
          {riderName}
        </div>
        <div className="flex justify-evenly">
          <div onClick={onClickTelUser}>
            <IconCall />
          </div>
          <div onClick={onChatClick}>
            <IconChat />
          </div>
          <dev onClick={onClickChatAdmin}>
            <AdminIcon />
          </dev>
        </div>
      </div>
    </div>
  );
}
