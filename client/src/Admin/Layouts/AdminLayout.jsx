import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* ✅ Header คงที่ด้านบน */}
      <Header toggleSidebar={toggleSidebar} />

      {/* ✅ Layout ของ Sidebar & Main Content */}
      <div className="flex">
        {/* ✅ Sidebar ขยับขึ้นไปชิด Header */}
        <div className="md:fixed md:left-0 md:top-[60px] md:w-64 md:h-[calc(100vh-60px)]">
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* ✅ Main Content อยู่ข้าง Sidebar และเลื่อนได้อิสระ */}
        <main className="flex-1 ml-0 md:ml-64 p-5 overflow-y-auto  min-h-[calc(100vh-60px)] pt-[120px]">
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
