// ✅ นำเข้า Dependencies ที่ใช้ในหน้า ProductPage
import { useEffect, useState } from "react"; // ใช้จัดการ State และ Lifecycle
import { useParams } from "react-router-dom"; // ดึงพารามิเตอร์จาก URL (id ของสินค้า)
import axios from "axios"; // สำหรับเรียก API
import { ChevronLeft, ChevronRight, FileText } from "lucide-react"; // ไอคอนสำหรับ UI
import Lightbox from "yet-another-react-lightbox"; // ไลบรารีสำหรับดูภาพแบบเต็มจอ
import "yet-another-react-lightbox/styles.css"; // สไตล์ของ Lightbox
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"; // ปลั๊กอินสำหรับแสดงรูปย่อ
import "yet-another-react-lightbox/plugins/thumbnails.css"; // สไตล์ของรูปย่อ

// ✅ URL พื้นฐานของ API
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ✅ ฟังก์ชันแปลง cscode เป็นชื่อเต็มของประเภทสินค้า
const getFullCategoryName = (cscode) => {
  const categoryMap = {
    AORR: "NOTEBOOK PERSONAL COMPUTER (AORR)",
    NW01: "NETWORK SWITCH (NW01)",
    IOT02: "SMART SENSOR DEVICE (IOT02)",
    SC05: "SOLAR PANEL (SC05)",
    // ✅ เพิ่ม cscode และชื่อเต็มของประเภทได้ที่นี่
  };
  return categoryMap[cscode] || cscode || "ไม่ระบุ"; // คืนค่า cscode เดิมถ้าไม่พบใน Map
};

