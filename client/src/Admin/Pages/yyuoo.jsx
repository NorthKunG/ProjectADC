import { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import SearchProductList from "./TTT";

const categories = ["กล้องวงจรปิด", "แผงโซล่าเซลล์", "ระบบเน็ตเวิร์ค"];
const sets = ["เซตบ้าน", "โรงงาน"];

const AddPromotionPage = () => {
  const [promotionName, setPromotionName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSet, setSelectedSet] = useState("เซตบ้าน");
  const [addedProducts, setAddedProducts] = useState([]);
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [images, setImages] = useState([null, null, null, null]);
  const token = localStorage.getItem("token") || "";


  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("❌ กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น!");
      return;
    }

    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file; // เก็บ `File` ไว้ใน State
      return newImages;
    });
  };

  const handleClearImages = () => {
    setImages([null, null, null, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!promotionName.trim()) {
      alert("❌ กรุณากรอกชื่อโปรโมชั่น!");
      return;
    }
  
    if (addedProducts.length === 0) {
      alert("❌ กรุณาเพิ่มสินค้าในโปรโมชั่นก่อน!");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", promotionName);
    formData.append("price", promotionPrice || "0"); // ป้องกัน `undefined`
  
    addedProducts.forEach((product, index) => {
      formData.append(`products[${index}][productId]`, product._id);
      formData.append(`products[${index}][quantity]`, product.quantity || 1);
    });
  
    images.forEach((file) => {
      if (file) formData.append("image", file);
    });
  
    // ✅ **เช็คค่าก่อนส่ง API**
    console.log("📌 ตรวจสอบข้อมูลก่อนส่ง API:", Object.fromEntries(formData.entries()));
  
    try {
      const response = await fetch("http://localhost:3000/api/promotions", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      console.log("📌 API Response:", result);
  
      if (!response.ok) {
        throw new Error(result.message || "เกิดข้อผิดพลาดในการบันทึกโปรโมชั่น");
      }
  
      alert("✅ บันทึกโปรโมชั่นสำเร็จ!");
      setAddedProducts([]);
      setPromotionName("");
      setSelectedCategories([]);
      setSelectedSet("เซตบ้าน");
      setPromotionPrice("");
      setImages([null, null, null, null]);
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
      console.error("❌ บันทึกโปรโมชั่นล้มเหลว:", error);
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
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="ใส่ชื่อโปรโมชั่น..."
              value={promotionName}
              onChange={(e) => setPromotionName(e.target.value)}
            />
          </div>

          {/* ✅ Section: เลือกประเภทโปรโมชั่น (Checkbox) */}
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
                    {selectedCategories.includes(category) && <span className="text-black">✔</span>}
                  </span>
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* ✅ Section: เลือกเซตสินค้า (Radio) */}
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
                    {selectedSet === set && <span className="w-3 h-3 bg-gray-500 rounded-full"></span>}
                  </span>
                  {set}
                </label>
              ))}
            </div>
          </div>

         {/* ✅ Section: อัปโหลดรูป */}
<h3 className="text-xl font-bold mt-6">📸 รูปสินค้า</h3>
<div className="flex flex-col items-baseline gap-6 p-10 py-5 bg-gray-100 rounded-2xl">
  <div className="flex justify-center">
    <label className="w-48 h-48 border-2 border-dashed bg-white border-blue-400 flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
      {images[0] ? (
        <img src={URL.createObjectURL(images[0])} className="w-full h-full object-cover" />
      ) : (
        <span className="text-9xl text-blue-500">+</span>
      )}
      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 0)} />
    </label>
  </div>

  {/* ✅ ปุ่มล้างรูป */}
  <div className="w-full flex justify-end">
    <button type="button" onClick={handleClearImages} className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition">
      ล้างรูปที่อัปโหลด
    </button>
  </div>
  </div>

          {/* ✅ Section: ค้นหาและเพิ่มสินค้า */}
          <SearchProductList setAddedProducts={setAddedProducts} />

          {/* ✅ Section: ราคาของโปรโมชั่น */}
          <div className="mt-6">
            <label className="font-semibold block mb-2">ราคาของโปรโมชั่น</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="ระบุราคาของโปรโมชั่น (สามารถเว้นว่างได้)"
              value={promotionPrice}
              onChange={(e) => setPromotionPrice(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          {/* ✅ ปุ่มบันทึกโปรโมชั่น */}
          <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full">
            บันทึกโปรโมชั่น
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddPromotionPage;

