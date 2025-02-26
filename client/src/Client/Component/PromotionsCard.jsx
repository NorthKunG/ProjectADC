import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // ✅ สำหรับตรวจสอบ prop

const PromotionsCard = ({ limit }) => {
  const [promotions, setPromotions] = useState([]); // เก็บข้อมูลโปรโมชั่น
  const [loading, setLoading] = useState(true);     // สถานะโหลดข้อมูล
  const [token, setToken] = useState(null);         // ตรวจสอบ token

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/promotions`);
        setPromotions(response.data.promotions.slice(0, limit));
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูลโปรโมชั่น:", error);
      } finally {
        setLoading(false); // หยุดโหลดข้อมูล
      }
    };

    // ตรวจสอบ token ใน sessionStorage
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);

    fetchPromotions();
  }, [limit]);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-medium">กำลังโหลดข้อมูล...</div>;
  }

  if (promotions.length === 0) {
    return <div className="text-center mt-10 text-red-500">ไม่มีโปรโมชั่นในขณะนี้</div>;
  }

  return (
    <div className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {promotions.map((promotion) => (
          <div
            key={promotion._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg flex flex-col h-[600px] sm:h-[640px] md:h-[680px] lg:h-[720px] xl:h-[760px] transition-transform transform hover:-translate-y-2"
          >
            {/* ✅ รูปภาพโปรโมชั่น */}
            <div className="p-2 flex justify-center items-center">
              {promotion.poster ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/promotion/${promotion.poster}`}
                  alt={promotion.name || "โปรโมชั่น"}
                  className="w-full h-72 sm:h-76 md:h-80 lg:h-84 xl:h-96 object-cover rounded-xl shadow-sm"
                />
              ) : (
                <div className="w-full h-72 sm:h-76 md:h-80 flex items-center justify-center bg-gray-200 rounded-xl text-gray-500">
                  ไม่มีรูปภาพ
                </div>
              )}
            </div>

            {/* ✅ เนื้อหาโปรโมชั่น */}
            <div className="p-4 flex flex-col flex-grow">
              {/* ชื่อโปรโมชั่น */}
              <h2
                className="text-lg sm:text-xl font-bold text-gray-800 leading-snug mb-2 truncate"
                title={promotion.name}
              >
                {promotion.name}
              </h2>

              {/* รายละเอียดสินค้า */}
              <div className="flex-grow overflow-y-auto bg-gray-50 rounded-lg p-2">
                {promotion.items.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 max-h-44 overflow-y-auto text-sm sm:text-base">
                    {promotion.items.slice(0, 5).map((item) => (
                      <li
                        key={item.productId?._id}
                        className="truncate text-gray-700 hover:text-gray-900 cursor-pointer"
                        title={item.productId?.itemDescription}
                      >
                        {item.productId?.itemDescription || "ไม่มีรายละเอียดสินค้า"}
                      </li>
                    ))}
                    {promotion.items.length > 5 && (
                      <li
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => alert("ฟังก์ชัน 'ดูเพิ่มเติม' ยังไม่พร้อมใช้งาน")}
                      >
                        ...ดูเพิ่มเติม
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-center">ไม่มีรายการสินค้าในโปรโมชั่นนี้</p>
                )}
              </div>

              {/* ราคาสินค้า */}
              {token ? (
                <p className="text-green-600 text-lg sm:text-xl font-bold mt-3 text-center">
                  ฿{promotion.price.toLocaleString()}
                </p>
              ) : (
                <div className="flex justify-center items-center mb-6">
                  <span className="text-red-500 font-semibold px-6 py-2">
                    เข้าสู่ระบบเพื่อดูราคา
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PromotionsCard.propTypes = {
  limit: PropTypes.number, // ✅ ตรวจสอบว่า limit ต้องเป็น number
};

export default PromotionsCard;
