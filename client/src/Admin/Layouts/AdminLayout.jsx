import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/header";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev); // ✅ ใช้ค่า prev เพื่อให้ React อัปเดตถูกต้อง

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* ✅ Header คงที่ด้านบน */}
      <Header toggleSidebar={toggleSidebar} />

      {/* ✅ Layout ของ Sidebar & Content */}
      <div className="flex pt-[60px]">
        {/* ✅ Sidebar คงที่ ไม่เลื่อนตาม Main Content */}
        <div className="h-screen fixed md:relative">
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* ✅ Main Content (แยก Scroll ได้) */}
        <main className="flex-1 p-5 overflow-y-auto h-[calc(100vh-60px)]">
          <div className="bg-white p-5 rounded shadow dark:bg-gray-800 dark:text-white">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
