import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Bell, Settings, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ✅ ใช้ Path ที่ถูกต้อง (เลือกใช้แบบใดแบบหนึ่ง)
import LogoADCM from "../../assets/Image/Logo01.png"; // ถ้าไฟล์อยู่ใน `public/assets/Image/`

export default function Header({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (event) => {
    event.stopPropagation(); // ป้องกัน event bubbling
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 bg-gradient-to-r from-[#63a6dd] via-[#63a6dd] to-[#00C999] text-white shadow-md z-50 flex items-center justify-between p-4">
      {/* ✅ ปุ่ม Toggle Sidebar สำหรับมือถือ */}
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
        <Link to="/Home" className="flex items-center gap-2 text-white flex-none">
          <img
            src={LogoADCM}
            alt="ADC Microsystems"
            className="h-12 md:h-14 lg:h-16 xl:h-16 w-auto object-cover cursor-pointer"
          />
        </Link>
        <h1 className="text-lg font-bold text-white">ระบบคลังสินค้า</h1>
      </div>

      {/* ✅ เมนูไอคอนด้านขวา */}
      <div className="flex items-center space-x-4 relative">
        <button className="hover:text-gray-300">
          <Bell size={24} />
        </button>
        <button className="hover:text-gray-300">
          <Settings size={24} />
        </button>

        {/* ✅ User Icon และ Dropdown Menu */}
        <div
          ref={userIconRef}
          onClick={toggleDropdown}
          className="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
        >
          <User size={24} />
        </div>

        {/* ✅ DropDown Menu */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-10"
          >
            <ul className="space-y-2 p-3">
              <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                Your profile
              </li>
              <li
                onClick={handleSignOut}
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
