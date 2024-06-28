import { RiderIcon } from "../icons";
import IconPerson from "../icons/IconPerson";

export default function Card({ children }) {
  return (
    <div className="flex justify-center">
      <div className=" bg-white w-[84%] h-[110px] flex items-center rounded-[14px] gap-7 justify-center">
        <RiderIcon width="riderCall" />
        <div className="text-torchRed font-bold border-b-4 border-dotted border-torchRed w-[39%] text-[28px] text-center mb-6">
          {children}
        </div>
        <IconPerson />
      </div>
    </div>
  );
}
