// NavbarDesktop.jsx

import { Search, User } from "lucide-react";
import LogoADCM from "../../../assets/Image/logo-ADCM.png";

const NavbarDesktop = () => {
  return (
    <nav className="bg-gradient-to-r from-[#63a6dd] via-[#63a6dd] to-[#00C999] p-4 hidden md:block shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-4 flex-nowrap">
        {" "}
        {/* ใช้ flex-nowrap เพื่อให้อยู่ในแถวเดียว */}
        {/* Logo */}
        <div className="flex items-center gap-2 text-white flex-none">
          <img
            src={LogoADCM}
            alt="ADC Microsystems"
            className="h-16 w-auto object-cover" /* ลดขนาดเมื่อหน้าจอเล็ก */
          />
          <div className="leading-tight">
            <h1 className="font-bold text-lg lg:text-2xl tracking-wide">ADC</h1>
            <p className="font-bold text-lg lg:text-2xl tracking-wide">
              MICROSYSTEMS
            </p>
            <p className="text-xs lg:text-sm text-[#2effcb] tracking-wide">
              บริษัท เอดีซี ไมโครซิสเต็มส์ จำกัด
            </p>
          </div>
        </div>


        {/* Search Bar */}
        <div className="flex-grow flex justify-center">
          <div className="flex w-full max-w-md md:max-w-lg lg:max-w-2xl">
            <input
              type="text"
              placeholder="ค้นหาสินค้า ประเภทสินค้า แบรนด์...."
              className="flex-grow h-10 lg:h-12 pl-4 lg:pl-6 rounded-l-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black transition-all"
            />
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white h-10 lg:h-12 px-4 lg:px-6 flex items-center justify-center border-l border-black rounded-r-full transition-all focus:ring-1 focus:ring-black"
            >
              <Search className="h-5 w-5 lg:h-6 lg:w-6" /> {/* ปรับขนาดไอคอน */}
            </button>
          </div>
        </div>


        {/* Menu */}
        <div className="flex items-center gap-16 flex-shrink-0 text-white">
          {" "}
          {/* ใช้ flex-shrink-0 เพื่อป้องกันเมนูบีบจนหาย */}
          <a
            href="#"
            className="flex flex-col items-center text-xs lg:text-sm whitespace-nowrap hover:text-gray-200 transition-opacity"
          >
            <Search className="h-5 w-5 lg:h-6 lg:w-6 mb-1" />{" "}
            {/* ปรับขนาดไอคอน */}
            <span className="tracking-wide">เปรียบเทียบ</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-xs lg:text-sm whitespace-nowrap hover:text-gray-200 transition-opacity"
          >
            <User className="h-5 w-5 lg:h-6 lg:w-6 mb-1" />{" "}
            {/* ปรับขนาดไอคอน */}
            <span className="tracking-wide">เข้าสู่ระบบ</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesktop;
