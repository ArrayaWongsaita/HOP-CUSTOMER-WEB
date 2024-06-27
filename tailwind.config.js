/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit-minmax-255": "repeat(auto-fit, minmax(255px, 1fr))",
      },
      fontFamily: {
        sans: ["Amiko", "sans-serif"], // ตั้งค่าฟอนต์
      },
      colors: {
        customBeige: "#f8f4ed",
        luckyPoint: "#1d2b53",
        torchRed: "#ff004d",
        gainsboro: "#dbdbdb",
        corn: "#faef5d",
      },
      keyframes: {
        dots: {
          "0%, 20%": { content: "' '" },
          "40%": { content: "'.'" },
          "60%": { content: "'..'" },
          "80%, 100%": { content: "'...'" },
        },
      },
      animation: {
        dots: "dots 1.5s steps(1, end) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
