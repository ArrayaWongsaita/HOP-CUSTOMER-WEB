import React from "react";
import CircleButton from "./CircleButton";

const ConfirmOrder = ({ locationB, duration, distance, onBackButtonClick }) => {
  return (
    <div>
      <div className="w-full items-center justify-center flex">
        <div
          className="bg-white w-[387px] h-[70px] absolute top-[-400px] border border-black rounded-lg p-4 flex items-center"
          onClick={onBackButtonClick}
        >
          <div className="flex items-center justify-center bg-red-600 min-h-[56px] max-h-[56px] min-w-[56px] max-w-[56px] rounded-full cursor-pointer">
            back
          </div>
          <div className="flex items-center ml-2.5 text-[24px] w-[280px] max-h-[80px] overflow-hidden truncate whitespace-nowrap">
            {locationB || "Location B"}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full">
          <div className="p-2 w-[430px] flex items-center justify-center">
            <div className="bg-white h-[4px] w-[52px]"></div>
          </div>
        </div>

        <div className="relative rounded-t-lg w-[387px] h-[250px] bg-white flex items-start mt-[20px]">
          <div className="text-left flex flex-grow p-4 mt-[20px] w-[185px]">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="self-end w-full text-right text-[24px] mb-[-10px]">
                Est
              </div>
              <div className="self-center w-full text-center text-[60px]">
                {duration}
              </div>
              <div className="self-start w-full text-left text-[24px] mt-[-10px]">
                Time
              </div>
            </div>
          </div>
          <div className="w-[17px] flex items-center justify-center mt-[10px]">
            <div className="bg-pink-400 w-[8px] h-[150px]"></div>
          </div>
          <div className="text-right flex flex-grow p-4 mt-[20px] w-[185px]">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="self-start w-full text-left text-[24px] mb-[-10px]">
                Fee
              </div>
              <div className="self-center w-full text-center text-[60px] ">
                {distance}
              </div>
              <div className="self-end w-full text-right text-[24px] mt-[-10px]">
                Distance
              </div>
            </div>
          </div>
          <div className="absolute bottom-[-80px] flex w-full items-center justify-center">
            <CircleButton outlineColor="confirm" outlineWidth="confirm">
              Confirm
            </CircleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
