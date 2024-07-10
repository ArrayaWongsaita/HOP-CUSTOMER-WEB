import { useState } from "react";
import useCustomer from "../hooks/customerHook";
import { IconPersonImg } from "../icons/IconPersonImg";
import PictureForm from "../components/PictureForm";
import CommonButton from "../components/CommonButton";
import { toast } from "react-toastify";

export default function ProfileSetting() {
  const { customerUser, updateName, updatePassword } = useCustomer();
  console.log(customerUser);

  const initialName = {
    firstName: customerUser?.firstName,
    lastName: customerUser?.lastName,
  };

  // const handleUpdateCusImage = async (file) => {
  //   const formData = new FormData();
  //   formData.append("cusImage", file);
  //   await updateCusProfile(formData);
  // };

  const [editName, setEditName] = useState(false);
  const [formNameValues, setFormNameValues] = useState(initialName);
  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setFormNameValues({ ...formNameValues, [name]: value });
  };
  const handleEditClickName = () => {
    setEditName(true);
  };
  const handleCancelClickName = () => {
    setEditName(false);
    setFormNameValues(initialName);
  };

  const [editPassword, setEditPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleEditPasswordClick = () => {
    setEditPassword(true);
  };
  const handleCancelPasswordClick = () => {
    setEditPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (editName) {
      try {
        await updateName(formNameValues.firstName, formNameValues.lastName);
        toast.success("Name updated successfully");
        setEditName(false);
      } catch (err) {
        toast.error("Failed to update name");
      }
    }
    if (editPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("New password do not match");
        return;
      }
      try {
        await updatePassword(currentPassword, newPassword);
        toast.success("Password updated successfully");
        setEditPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err) {
        toast.error("Failed to update password");
      }
    }
  };

  return (
    <form
      className="flex items-center justify-center flex-col"
      onSubmit={handleSubmitForm}
    >
      <header className="flex items-center  h-[70px] w-full bg-gradient-to-r from-[#FF004D] from-40% to-[#1D2B53] to-70% text-[24px] font-bold text-white pl-2">
        Profile Setting
      </header>

      <PictureForm render={(src) => <IconPersonImg src={src} />} />

      <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />
      {editName ? (
        <>
          <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
            <h2 className="text-[#FF004D]">First Name: </h2>
            <input
              type="text"
              name="firstName"
              value={formNameValues.firstName}
              onChange={handleChangeName}
              className="text-white bg-transparent px-2 focus:outline-none focus:ring-1 focus:ring-corn focus:rounded-md w-[60%]"
            />
          </div>

          <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
            <h2 className="text-[#FF004D]">Last Name: </h2>
            <input
              type="text"
              name="lastName"
              value={formNameValues.lastName}
              onChange={handleChangeName}
              className="text-white bg-transparent px-2 focus:outline-none focus:ring-1 focus:ring-corn focus:rounded-md w-[60%]"
            />
          </div>

          <button
            className="text-[#FF004D] text-[20px] font-bold mt-[23px]"
            onClick={handleCancelClickName}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
            <h2 className="text-[#FF004D]">First Name: </h2>
            <h2 className="text-white">{customerUser?.firstName}</h2>
          </div>

          <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
            <h2 className="text-[#FF004D]">Last Name: </h2>
            <h2 className="text-white"> {customerUser?.lastName} </h2>
          </div>

          <button
            className="text-[#FF004D] text-[20px] font-bold mt-[23px]"
            onClick={handleEditClickName}
          >
            Edit
          </button>
        </>
      )}
      <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

      <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]">Phone:</h2>
        <h2 className="text-white"> {customerUser?.phone}</h2>
      </div>
      <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
        <h2 className="text-[#FF004D]">Email:</h2>
        <h2 className="text-white"> {customerUser?.email}</h2>
      </div>

      <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

      {editPassword ? (
        <>
          <div className="flex  gap-[10px] mt-[36px] text-[20px] font-bold flex-col">
            <h2 className="text-[#FF004D]"> New password :</h2>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-white bg-transparent px-2 focus:outline-none focus:ring-1 focus:ring-corn focus:rounded-md"
            />
          </div>

          <div className="flex  gap-[10px] text-[20px] font-bold flex-col">
            <h2 className="text-[#FF004D]"> Confirm New Password :</h2>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-white bg-transparent px-2 focus:outline-none focus:ring-1 focus:ring-corn focus:rounded-md"
            />
          </div>
          <button
            className="text-[#FF004D] text-[20px] font-bold mt-[23px]"
            onClick={handleCancelPasswordClick}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
            <h2 className="text-[#FF004D]"> Current Password :</h2>
            <h2 className="text-white">{currentPassword}</h2>
          </div>

          <div className="flex items-center justify-between mt-[23px]  w-[165px] text-[20px] font-bold">
            <button
              className="text-[#FF004D]"
              onClick={handleEditPasswordClick}
            >
              Edit
            </button>
            <p className="text-[#FF004D]">|</p>
            <button
              className="text-[#FF004D]"
              onClick={handleCancelPasswordClick}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      <hr className=" border border-[#FF004D] mt-[31px] w-[85%] my-4" />
      <CommonButton type="submit" height="regist">
        Confirm
      </CommonButton>
    </form>
  );
}
