import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Search, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LogoADCM from "../../../../assets/Image/Logo01.png";
import Banners from "./Banners";
import MenuDropdown from "./MenuDropdown";

const NavbarDesktop = ({ onLoginClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 ค่าที่ค้นหา:", searchQuery);

    if (searchQuery.trim() === "") {
      setSuggestions([]);
      console.log("🛑 ล้างรายการสินค้า (searchQuery ว่างเปล่า)");
      return;
    }

    const fetchProducts = async () => {
      try {
        console.log(
          "🚀 Fetching from API:",
          `http://localhost:3000/api/products/search?name=${encodeURIComponent(
            searchQuery
          )}`
        );

        const response = await fetch(
          `http://localhost:3000/api/products/search?name=${encodeURIComponent(
            searchQuery
          )}`
        );
        const text = await response.text();
        console.log("📢 Raw API Response:", text);

        const data = JSON.parse(text);
        console.log("✅ JSON Data:", data);

        setSuggestions(data.products || []);
        console.log("📌 อัปเดต State suggestions:", data.products || []);
      } catch (error) {
        console.error("🚨 Error fetching search results:", error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSuggestions([]);
    }
  };

  return (
    <>
      <Banners />
      <nav className="bg-gradient-to-r from-[#63a6dd] via-[#63a6dd] to-[#00C999] p-4 hidden md:block shadow-md relative">
        <div className="container mx-auto md:px-0 lg:px-0 xl:px-2 flex items-center justify-between gap-4 flex-nowrap">
          <Link
            to="/Home"
            className="flex items-center gap-2 text-white flex-none"
          >
            <img
              src={LogoADCM}
              alt="ADC Microsystems"
              className="h-12 md:h-14 lg:h-16 xl:h-20 w-auto object-cover cursor-pointer"
            />
          </Link>

          <div className="flex-grow flex justify-center relative">
            <div className="flex w-full max-w-lg md:max-w-2xl lg:max-w-4xl relative">
              <input
                type="text"
                placeholder="ค้นหาสินค้า ประเภทสินค้า แบรนด์...."
                className="flex-grow h-12 md:h-11 lg:h-12 xl:h-14 text-xs md:text-sm lg:text-base pl-4 md:pl-6 rounded-l-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                type="button"
                onClick={handleSearch}
                className="bg-purple-600 hover:bg-purple-700 text-white h-12 md:h-11 lg:h-12 xl:h-14 px-4 lg:px-7 flex items-center justify-center border-l border-black rounded-r-full transition-all focus:ring-1 focus:ring-black"
              >
                <Search className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>
            </div>

            {/* Dropdown แสดงผลลัพธ์การค้นหา */}
            {suggestions.length > 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] max-w-[calc(100%-4rem)] bg-white border border-gray-300 rounded-md shadow-lg z-50 mt-14 max-h-64 overflow-auto">
                <p className="p-2 text-gray-500 border-b">{`พบ ${suggestions.length} รายการ`}</p>
                <ul className="divide-y divide-gray-200">
                  {suggestions.map((product) => (
                    <li
                      key={product._id}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-all flex justify-between items-center"
                    >
                      <span className="text-sm md:text-base font-medium text-gray-900">
                        {product.name}
                      </span>
                      <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSuggestions(
                            suggestions.filter((p) => p._id !== product._id)
                          );
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-8 lg:gap-10 flex-shrink-0 text-white">
            <a
              href="#"
              className="flex flex-col items-center text-xs lg:text-sm whitespace-nowrap hover:text-gray-200 transition-opacity"
            >
              <Search className="h-5 w-5 lg:h-6 lg:w-6 mb-1" />
              <span className="tracking-wide">เปรียบเทียบ</span>
            </a>
            <button
              onClick={onLoginClick}
              className="flex flex-col items-center text-xs lg:text-sm whitespace-nowrap hover:text-gray-200 transition-opacity"
            >
              <User className="h-5 w-5 lg:h-6 lg:w-6 mb-1" />
              <span className="tracking-wide">เข้าสู่ระบบ</span>
            </button>
          </div>
        </div>
      </nav>
      <MenuDropdown />
    </>
  );
};

NavbarDesktop.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

export default NavbarDesktop;
