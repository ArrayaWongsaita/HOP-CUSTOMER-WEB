import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function PictureForm({ onSave, render, initialImage }) {
  const fileEl = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleClickSave = async () => {
  //   try {
  //     if (file) {
  //       setLoading(true);
  //       await onSave(file);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-[145px] h-[145px] border-[1px] border-[#FF004D] rounded-[16px] mt-[9px]">
        {loading}
        <input
          type="file"
          ref={fileEl}
          className="hidden "
          onChange={(e) => {
            if (e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        {render(file ? URL.createObjectURL(file) : initialImage)}
      </div>

      {/* <div className="flex items-center justify-center mt-[23px] text w-[165px] text-[20px] font-bold gap-2">
        {file && (
          <>
            <button className="text-[#FF004D]" onClick={handleClickSave}>
              Save
            </button>
            <p className="text-[#FF004D]">|</p>
            <button
              className="text-[#FF004D]"
              onClick={() => {
                setFile(null);
                fileEl.current.value = "";
              }}
            >
              Cancel
            </button>
            <p className="text-[#FF004D]">|</p>
          </>
        )}
        <button
          className="text-[#FF004D] text-[20px] font-bold  flex items-center justify-center"
          onClick={() => fileEl.current.click()}
        >
          Edit
        </button>
       </div> */}
    </div>
  );
}
