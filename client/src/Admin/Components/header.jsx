import PropTypes from "prop-types";
import { Menu, Bell, Settings, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);  // ใช้ ref เพื่อระบุพื้นที่เมนู dropdown
  const navigate = useNavigate();  // ใช้ navigate จาก react-router-dom

  // ฟังก์ชันเปิด/ปิดเมนู
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // ฟังก์ชันเพื่อออกจากระบบ
  const handleSignOut = () => {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem("token");
    
    // นำทางไปที่หน้าแรก
    navigate("/");
  };

  // ฟังก์ชันปิดเมนูเมื่อคลิกที่นอกเมนู
  useEffect(() => {
    const handleClickOutside = (event) => {
      // เช็คว่าคลิกที่นอกเมนู dropdown หรือไม่
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);  // ถ้าคลิกนอกเมนู ให้ปิดเมนู
      }
    };

    document.addEventListener("click", handleClickOutside); // เพิ่ม event listener เมื่อคลิก
    return () => {
      document.removeEventListener("click", handleClickOutside); // ลบ event listener เมื่อ component ถูกลบ
    };
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 bg-gray-800 text-white shadow-md z-50 flex items-center justify-between p-4">
      {/* ✅ ปุ่มเมนู (เฉพาะมือถือ) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-gray-700 text-white rounded"
        aria-controls="sidebar"
        aria-expanded="false"
      >
        <Menu size={24} />
      </button>

      {/* ✅ Logo และชื่อระบบ */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
        <h1 className="text-lg font-bold text-white">ระบบคลังสินค้า</h1>
      </div>

      {/* ✅ เมนูด้านขวา */}
      <div className="flex items-center space-x-4 relative">
        <button className="hover:text-gray-300">
          <Bell size={24} />
        </button>
        <button className="hover:text-gray-300">
          <Settings size={24} />
        </button>
        
        {/* ✅ ไอคอน User และ Dropdown */}
        <div
          onClick={toggleDropdown} // เมื่อคลิกที่ไอคอน User
          className="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
        >
          <User size={24} />
        </div>

        {/* ✅ เมนู DropDown */}
        {dropdownOpen && (
          <div
            ref={dropdownRef} // ใช้ ref เพื่อระบุเมนูนี้
            className="absolute top-full right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-10"
          >
            <ul className="space-y-2 p-3">
              <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                Your profile
              </li>
              <li 
                onClick={handleSignOut} // เมื่อคลิก Sign out
                className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              >
                Sign out
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
