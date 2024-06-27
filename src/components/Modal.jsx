import React from "react";

const Modal = ({ inputVisible, children }) => {
  return (
    <div
      className={`absolute bottom-[0px] w-full ${
        inputVisible
          ? "bg-gradient-to-br from-[#FF004D] from-20% to-[#1D2B53] to-85%"
          : "bg-gradient-to-br from-[#FF004D] from-50% to-[#1D2B53] to-95%"
      } rounded-t-xl border border-white transition-transform duration-500 ${
        inputVisible ? "top-[px] h-[860px]" : "bottom-0 h-[430px]"
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
