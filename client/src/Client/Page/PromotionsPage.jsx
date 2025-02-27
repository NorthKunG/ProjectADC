import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Component/ProductCard"; // ✅ นำเข้า ProductCard

const PromotionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/promotions/${id}`
        );
        setPromotion(response.data || {});
      } catch (error) {
        console.error("🚫 ไม่สามารถโหลดข้อมูลโปรโมชั่น:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotion();
    setToken(sessionStorage.getItem("token"));
  }, [id]);

  if (loading) return <div className="text-center mt-10">กำลังโหลด...</div>;

  if (!promotion || Object.keys(promotion).length === 0)
    return <div className="text-center mt-10 text-red-500">ไม่พบโปรโมชั่น</div>;

  return (
    <div className="w-full bg-gray-50 py-8 px-4 md:px-12">
      {/* ✅ ส่วนแสดงโปรโมชั่น */}
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ รูปภาพโปรโมชั่น */}
          <div className="w-full flex justify-center bg-gray-100">
            {promotion.poster ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/promotion/${
                  promotion.poster
                }`}
                alt={promotion.name || "โปรโมชั่น"}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-[500px] flex items-center justify-center text-gray-500">
                ไม่มีรูปภาพโปรโมชั่น
              </div>
            )}
          </div>

          {/* ✅ รายละเอียดโปรโมชั่น */}
          <div className="p-6 flex flex-col justify-between">
            {/* ชื่อโปรโมชั่น */}
            <h1 className="text-4xl font-bold text-gray-800">
              {promotion.name || "ไม่มีชื่อโปรโมชั่น"}
            </h1>

            {/* รายชื่อรายการสินค้า */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                รายการสินค้าในโปรโมชั่น
              </h2>
              {promotion.items?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg list-inside">
                  {promotion.items.map((item, index) => (
                    <li key={index} className="truncate">
                      {item.productId?.itemDescription ||
                        "ไม่มีรายละเอียดสินค้า"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">ไม่มีรายการสินค้าในโปรโมชั่นนี้</p>
              )}
            </div>

            {/* ✅ แสดงราคา หรือให้เข้าสู่ระบบ */}
            {token ? (
              <p className="text-green-600 font-bold text-4xl mt-6">
                ฿{promotion.price ? promotion.price.toLocaleString() : "N/A"}
              </p>
            ) : (
              <button
                onClick={() => navigate("/loginPage")}
                className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition mt-6 text-lg"
              >
                เข้าสู่ระบบเพื่อดูราคา
              </button>
            )}

            {/* ปุ่ม รับใบเสนอราคา */}
            <div className="mt-6">
              <button
                onClick={() => alert("✅ ส่งคำขอใบเสนอราคา!")}
                className="w-full py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition"
              >
                รับใบเสนอราคา
              </button>
            </div>

            {/* ปุ่ม เปรียบเทียบ & แชร์ */}
            <div className="flex gap-4 mt-6">
              {/* เปรียบเทียบ */}
              <button
                onClick={() => alert("🔎 ฟีเจอร์เปรียบเทียบกำลังมาเร็วๆ นี้!")}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition"
              >
                เปรียบเทียบ
              </button>

              {/* แชร์ */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("✅ ลิงก์ถูกคัดลอกแล้ว!");
                }}
                className="w-full py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition"
              >
                แชร์
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ส่วนแสดงรายการสินค้าในโปรโมชั่น (เลื่อนในแนวนอน) */}
      <div className="max-w-full mx-auto mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          สินค้าที่ร่วมโปรโมชั่น
        </h2>

        {/* กำหนดให้สินค้าแสดงในแนวนอนและสามารถเลื่อนได้ */}
        <div className="flex overflow-x-auto space-x-4 p-4">
          {promotion.items?.length > 0 ? (
            promotion.items.map((item) => (
              <div key={item.productId?._id} className="flex-shrink-0">
                <ProductCard
                  key={item.productId?._id}
                  product={item.productId}
                />{" "}
                {/* ใช้ ProductCard */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              ไม่มีสินค้าในโปรโมชั่นนี้
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;
