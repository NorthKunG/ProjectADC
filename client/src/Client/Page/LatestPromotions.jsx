// PromotionsLayout.jsx
import PromotionsPage from "./PromotionsCard"; // นำเข้า PromotionsPage ที่จะใช้แสดงโปรโมชั่น

const PromotionsLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8"> {/* พื้นหลังสีเทาและความสูงเต็มหน้าจอ */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">โปรโมชั่น</h1> {/* หัวข้อใหญ่ตรงกลาง */}
        <PromotionsPage limit={4} /> {/* เรียกใช้งาน PromotionsPage โดยจำกัดให้แสดง 4 รายการ */}
      </div>
    </div>
  );
};

export default PromotionsLayout;
