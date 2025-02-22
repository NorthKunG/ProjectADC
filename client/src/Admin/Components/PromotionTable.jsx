import { useEffect, useState } from "react";
import axios from "axios";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import EditPromotion from "./EditPromotion";
import DeletePromotion from "./DeletePromotion";

export default function PromotionTable() {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("latest");
  const limit = 10;

  useEffect(() => {
    fetchPromotions();
  }, [page, sortOrder]);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/promotions?page=${page}&limit=${limit}&sort=${sortOrder}`
      );
      setPromotions(response.data.promotions);
      setTotalCount(response.data.count);
    } catch (error) {
      Swal.fire("เกิดข้อผิดพลาด", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">📢 รายการโปรโมชั่น</h3>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ค้นหาโปรโมชั่น..."
              className="pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);  // ✅ เปลี่ยนการเรียง
              setPage(1);                     // ✅ รีเซ็ตไปหน้าแรกเมื่อเปลี่ยนการเรียง
            }}
            className="px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="latest">ล่าสุด</option>
            <option value="oldest">เก่าสุด</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลด...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr className="text-sm">
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">รูปโปรโมชั่น</th>
                  <th className="p-4 text-left w-40">ชื่อโปรโมชั่น</th>
                  <th className="p-4 text-left w-72">รายการสินค้า</th>
                  <th className="p-4 text-left">ราคา</th>
                  <th className="p-4 text-center">แก้ไข</th>
                  <th className="p-4 text-center">ลบ</th>
                </tr>
              </thead>
              <tbody>
                {promotions
                  .filter((promotion) =>
                    promotion.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((promotion, index) => (
                    <tr key={promotion._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{startItem + index}</td>
                      <td className="p-4">
                        <img
                          src={`http://localhost:3000/uploads/promotion/${promotion.poster}`}
                          alt={promotion.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-4 font-medium">{promotion.name}</td>
                      <td className="p-4 max-w-xs">
                        {promotion.items.length > 0 ? (
                          promotion.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="text-sm truncate"
                              title={`${item?.productId?.itemDescription ?? "ไม่มีชื่อสินค้า"} (${item.quantity} ชิ้น)`}
                            >
                              - {item?.productId?.itemDescription ?? "ไม่มีชื่อสินค้า"} ({item.quantity} ชิ้น)
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-400">ไม่มีสินค้าในโปรโมชั่น</span>
                        )}
                      </td>
                      <td className="p-4 text-blue-600 font-semibold">
                        {promotion.price.toLocaleString()} บาท
                      </td>
                      <td className="p-4 text-center">
                        <EditPromotion promotionId={promotion._id} />
                      </td>
                      <td className="p-4 text-center">
                        <DeletePromotion promotionId={promotion._id} fetchPromotions={fetchPromotions} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-gray-700">
              แสดง {startItem} ถึง {endItem} จาก {totalCount} รายการ
            </span>

            <div className="flex items-center space-x-1">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={18} /> ก่อนหน้า
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-3 py-1 rounded-md ${
                    page === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                ถัดไป <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
