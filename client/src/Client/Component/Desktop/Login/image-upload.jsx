import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file); // แสดงรูปที่เลือกทันที
      setImages([...newImages]);

      const formData = new FormData();
      formData.append("images", file);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.filePath) {
          newImages[index] = response.data.filePath; // ใช้ URL จริงเมื่ออัปโหลดสำเร็จ
          setImages([...newImages]);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 flex justify-center">
          <label className="w-48 h-48 border-2 border-dashed border-blue-400 flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
            {images[0] ? (
              <img src={images[0]} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-blue-500">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 0)}
            />
          </label>
        </div>
        {images.slice(1).map((image, index) => (
          <label
            key={index + 1}
            className="w-32 h-32 border-2 border-dashed border-blue-400 flex items-center justify-center cursor-pointer rounded-lg overflow-hidden"
          >
            {image ? (
              <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-blue-500">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, index + 1)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
