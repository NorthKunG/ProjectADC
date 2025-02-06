import PropTypes from "prop-types";
import { Menu, Bell, Settings, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    <header className="w-full fixed top-0 left-0 bg-gray-800 text-white shadow-md z-50 flex items-center justify-between p-4">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-gray-700 text-white rounded"
        aria-controls="sidebar"
        aria-expanded="false"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
        <h1 className="text-lg font-bold text-white">ระบบคลังสินค้า</h1>
      </div>

      <div className="flex items-center space-x-4 relative">
        <button className="hover:text-gray-300">
          <Bell size={24} />
        </button>
        <button className="hover:text-gray-300">
          <Settings size={24} />
        </button>

        {/* ✅ User Icon (ใช้ ref) */}
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
