import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Repeat, User, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LogoADCM from "../../../../assets/Image/Logo01.png";
import Banners from "./Banners";
import MenuDropdown from "./MenuDropdown";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const NavbarDesktop = ({ onLoginClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const query = encodeURIComponent(searchQuery.trim());
        const apiUrl = `${BASE_URL}/api/products/search?name=${query}`;
        console.log(`🔍 Fetching API: ${apiUrl}`);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.error(`❌ API Error: ${response.status} ${response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log("✅ Full API Response:", data);
        setSuggestions(data.products || []);
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
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link to="/Home" className="flex items-center gap-2 text-white">
            <img src={LogoADCM} alt="ADC Microsystems" className="h-16 w-auto object-cover" />
          </Link>

          <div className="flex-grow flex justify-center relative">
            <div className="flex w-full max-w-4xl relative">
              <input
                type="text"
                placeholder="ค้นหาสินค้า ประเภทสินค้า แบรนด์...."
                className="flex-grow h-12 text-base pl-4 rounded-l-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                type="button"
                onClick={handleSearch}
                className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-4 flex items-center justify-center border-l border-black rounded-r-full"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[70%] bg-white border border-gray-300 rounded-md shadow-lg z-50 mt-14 max-h-64 overflow-auto">
                <p className="p-2 text-gray-500 border-b">{`พบ ${suggestions.length} รายการ`}</p>
                <ul className="divide-y divide-gray-200">
                  {suggestions.map((product) => {
                    console.log("🖼️ Product Object:", product);
                    const hasImage = product?.images?.length > 0 && product.images[0]?.fileName;
                    const imageUrl = hasImage
                      ? `${BASE_URL}/uploads/products/${product.images[0].fileName}`
                      : null;
                    console.log("🔗 Image URL:", imageUrl);
                    return (
                      <li key={product._id} className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={product.name} 
                            className="w-12 h-12 object-cover rounded-md border" 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-image.jpg";
                            }} 
                          />
                        ) : (
                          <span className="text-gray-400 italic">ไม่มีรูปสินค้า</span>
                        )}
                        <span className="text-base font-medium text-gray-900">{product.name}</span>
                        <button
                          className="ml-auto text-gray-500 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSuggestions(suggestions.filter((p) => p._id !== product._id));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-8 text-white">
          <a
              href="#"
              className="flex flex-col items-center text-xs lg:text-sm whitespace-nowrap hover:text-gray-200 transition-opacity"
            >
              <Repeat className="h-5 w-5 lg:h-6 lg:w-6 mb-1" />
              <span className="tracking-wide">เปรียบเทียบ</span>
            </a>
            <button onClick={onLoginClick} className="flex flex-col items-center text-sm hover:text-gray-200">
              <User className="h-6 w-6 mb-1" />
              <span>เข้าสู่ระบบ</span>
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