const ProductPage = () => {
  const { id } = useParams(); // ✅ ดึง id จาก URL
  const [product, setProduct] = useState(null); // ✅ State สำหรับเก็บข้อมูลสินค้า
  const [loading, setLoading] = useState(true); // ✅ State สำหรับจัดการสถานะการโหลด
  const [currentIndex, setCurrentIndex] = useState(0); // ✅ Index สำหรับรูปภาพที่แสดงอยู่
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // ✅ สถานะเปิด/ปิด Lightbox

  // ✅ ฟังก์ชันดึงข้อมูลสินค้าจาก API
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/newProducts/${id}`); // เรียก API สินค้า
      setProduct(response.data); // บันทึกข้อมูลสินค้าใน State
      setCurrentIndex(0); // รีเซ็ต Index ของรูปภาพเมื่อโหลดข้อมูลใหม่
    } catch (error) {
      console.error("🚫 ไม่สามารถดึงข้อมูลสินค้า:", error.response?.data || error.message);
    } finally {
      setLoading(false); // ปิดสถานะโหลดเมื่อเสร็จ
    }
  };

  useEffect(() => {
    if (id) fetchProduct(); // ✅ โหลดข้อมูลเมื่อ id เปลี่ยน
  }, [id]);

  // ✅ แสดงข้อความระหว่างโหลดข้อมูล
  if (loading)
    return (
      <div className="text-center py-10 text-lg font-medium">กำลังโหลด...</div>
    );

  // ✅ แสดงข้อความเมื่อไม่พบข้อมูลสินค้า
  if (!product)
    return (
      <div className="text-center py-10 text-lg font-medium text-red-500">
        ไม่พบข้อมูลสินค้า
      </div>
    );

  // ✅ สร้าง Array รูปภาพจากข้อมูลสินค้า
  const images =
    product.images?.map((img) => ({
      src: `${BASE_URL}/uploads/products/${img.fileName}`,
      alt: product.itemDescription,
    })) || [];

  // ✅ ฟังก์ชันเลื่อนรูปภาพไปทางซ้าย
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // ✅ ฟังก์ชันเลื่อนรูปภาพไปทางขวา
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // ✅ ใช้ฟังก์ชันเพื่อแปลง cscode เป็นชื่อเต็มของประเภทสินค้า
  const fullCategoryName = getFullCategoryName(product.cscode);
  return (
    <div className="w-full max-w-auto mx-auto p-8 bg-white rounded-2xl shadow-lg">
      {/* ✅ ส่วนที่ 1: รูปสินค้า + ข้อมูลสินค้า */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start pb-8 border-b border-gray-300 relative">
        
        {/* ✅ รูปภาพสินค้า */}
        <div className="relative flex flex-col items-center w-full space-y-6">
          {/* ✅ กล่องรูปภาพและปุ่มเลื่อน */}
          <div className="relative w-full">
            {/* ปุ่มเลื่อนซ้าย */}
            {images.length > 1 && (
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-200 transition z-10"
                onClick={handlePrev}
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* ✅ รูปภาพหลัก */}
            <div className="relative w-full h-[460px] bg-gray-100 rounded-2xl flex justify-center items-center overflow-hidden shadow-md">
              {images.length > 0 ? (
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full h-full object-contain cursor-pointer rounded-lg"
                  onClick={() => setIsLightboxOpen(true)}
                />
              ) : (
                <p className="text-gray-500">ไม่มีรูปภาพสินค้า</p>
              )}
            </div>

            {/* ปุ่มเลื่อนขวา */}
            {images.length > 1 && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-200 transition z-10"
                onClick={handleNext}
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>

          {/* ✅ แถบรูปภาพย่อ */}
          {images.length > 1 && (
            <div className="flex gap-3 justify-center w-full overflow-x-auto p-3 rounded-lg bg-gray-50">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={`รูปที่ ${index + 1}`}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-transform duration-150 hover:scale-110 ${
                    currentIndex === index ? "border-green-500" : "border-transparent"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ✅ ข้อมูลสินค้า */}
        <div className="space-y-6 w-full text-left">
  {/* ✅ ชื่อสินค้า */}
  <h1 className="text-3xl font-bold text-gray-800 leading-tight">
    {product.itemDescription}
  </h1>

  {/* ✅ รายละเอียดสินค้า (เพิ่มย่อหน้าและจัดประเภทสินค้าให้อยู่บรรทัดเดียว) */}
  <ul className="list-disc pl-16 space-y-5 text-gray-800 text-lg">
    <li>
      <span className="font-semibold">ยี่ห้อ:</span>{" "}
      <span className="text-gray-700">{product.brand || "N/A"}</span>
    </li>
    <li>
      <span className="font-semibold">รหัสสินค้า:</span>{" "}
      <span className="text-gray-700">{product.itemNumber || "N/A"}</span>
    </li>
    <li>
      <span className="font-semibold">หมวดหมู่:</span>{" "}
      <span className="text-gray-700">{product.category || "N/A"}</span>
    </li>
    <li>
      <span className="font-semibold">ประเภทสินค้า:</span>{" "}
      <span className="text-gray-700">{fullCategoryName || "N/A"}</span>
    </li>
    <li>
      <span className="font-semibold">มาตรฐาน ICT:</span>{" "}
      <span className={`text-gray-700 ${product.specICT ? "text-green-600 font-semibold" : "text-gray-500"}`}>
        {product.specICT ? "รองรับ" : "ไม่รองรับ"}
      </span>
    </li>
    <li>
      <span className="font-semibold">สถานะสินค้า:</span>{" "}
      <span className="text-green-600 font-semibold">{product.status || "N/A"}</span>
    </li>
  </ul>

  {/* ✅ ราคา */}
  <p className="text-green-600 font-bold text-4xl mt-10 pl-4">
    ราคา :   {product.price != null ? ` ${product.price.toLocaleString()}` : "฿N/A"}
  </p>

  {/* ✅ ปุ่มควบคุม (ใบเสนอราคา, เปรียบเทียบ, แชร์) */}
  <div className="w-full flex flex-col gap-4 mt-6">
    {/* ✅ ปุ่มรับใบเสนอราคา */}
    <button className="w-full py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition flex justify-center items-center gap-2">
      <FileText size={20} /> รับใบเสนอราคา
    </button>

    {/* ✅ ปุ่มเปรียบเทียบ & แชร์ (บรรทัดเดียวกัน) */}
    <div className="w-full flex gap-4">
      {/* ✅ ปุ่มเปรียบเทียบ */}
      <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition flex justify-center items-center gap-2">
        <i className="fas fa-exchange-alt"></i> เปรียบเทียบ
      </button>

      {/* ✅ ปุ่มแชร์ */}
      <button className="w-full py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition flex justify-center items-center gap-2">
        <i className="fas fa-share-alt"></i> แชร์
      </button>
    </div>
  </div>
</div>
</div> 

      {/* ✅ ส่วนคุณสมบัติสินค้า */}
      <div className="w-full mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">คุณสมบัติสินค้า</h2>
        <div className="w-full border-t border-gray-300"></div>
        <table className="w-full mt-4 text-left text-gray-800">
          <tbody>
            {product.specifications?.map((spec, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="px-5 py-3 font-semibold w-1/3">{spec.name}</td>
                <td className="px-5 py-3">{spec.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Lightbox สำหรับดูรูปภาพแบบเต็มจอ */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={images.map((img) => ({ src: img.src }))}
          index={currentIndex}
          plugins={[Thumbnails]}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(15px)" },
            thumbnailsContainer: { backgroundColor: "#f1f1f1" },
          }}
          thumbnails={{
            position: "bottom",
            width: 100,
            height: 70,
            borderRadius: 8,
            gap: 8,
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;
