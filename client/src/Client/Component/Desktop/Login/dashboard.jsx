
import { useNavigate } from "react-router-dom"; // ใช้ navigate สำหรับเปลี่ยนหน้า

const DashboardPage = () => {
  const navigate = useNavigate(); // ใช้ฟังก์ชัน navigate

  const handleAddProduct = () => {
    navigate("/add-product"); // เปลี่ยนเส้นทางไปยังหน้า AddProductPage
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">ยินดีต้อนรับ! เข้าสู่ระบบสำเร็จ</h1>
        <button
          onClick={handleAddProduct} // เรียกใช้ฟังก์ชันเมื่อคลิกปุ่ม
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          เพิ่มสินค้า
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
