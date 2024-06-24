import React from "react";

const Modal = ({ inputVisible, children }) => {
  return (
    <div
      className={`absolute w-full ${
        inputVisible
          ? "bg-gradient-to-br from-[#FF004D] from-20% to-[#1D2B53] to-85%"
          : "bg-gradient-to-br from-[#FF004D] from-50% to-[#1D2B53] to-85%"
      } rounded-t-xl border border-white transition-transform duration-500 ${
        inputVisible ? "top-[70px] h-[calc(100%-70px)]" : "bottom-0 h-[430px]"
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
