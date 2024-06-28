import CommonButton from "./CommonButton";
import CommonInput from "./CommonInput";
import { IconRider } from "../icons/IconRider";

const heightContent = {
  popUp: "h-[42%]",
  msg: "h-3/4",
};

const msgHeightContent = {
  popUp: "h-[calc(100%_-100px_-25%)]",
  msg: "h-[calc(100%_-100px_-15%)]",
};

const messageContent = {
  popUp: (
    <div className="w-fit max-w-[394px] h-[60px]  bg-white flex items-center text-[21px] text-luckyPoint rounded-[14px] p-2 gap-2">
      <div className=" font-bold flex">
        Name<div> :</div>
      </div>
      <div className="font-semibold">I'm on the way !</div>
    </div>
  ),
  msg: <div className="text-white">message</div>,
};

const footerContent = {
  popUp: (
    <div className="flex justify-around h-[25%]">
      <CommonButton width="close" height="close">
        Close
      </CommonButton>
      <CommonButton
        bg="white"
        text="torchRed"
        borderColor="torchRed"
        width="close"
        height="close"
      >
        Reply
      </CommonButton>
    </div>
  ),
  msg: (
    <div className="flex justify-evenly h-[15%]">
      <CommonInput start="text" width="msg" height="msg" />
      <CommonButton
        bg="white"
        text="torchRed"
        borderColor="torchRed"
        width="sendMsg"
        height="sendMsg"
      >
        Send
      </CommonButton>
    </div>
  ),
};

export default function RiderHeaderContent({
  children,
  height = "popUp",
  footer = "popUp",
  msgHeight = "popUp",
  message = "popUp",
}) {
  return (
    <div
      className={`border-4 border-white w-screen ${heightContent[height]} rounded-[14px] flex flex-col gap-2 px-2`}
    >
      <div className="h-[100px] flex items-center justify-evenly">
        <div className="border-2 border-torchRed rounded-[14px] h-[85%] aspect-square flex items-center justify-center">
          <IconRider />
        </div>
        <div className=" basis-3/5 text-right text-white text-[32px] font-semibold">
          John Wick
        </div>
      </div>
      <div
        className={`${msgHeightContent[msgHeight]} flex justify-center items-center`}
      >
        {messageContent[message]}
      </div>
      {footerContent[footer]}

      {children}
    </div>
  );
}
