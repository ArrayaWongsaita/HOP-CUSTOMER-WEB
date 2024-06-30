import { IconCall } from "../icons/IconCall";
import { IconChat } from "../icons/IconChat";
import { IconRider } from "../icons/IconRider";

export default function RiderPopUp() {
  return (
    <div className="border-4 border-white w-screen h-[27%] rounded-[14px] flex  items-center justify-center px-2">
      <div className="w-[35%] flex justify-center items-center h-full">
        <div className="border-[3px] border-torchRed rounded-[14px] h-[51%] w-[79%] flex items-center justify-center">
          <IconRider width="riderCall" />
        </div>
      </div>
      <div className="w-[65%] flex flex-col gap-4">
        <div className=" text-white text-[32px] font-semibold text-center">
          John Wick
        </div>
        <div className="flex justify-evenly">
          <IconCall />
          <IconChat />
        </div>
      </div>
    </div>
  );
}
