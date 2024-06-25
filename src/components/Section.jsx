export default function Section({ children }) {
  return (
    <div
      className="w-full h-[70px] flex items-center justify-end p-4 mb-5
            font-semibold text-xl text-white
            bg-gradient-to-r from-[#1D2B53] from-50% to-[#FF004D] to-100% "
    >
      {children}
    </div>
  );
}
