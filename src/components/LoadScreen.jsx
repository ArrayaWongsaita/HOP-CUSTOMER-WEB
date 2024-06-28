import { useState, useEffect } from "react";
import { LogoHop } from "../icons";

const LoadScreen = ({ status, text }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!text) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [text]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#2E3E6F] from-0% to-[#000000] to-100%">
      <div className="absolute top-1/3 ml-8">
        <LogoHop />
      </div>
      {text ? (
        <div className="absolute  mt-10 w-full flex items-center justify-center text-center">
          <p className="text-xl text-center text-white mt-2">{text}</p>
        </div>
      ) : (
        status && (
          <div className="absolute  mt-10 w-full flex items-center justify-center text-center">
            <p className="text-xl text-center text-white mt-2">
              {status} {dots}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default LoadScreen;
