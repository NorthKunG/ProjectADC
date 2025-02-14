import { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

const ImageUpload = () => {
  const [images, setImages] = useState([null, null, null, null]);

  // ✅ เพิ่ม: เก็บไฟล์รูปภาพเพื่อใช้ตอนอัปโหลด
  // const [files, setFiles] = useState([null, null, null, null]);

  // const [loading, setLoading] = useState(false);

  const handleImageChange = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      return;
    }

    // // ✅ เพิ่ม: เก็บ URL ของรูปที่เลือกไว้เพื่อแสดงตัวอย่าง
    // const objectUrl = URL.createObjectURL(file);
    // setImages((prevImages) => {
    //   const newImages = [...prevImages];
    //   newImages[index] = objectUrl;
    //   return newImages;
    // });

    // ✅ เพิ่ม: เก็บไฟล์จริงไว้ใน `files` เพื่อส่งไป Backend
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = file;
      return newFiles;
    });
  };

  // ✅ เพิ่ม: ฟังก์ชันอัปโหลดรูปไปที่ API `/api/uploadImages`
  // const handleUpload = async () => {
  //   if (!files.some((file) => file)) {
  //     alert("กรุณาเลือกรูปภาพก่อนอัปโหลด");
  //     return;
  //   }

  //   setLoading(true);
  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     if (file) formData.append("images", file);
  //   });

  //   try {
  //     const response = await fetch("http://localhost:3000/api/uploadImages", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert("อัปโหลดรูปภาพสำเร็จ!");
  //       console.log("✅ Uploaded files:", data.files);
  //     } else {
  //       alert(`❌ อัปโหลดล้มเหลว: ${data.message}`);
  //     }
  //   } catch (error) {
  //     alert("❌ เกิดข้อผิดพลาดในการอัปโหลด");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleClearImages = () => {
    setImages([null, null, null, null]);
    setFiles([null, null, null, null]); // ✅ เพิ่ม: ล้างค่าของไฟล์ที่เลือก
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center gap-6 p-1 py-5 bg-gray-100 rounded-2xl">
        {/* รูปใหญ่ตรงกลาง */}
        <div className="flex justify-center">
          <label className="w-48 h-48 border-2 border-dashed bg-white border-blue-400 flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
            {images[0] ? (
              <img src={images[0]} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <span className="text-9xl text-blue-500">+</span>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 0)} />
          </label>
        </div>

        {/* 3 รูปด้านล่าง */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full max-w-md justify-center">
          {[1, 2, 3].map((index) => (
            <label key={index} className="border-2 border-dashed bg-white border-blue-400 flex items-center justify-center cursor-pointer rounded-lg overflow-hidden w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-38 lg:h-40">
              {images[index] ? (
                <img src={images[index]} alt="Uploaded" className="w-full h-full object-cover" />
              ) : (
                <span className="text-7xl text-blue-500">+</span>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, index)} />
            </label>
          ))}
        </div>

        <div className="w-full flex justify-between">
          <button onClick={handleClearImages} className="bg-red-500 text-white rounded hover:bg-red-600 transition-all px-5 py-3 lg:px-4 lg:py-2 md:px-3 md:py-1 sm:px-1 sm:py-1 text-lg lg:text-base md:text-sm sm:text-xs">
            ล้างรูปที่อัปโหลด
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImageUpload;
