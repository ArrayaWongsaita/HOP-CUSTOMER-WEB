const bgBtn = {
  torchRed: "bg-torchRed hover:bg-white",
  white: "bg-white hover:bg-torchRed",
};

const textBtn = {
  torchRed: "text-torchRed hover:text-white",
  white: "text-white hover:text-torchRed",
};

const widthBtn = {
  reply: "w-[124px]",
  regist: "w-[138px]",
  send: "w-[82px]",
  accept: "w-[157px]",
};

const heightBtn = {
  reply: "h-[60px]",
  regist: "h-[50px]",
  accept: "h-[63px]",
};

const borderColorBtn = {
  torchRed: "border-torchRed hover:border-white",
  white: "border-white hover:border-torchRed",
  none: "border-none",
};

const borderWidthBtn = {
  common: "border-2",
  accept: "border-4",
};

const fontSizeBtn = {
  reply: "text-[24px]",
  regist: "text-[16px]",
  accept: "text-[30px]",
};

export default function CommonButton({
  children,
  bg = "torchRed",
  text = "white",
  width = "reply",
  height = "reply",
  borderColor = "white",
  borderWidth = "common",
  fontSize = "reply",
}) {
  return (
    <button
      className={`${bgBtn[bg]} ${textBtn[text]} ${widthBtn[width]} ${heightBtn[height]} border ${borderWidthBtn[borderWidth]} ${borderColorBtn[borderColor]} rounded-[14px] px-1 py-1.5 ${fontSizeBtn[fontSize]} font-semibold`}
    >
      {children}
    </button>
  );
}
