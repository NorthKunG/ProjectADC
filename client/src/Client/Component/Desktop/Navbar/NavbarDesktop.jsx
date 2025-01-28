// src/components/Nav/NavbarDesktop.jsx
import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import LogoADCM from "../../../../assets/Image/Logo01.png";
import Banners from "./Banners";
import MenuDropdown from "./MenuDropdown";

const NavbarDesktop = () => {
  return (
    <>
      {/* Banners ด้านบน */}
      <Banners />

      {/* Navbar หลัก */}
      <nav className="bg-gradient-to-r from-[#63a6dd] via-[#63a6dd] to-[#00C999] p-4 hidden md:block shadow-md">
        <div className="container mx-auto max-w-full px-1 md:px-5 lg:px-18 flex items-center justify-between gap-4 flex-nowrap">
          {/* คลิกโลโก้แล้วไปหน้า Home */}
          <Link to="/Home" className="flex items-center gap-2 text-white flex-none">
            <img
              src={LogoADCM}
              alt="ADC Microsystems"
              className="h-20 w-auto object-cover cursor-pointer"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow flex justify-center">
            <div className="flex w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
              <input
                type="text"
                placeholder="ค้นหาสินค้า ประเภทสินค้า แบรนด์...."
                className="flex-grow h-14 md:h-14 text-xs md:text-sm lg:text-base pl-4 md:pl-6 rounded-l-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black transition-all"
              />
              <button
                type="button"
                className="bg-purple-600 hover:bg-purple-700 text-white h-14 md:h-14 px-4 lg:px-7 flex items-center justify-center border-l border-black rounded-r-full transition-all focus:ring-1 focus:ring-black"
              >
                <Search className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="flex items-center gap-8 lg:gap-10 flex-shrink-0 text-white">
            <a
              href="#"
              className="flex flex-col items-center text-xs lg:text-sm whitespace-nowrap hover:text-gray-200 transition-opacity"
            >
              <Search className="h-5 w-5 lg:h-6 lg:w-6 mb-1" />
              <span className="tracking-wide">เปรียบเทียบ</span>
            </a>

            <Link
              to="/login"
              className="flex flex-col items-center text-xs lg:text-sm whitespace-nowrap hover:text-gray-200 transition-opacity"
            >
              <User className="h-5 w-5 lg:h-6 lg:w-6 mb-1" />
              <span className="tracking-wide">เข้าสู่ระบบ</span>
            </Link>
          </div>
        </div>
      </nav>

      <MenuDropdown />
    </>
  );
};

export default NavbarDesktop;
