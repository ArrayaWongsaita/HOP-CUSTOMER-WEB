import React from "react";

const Modal = ({ inputVisible, children }) => {
  return (
    <div
      className={`absolute w-full bg-red-400 rounded-t-xl border border-white transition-transform duration-500 ${
        inputVisible ? "top-[70px] h-[calc(100%-70px)]" : "bottom-0 h-[430px]"
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
