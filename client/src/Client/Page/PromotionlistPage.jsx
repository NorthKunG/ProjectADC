import { useEffect, useState } from "react";
import axios from "axios";
import PromotionsCard from "../Component/PromotionsCard"; // นำเข้า PromotionsCard ที่เราแก้ไข
import headerImage from "../../assets/Image/promotions.png"; // ใช้รูปภาพสำหรับ header ของหน้า

export default function PromotionsListPage() {
  const [promotions, setPromotions] = useState([]); // เก็บข้อมูลโปรโมชั่นทั้งหมด
  const [loading, setLoading] = useState(true);     // สถานะการโหลดข้อมูล
  const [totalCount, setTotalCount] = useState(0);  // จำนวนโปรโมชั่นทั้งหมด

  // ฟังก์ชันดึงข้อมูลโปรโมชั่นทั้งหมด
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/promotions`);
        setPromotions(response.data.promotions); // เก็บข้อมูลโปรโมชั่นทั้งหมด
        setTotalCount(response.data.totalCount); // เก็บจำนวนโปรโมชั่นทั้งหมด
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูลโปรโมชั่น:", error);
        setPromotions([]); // ถ้าเกิดข้อผิดพลาดให้ล้างข้อมูลโปรโมชั่น
        setTotalCount(0); // ถ้าเกิดข้อผิดพลาดให้จำนวนโปรโมชั่นเป็น 0
      } finally {
        setLoading(false); // หยุดการโหลด
      }
    };

    fetchPromotions();
  }, []); // ใช้ [] เพื่อให้เรียกแค่ครั้งเดียวเมื่อโหลดหน้า

  return (
    <div className="py-10 bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-left mb-8">
        <img
          src={headerImage} // ใช้รูปภาพสำหรับ header
          alt="Promotions Header"
          className="w-full h-auto mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-3xl font-extrabold text-gray-800">
          โปรโมชั่นทั้งหมด
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base px-6">
          พบโปรโมชั่นหลากหลายรายการที่น่าสนใจ พร้อมข้อเสนอสุดพิเศษ
        </p>

        {/* จำนวนโปรโมชั่น */}
        <div className="w-full p-6 bg-white shadow-lg rounded-lg mb-10 mt-6 border border-gray-300">
          <h1 className="text-2xl font-semibold text-gray-700">โปรโมชั่นทั้งหมด</h1>
          <p className="text-gray-500 text-sm mt-2">จำนวน {totalCount} รายการ</p>
        </div>
      </div>

      {/* แสดงโปรโมชั่นทั้งหมด */}
      <div className="flex flex-col lg:flex-row gap-6">
        <section className="w-full lg:w-3/4 xl:w-4/5">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-blue-500 font-medium text-lg animate-pulse">
                ⏳ กำลังโหลดโปรโมชั่น...
              </p>
            </div>
          ) : promotions.length > 0 ? (
            <PromotionsCard promotions={promotions} limit={totalCount} />  
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 font-semibold text-lg">
                ไม่มีโปรโมชั่นในขณะนี้
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
