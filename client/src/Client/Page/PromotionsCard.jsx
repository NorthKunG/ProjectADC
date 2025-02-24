// PromotionsCard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const PromotionsCard = () => {
  const [promotions, setPromotions] = useState([]); // สถานะเก็บข้อมูลโปรโมชั่น
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลโปรโมชั่นจาก API เมื่อคอมโพเนนต์ถูก mount
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/promotions"); // เรียก API
        setPromotions(response.data.promotions); // เซ็ตข้อมูลโปรโมชั่นลงใน state
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโปรโมชั่น:", error); // แสดง error ใน console ถ้ามีปัญหา
      } finally {
        setLoading(false); // ยกเลิกสถานะโหลดเมื่อโหลดเสร็จหรือเกิด error
      }
    };

    fetchPromotions(); // เรียกใช้งานฟังก์ชัน
  }, []); // useEffect จะทำงานเพียงครั้งเดียวเมื่อคอมโพเนนต์ mount

  if (loading) {
    return <div className="text-center mt-10">กำลังโหลดข้อมูล...</div>; // แสดงข้อความระหว่างโหลดข้อมูล
  }

  return (
    <div className="container mx-auto px-4 py-8">
  {/* โครงสร้างการ์ดโปรโมชั่นแบบ Responsive */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {promotions.map((promotion) => (
      <div
        key={promotion._id}
        className="bg-white rounded-2xl shadow-lg flex flex-col
                   h-[540px] md:h-[580px] lg:h-[620px]" // กำหนดความสูงการ์ด
      >
        {/* ส่วนของรูปโปรโมชั่น */}
        <div className="p-2 pb-0 flex justify-center items-center">
          <img
            src={`http://localhost:3000/uploads/promotion/${promotion.poster}`}
            alt={promotion.name}
            className="w-full h-80 md:h-90 lg:h-110 object-cover rounded-xl"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* ส่วนเนื้อหาภายในการ์ด */}
        <div className="p-4 flex flex-col flex-grow">
          {/* ชื่อโปรโมชั่น */}
          <h2
            className="text-base md:text-lg font-bold text-gray-800 leading-snug mb-2 truncate"
            title={promotion.name}
          >
            {promotion.name}
          </h2>

          {/* โซนข้อมูลรายละเอียดที่จะใส่สกอลล์เมื่อเนื้อหาเยอะ */}
          <div className="flex-grow overflow-y-auto">
            {/* รายละเอียดสินค้า */}
            <div className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
              {promotion.items.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 max-h-24 overflow-y-auto">
                  {promotion.items.slice(0, 5).map((item) => (
                    <li
                      key={item.productId?._id}
                      className="truncate"
                      title={item.productId?.itemDescription}
                    >
                      {item.productId?.itemDescription || "ไม่มีรายละเอียดสินค้า"}
                    </li>
                  ))}
                  {promotion.items.length > 5 && (
                    <li className="text-blue-500 cursor-pointer">...ดูเพิ่มเติม</li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-400">
                  ไม่มีรายการสินค้าในโปรโมชั่นนี้
                </p>
              )}
            </div>
          </div>

          {/* ราคาสินค้า (ติดอยู่ด้านล่างของการ์ด) */}
          <p className="text-green-600 text-xl md:text-2xl font-bold mt-2">
            ฿{promotion.price.toLocaleString()}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default PromotionsCard;
