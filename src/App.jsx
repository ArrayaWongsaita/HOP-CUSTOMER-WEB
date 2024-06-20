import { useState } from "react";

import Input from "./components/Input";
import InputImage from "./components/InputImage";
import Textarea from "./components/Textarea";

function App() {
  const [input, setInput] = useState('');

  const handleInput = (even) => {
    setInput(even.target.value);
  };

  const handelImage = (file) => {
    console.log(file);
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1>hop customer web</h1>
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
      <InputImage 
      width="200px"
      aspectRatio="1/1"
      onClick={handelImage}>
        <div className="w-full h-full border-2 rounded-lg flex justify-center items-center">Input image</div>
      </InputImage>
    </div>
  );
}

export default App;
