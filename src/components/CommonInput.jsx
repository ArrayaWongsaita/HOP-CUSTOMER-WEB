const borderColorCommonInput = {
  none: "border-none",
  luckyPoint: "border-luckyPoint",
};

const borderWidthForInput = {
  none: "border-0",
  border: "border-2 border-l-0",
};

const borderWidthForStart = {
  none: "border-0",
  border: "border-2 border-r-0",
};

const widthCommonInput = {
  places: "w-[317px]",
  text: "w-[204px]",
};

const heightCommonInput = {
  places: "h-[70px]",
  text: "h-[60px]",
};

const placeholderInput = {
  whereTo: "placeholder-luckyPoint",
  common: "placeholder-transparent",
};

const startInput = {
  text: "You:",
  common: "icon",
};

export default function CommonInput({
  children,
  borderColor = "none",
  borderWidthInput = "none",
  borderWidthStart = "none",
  width = "places",
  height = "places",
  placeholder = "common",
  start = "common",
}) {
  return (
    <div className="flex">
      <div
        className={`bg-white rounded-l-[14px] ${heightCommonInput[height]} w-[70px] font-semibold text-[24px] flex justify-center items-center text-luckyPoint border ${borderColorCommonInput[borderColor]} ${borderWidthForStart[borderWidthStart]}`}
      >
        {startInput[start]}
      </div>
      <input
        type="text"
        placeholder="Where to?"
        className={`${widthCommonInput[width]} ${heightCommonInput[height]} border ${borderColorCommonInput[borderColor]} ${borderWidthForInput[borderWidthInput]} outline-none py-2 pr-2 rounded-r-[14px] ${placeholderInput[placeholder]} text-[24px] text-luckyPoint`}
      >
        {children}
      </input>
    </div>
  );
}
