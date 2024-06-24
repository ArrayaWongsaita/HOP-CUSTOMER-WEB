import React from "react";

const ConfirmOrder = ({ inputVisible, children }) => {
  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full">
          <button
            onClick={() => {
              console.log("Input visibility toggled:", inputVisible);
            }}
          >
            <div className="p-2 w-[430px] flex items-center justify-center">
              <div className="bg-white h-[4px] w-[52px]"></div>
            </div>
          </button>
        </div>
        <div className="rounded-lg w-[387px]"></div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
