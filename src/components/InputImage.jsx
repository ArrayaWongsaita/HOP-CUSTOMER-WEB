import { useState } from "react";
import { useRef } from "react";

export default function InputImage({
  children,
  onClick,
  width = "150px",
  aspectRatio = "1/1",
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileEl = useRef();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onClick(file); // Call onClick after setting state
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <input
        ref={fileEl}
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <div
        onClick={() => fileEl.current.click()}
        style={{
          backgroundImage: `url(${selectedImage})`,
          width: `${width}`,
          aspectRatio: `${aspectRatio}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: 'no-repeat',
        }}
        className="flex justify-center items-center"
      >
        {!selectedImage && children}
      </div>
    </>
  );
}
