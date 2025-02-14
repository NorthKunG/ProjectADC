import { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

const categories = ["กล้องวงจรปิด", "แผงโซล่าเซลล์", "ระบบเน็ตเวิร์ค"];
const sets = ["เซตบ้าน", "โรงงาน"];

const AddPromotionPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSet, setSelectedSet] = useState("เซตบ้าน");
  const [name, setName] = useState(""); // เพิ่ม state สำหรับชื่อโปรโมชั่น
  const [images, setImages] = useState([null, null, null, null]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleImageChange = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = objectUrl;
      return newImages;
    });
  };

  const handleClearImages = () => {
    setImages([null, null, null, null]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ามีการกรอกชื่อโปรโมชั่นหรือไม่
    if (!name) {
      alert("กรุณากรอกชื่อโปรโมชั่น!");
      return;
    }

    // ข้อมูลที่ต้องการส่งไปยัง Backend
    const data = {
      name: name, // ชื่อโปรโมชั่น
      categories: selectedCategories,  // ข้อมูลประเภทสินค้า
      set: selectedSet,  // ข้อมูลเซตสินค้า
      images: images.filter((image) => image !== null), // ส่งเฉพาะรูปที่ถูกอัปโหลด
    };

    // ดึง Token จาก LocalStorage (สมมติว่าเก็บไว้ที่นี่)
    const token = localStorage.getItem('token'); 

    try {
      // ส่งข้อมูลไปยัง Backend
      const response = await fetch("http://localhost:3000/api/promotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // ส่ง token ใน header
        },
        body: JSON.stringify(data),  // ส่งข้อมูลในรูปแบบ JSON
      });

      if (response.ok) {
        alert("บันทึกโปรโมชั่นสำเร็จ!");
      } else {
        const errorData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full mx-auto rounded-t-2xl shadow-2xl bg-white overflow-hidden">
        <form className="max-w-full mx-auto p-6 bg-white rounded shadow-lg" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6">จัดเซตโปรโมชั่น</h2>

          {/* ✅ Section: ชื่อโปรโมชั่น */}
          <div className="mb-4">
            <label className="font-semibold block mb-2">ชื่อโปรโมชั่น</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // รับค่า input
              className="border rounded p-2 w-full"
              placeholder="กรุณากรอกชื่อโปรโมชั่น"
            />
          </div>

          {/* ✅ Section: เลือกประเภทโปรโมชั่น */}
          <div className="mb-4">
            <label className="font-semibold block mb-2">เลือกประเภท</label>
            <div className="flex flex-wrap gap-2 justify-start">
              {categories.map((category) => (
                <label
                  key={category}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer text-sm sm:text-base w-auto min-w-[150px] max-w-[200px] text-center ${
                    selectedCategories.includes(category)
                      ? "bg-gray-500 text-white border-gray-600"
                      : "bg-gray-200 text-black border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="hidden"
                  />
                  <span className="w-5 h-5 flex items-center justify-center border border-black bg-white">
                    {selectedCategories.includes(category) && (
                      <span className="text-black">✔</span>
                    )}
                  </span>
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* ✅ Section: เลือกเซตสินค้า */}
          <div className="mb-4">
            <label className="font-semibold block mb-2">เซตสินค้า</label>
            <div className="flex flex-wrap gap-3 justify-start">
              {sets.map((set) => (
                <label
                  key={set}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer text-sm sm:text-base w-auto min-w-[100px] text-center ${
                    selectedSet === set
                      ? "bg-white border-gray-600 text-black"
                      : "bg-gray-100 border-gray-300 text-black"
                  }`}
                >
                  <input
                    type="radio"
                    value={set}
                    checked={selectedSet === set}
                    onChange={() => setSelectedSet(set)}
                    className="hidden"
                  />
                  <span className="w-5 h-5 flex items-center justify-center border border-gray-500 rounded-full">
                    {selectedSet === set && (
                      <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                    )}
                  </span>
                  {set}
                </label>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6">รูปสินค้า</h3>
          <div className="flex flex-col items-baseline gap-6 p-10 py-5 bg-gray-100 rounded-2xl">
            {/* รูปใหญ่ตรงกลาง */}
            <div className="flex justify-center">
              <label className="w-48 h-48 border-2 border-dashed bg-white border-blue-400 flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
                {images[0] ? (
                  <img
                    src={images[0]}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-9xl text-blue-500">+</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 0)}
                />
              </label>
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={handleClearImages}
                className="bg-red-500 text-white rounded hover:bg-red-600 transition-all px-5 py-3 lg:px-4 lg:py-2 md:px-3 md:py-1 sm:px-1 sm:py-1 text-lg lg:text-base md:text-sm sm:text-xs"
              >
                ล้างรูปที่อัปโหลด
              </button>
            </div>
          </div>

          {/* ปุ่มบันทึก */}
          <button
            type="submit"
            className="bg-green-500 text-white rounded hover:bg-green-600 transition-all px-5 py-3 lg:px-4 lg:py-2 md:px-3 md:py-1 sm:px-1 sm:py-1 text-lg lg:text-base md:text-sm sm:text-xs"
          >
            บันทึกข้อมูล
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddPromotionPage;
