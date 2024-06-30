import { IconLogoHop } from "../icons/IconLogoHop";
import CommonButton from "./CommonButton";

const RegisterModal = ({ show, onClose, message }) => {
  if (!show) return null;
  return (
    <div>
      <div className="absolute w-[430px] h-[932px] top-[-280px] left-[-22px] bg-gradient-to-br from-[#1D2B53] from-40% to-[#FF004D] to-80% transition-transform duration-500 z-50">
        <div className="w-[100%] h-[30%] font-extrabold flex justify-center items-center pl-8 pb-9">
          <IconLogoHop />
        </div>
        <div className="w-full items-center justify-center ">
          <div className="flex flex-col items-center text-white mt-[100px] gap-4">
            <p>ยินดีต้อนรับ! </p>
            <p>การลงทะเบียนของคุณเสร็จสมบูรณ์ </p>
            <p>กรุณาเข้าสู่ระบบ</p>
          </div>
          <div className="w-full flex items-center justify-center mt-48">
            <CommonButton onClick={onClose}>close</CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
