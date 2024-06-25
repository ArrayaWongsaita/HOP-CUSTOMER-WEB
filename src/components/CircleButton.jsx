const bgBtn = {
  torchRed: "bg-torchRed hover:bg-white",
  white: "bg-white hover:bg-luckyPoint",
  luckyPoint: "bg-luckyPoint hover:bg-white",
};

const textBtn = {
  luckyPoint: "text-luckyPoint hover:text-white",
  white: "text-white hover:text-torchRed",
};

const widthBtn = {
  confirm: "w-[156px]",
  go: "w-[88px]",
  arrow: "w-[56px]",
};

const heightBtn = {
  confirm: "h-[156px]",
  go: "h-[88px]",
  arrow: "h-[56px]",
};

const borderColorBtn = {
  torchRed: "border-torchRed hover:border-luckyPoint",
  white: "border-white hover:border-black",
  luckyPoint: "border-luckyPoint hover:border-white",
};

const fontSizeBtn = {
  confirm: "text-[20px]",
  go: "text-[32px]",
  arrow: "text-[34px]",
};

const fontBoldBtn = {
  common: "font-semibold",
  go: "font-bold",
};

const borderSizeBtn = {
  common: "border-[6px]",
  arrow: "border-[3px]",
};

const outlineColorBtn = {
  common: "outline-none",
  confirm: "outline-white",
};

const outlineWidthBtn = {
  common: "outline-0",
  confirm: "outline-4",
};

const paddingTBtn = {
  common: "pt-0",
  arrow: "pt-1.5",
};

export default function CircleButton({
  children,
  bg = "luckyPoint",
  text = "white",
  width = "confirm",
  height = "confirm",
  borderColor = "torchRed",
  fontSize = "confirm",
  fontBold = "common",
  borderSize = "common",
  outlineColor = "common",
  outlineWidth = "common",
  paddingT = "common",
  onClick, // เพิ่มการรองรับ onClick
}) {
  return (
    <button
      className={`${bgBtn[bg]} ${textBtn[text]} ${widthBtn[width]}  border ${borderSizeBtn[borderSize]} ${borderColorBtn[borderColor]} rounded-full px-1 py-1 ${paddingTBtn[paddingT]} ${fontSizeBtn[fontSize]} ${fontBoldBtn[fontBold]} ${outlineColorBtn[outlineColor]} outline ${outlineWidthBtn[outlineWidth]} ${heightBtn[height]} flex items-center justify-center text-center font`}
      onClick={onClick} // เพิ่มการรองรับ onClick
    >
      {children}
    </button>
  );
}
