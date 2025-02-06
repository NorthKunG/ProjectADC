import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // 🆕 ใช้ Link จาก react-router-dom
import { Home, PackagePlus, Users, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      {/* ✅ Overlay สำหรับ Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* ✅ Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 min-h-screen p-5 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:static`}
      >
        {/* ✅ ปิด Sidebar (เฉพาะมือถือ) */}
        <div className="md:hidden h-14"></div>

        {/* ✅ เมนู Navigation */}
        <nav className="space-y-2 mt-2 md:mt-4 lg:mt-1">
          {/* 🏠 หน้าแรก */}
          <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
            <Home size={20} /> หน้าแรก
          </Link>

          {/* ➕ เพิ่มสินค้า */}
          <Link to="/add-product" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
            <PackagePlus size={20} /> เพิ่มสินค้า
          </Link>

          {/* 👥 จัดการผู้ใช้ */}
          <div>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-2 p-2 w-full rounded hover:bg-gray-700"
            >
              <Users size={20} /> จัดการผู้ใช้
              <ChevronDown
                size={16}
                className={`${openDropdown ? "rotate-180" : ""} transition-transform`}
              />
            </button>
            {openDropdown && (
              <div className="pl-6 space-y-2">
                <Link to="/manage-users/list" className="block p-2 rounded hover:bg-gray-700">
                  รายชื่อผู้ใช้
                </Link>
                <Link to="/manage-users/add" className="block p-2 rounded hover:bg-gray-700">
                  เพิ่มผู้ใช้
                </Link>
              </div>
            )}
          </div>

          {/* ⚙️ การตั้งค่า */}
          <Link to="/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
            <Settings size={20} /> การตั้งค่า
          </Link>
        </nav>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired, // รับค่า boolean ว่า Sidebar เปิดหรือปิด
  toggleSidebar: PropTypes.func.isRequired, // ฟังก์ชันเปิด-ปิด Sidebar
};

export default Sidebar;
