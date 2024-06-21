import { useState } from "react";

import Input from "./components/Input";
import InputImage from "./components/InputImage";
import Textarea from "./components/Textarea";

import CommonButton from "./components/CommonButton";
import CircleButton from "./components/CircleButton";

function App() {
  const [input, setInput] = useState("");

  const handleInput = (even) => {
    setInput(even.target.value);
  };

  const handelImage = (file) => {
    console.log(file);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-corn gap-14">
      {/* <h1>hop customer web</h1>
      <Input
        name={"firstName"}
        value={input}
        onChange={handleInput}
        placeholder={"First name"}
      />
      <Textarea
        rows={5}
        name={"firstName"}
        value={input}
        onChange={handleInput}
        placeholder={"Text Area"}
        error={"show error"}
      />
      <InputImage width="200px" aspectRatio="1/1" onClick={handelImage}>
        <div className="w-full h-full border-2 rounded-lg flex justify-center items-center">
          Input image
        </div>
      </InputImage> */}
      <div className=" gap-3 flex">
        <CommonButton width="regist" height="regist" fontSize="regist">
          Register
        </CommonButton>
        <CommonButton
          bg="white"
          text="torchRed"
          borderColor="torchRed"
          width="regist"
          height="regist"
          fontSize="regist"
        >
          login
        </CommonButton>
      </div>
      <div className=" gap-3 flex">
        <CommonButton>Close</CommonButton>
        <CommonButton bg="white" text="torchRed" borderColor="torchRed">
          Reply
        </CommonButton>
        <CommonButton
          bg="white"
          text="torchRed"
          borderColor="torchRed"
          width="send"
        >
          Send
        </CommonButton>
      </div>
      <div className="rotate-[-90deg]">
        <CommonButton
          fontSize="accept"
          width="accept"
          height="accept"
          border="accept"
        >
          ACCEPT
        </CommonButton>
      </div>
      <div className="flex gap-3">
        <CircleButton outlineColor="confirm" outlineWidth="confirm">
          Confirm
        </CircleButton>
        <CircleButton
          bg="torchRed"
          width="go"
          height="go"
          borderColor="white"
          fontSize="go"
          fontBold="go"
        >
          GO
        </CircleButton>
        <CircleButton
          bg="white"
          width="arrow"
          height="arrow"
          borderColor="luckyPoint"
          borderSize="arrow"
          text="luckyPoint"
          fontSize="arrow"
          paddingT="arrow"
        >
          &#129104;
        </CircleButton>
      </div>

      {/* <Button
        bg="luckyPoint"
        text="white"
        borderColor="torchRed"
        borderRadius="circle"
        width="circle"
        height="circle"
        fontSize="circle"
        borderSize="circle"
        outlineColor="circle"
        outlineWidth="circle"
      >
        confirm
      </Button> */}
    </div>
  );
}

export default App;
