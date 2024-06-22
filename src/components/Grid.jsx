import ClockIcon from "../assets/Icon";

export default function Grid() {
  return (
    <div className=" grid grid-flow-row auto-rows-max bg-white rounded-[14px]">
      <div className=" w-[387px] h-[80px] bg-gradient-to-r from-kashmirBlue to-luckyPoint rounded-[14px] border-white border-[3px] flex items-center">
        <div className=" w-[70px] h-[70px] flex items-center justify-center">
          <ClockIcon />
        </div>
        <div className="flex flex-col justify-center">
          <div className=" text-white font-semibold text-[20px]">place</div>
          <div className="text-white text-[16px]">address</div>
        </div>
      </div>
      <div className=" w-[387px] h-[80px] bg-gradient-to-r from-kashmirBlue to-luckyPoint rounded-[14px] border-white border-[3px]">
        2
      </div>
      <div className=" w-[387px] h-[80px] bg-gradient-to-r from-kashmirBlue to-luckyPoint rounded-[14px] border-white border-[3px]">
        3
      </div>
      <div className=" w-[387px] h-[80px] bg-gradient-to-r from-kashmirBlue to-luckyPoint rounded-[14px] border-white border-[3px]">
        4
      </div>
    </div>
  );
}
