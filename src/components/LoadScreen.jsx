// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // เพิ่มการ import useNavigate
// import CommonButton from "./CommonButton";
// import { IconLogoHop } from "../icons/IconLogoHop";

// const LoadScreen = ({ status, text, onAbort }) => {
//   const [dots, setDots] = useState("");
//   const navigate = useNavigate(); // สร้างตัวแปร navigate

//   useEffect(() => {
//     if (!text) {
//       const interval = setInterval(() => {
//         setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
//       }, 500);
//       return () => clearInterval(interval);
//     }
//   }, [text]);

//   const handleAbort = () => {
//     if (onAbort) {
//       onAbort();
//     }
//     console.log("cancle");
//     navigate("/"); // นำทางไปยังหน้าแรก
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#2E3E6F] from-0% to-[#000000] to-100%">
//       <div className="absolute top-1/3 ml-8">
//         <IconLogoHop />
//       </div>
//       {text ? (
//         <div className="absolute  mt-5 w-full flex items-center justify-center text-center">
//           <p className="text-xl text-center text-white mt-2">{text}</p>
//         </div>
//       ) : (
//         status && (
//           <div className="absolute  mt-5 w-full flex items-center justify-center text-center">
//             <p className="text-xl text-center text-white mt-2">
//               {status} {dots}
//             </p>
//           </div>
//         )
//       )}
//       <div className="mt-[350px]">
//         <CommonButton width="accept" fontSize="regist" onClick={handleAbort}>
//           abort request
//         </CommonButton>
//       </div>
//     </div>
//   );
// };

// export default LoadScreen;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่มการ import useNavigate
import CommonButton from "./CommonButton";
import { IconLogoHop } from "../icons/IconLogoHop";

const LoadScreen = ({ status, text, onAbort, button }) => {
  // เพิ่ม prop button
  const [dots, setDots] = useState("");
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  useEffect(() => {
    if (!text) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [text]);

  const handleAbort = () => {
    if (onAbort) {
      onAbort();
    }
    console.log("cancel");
    navigate("/"); // นำทางไปยังหน้าแรก
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#2E3E6F] from-0% to-[#000000] to-100%">
      <div className="absolute top-1/3 ml-8">
        <IconLogoHop />
      </div>
      {text ? (
        <div className="absolute  mt-5 w-full flex items-center justify-center text-center">
          <p className="text-xl text-center text-white mt-2">{text}</p>
        </div>
      ) : (
        status && (
          <div className="absolute  mt-5 w-full flex items-center justify-center text-center">
            <p className="text-xl text-center text-white mt-2">
              {status} {dots}
            </p>
          </div>
        )
      )}
      {button && ( // เพิ่มเงื่อนไขในการโชว์ปุ่ม
        <div className="mt-[350px]">
          <CommonButton width="accept" fontSize="regist" onClick={handleAbort}>
            abort request
          </CommonButton>
        </div>
      )}
    </div>
  );
};

export default LoadScreen;
