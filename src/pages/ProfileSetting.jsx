import { PersonImg } from "../icons";

export default function ProfileSetting() {
  return (
    <div className="flex items-center justify-center flex-col">
      <header className="flex items-center  h-[70px] w-full bg-gradient-to-r from-[#FF004D] from-40% to-[#1D2B53] to-70% text-[24px] font-bold text-white pl-2">
        profile Setting
      </header>

      <div
        role="button"
        className="flex items-center justify-center w-[145px] h-[145px] border-[1px] border-[#FF004D] rounded-[16px] mt-[9px]"
      >
        <PersonImg />
      </div>

      <div className="flex items-center justify-between mt-[23px] text w-[165px] text-[20px] font-bold">
        <button className="text-[#FF004D]">Edit</button>
        <p className="text-[#FF004D]">|</p>
        <button className="text-[#FF004D]">Cancel</button>
      </div>
      <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

      <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]">First Name: </h2>
        <h2 className="text-white">firstName</h2>
      </div>

      <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]">Last Name: </h2>
        <h2 className="text-white"> lasttName </h2>
      </div>
      <div className="flex items-center justify-between mt-[23px] text w-[165px] text-[20px] font-bold">
        <button className="text-[#FF004D]">Edit</button>
        <p className="text-[#FF004D]">|</p>
        <button className="text-[#FF004D]">Cancel</button>
      </div>

      <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

      <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]">Phone:</h2>
        <h2 className="text-white"> mobile</h2>
      </div>
      <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]">Email:</h2>
        <h2 className="text-white"> Email</h2>
      </div>
      <div className="flex items-center justify-between mt-[23px]  w-[165px] text-[20px] font-bold">
        <button className="text-[#FF004D]">Edit</button>
        <p className="text-[#FF004D]">|</p>
        <button className="text-[#FF004D]">Cancel</button>
      </div>
      <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

      <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]"> Current password :</h2>
        <h2 className="text-white">password</h2>
      </div>

      <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]"> New password :</h2>
        <h2 className="text-white"> password</h2>
      </div>
      <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]"> Confirm password :</h2>
        <h2 className="text-white"> password</h2>
      </div>
      <div className="flex items-center justify-between mt-[23px]  w-[165px] text-[20px] font-bold">
        <button className="text-[#FF004D]">Edit</button>
        <p className="text-[#FF004D]">|</p>
        <button className="text-[#FF004D]">Cancel</button>
      </div>
      <hr className=" border border-[#FF004D] mt-[31px] w-[85%] my-4" />
    </div>
  );
}
