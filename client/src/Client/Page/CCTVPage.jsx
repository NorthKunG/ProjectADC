import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Component/ProductCard";
import ProductFilter from "../Component/ProductFilter";
import NavbarDesktop from "../Component/Desktop/Navbar/NavbarDesktop";

export default function CCTVPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    specICT: false,
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/newProducts/filter`,
        {
          params: {
            category: "IOT", // ✅ กรองเฉพาะหมวดกล้องวงจร
            specICT: filters.specICT ? "true" : undefined,
            minPrice: filters.minPrice || undefined,
            maxPrice: filters.maxPrice || undefined,
          },
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(
        "❌ ดึงข้อมูลสินค้าไม่สำเร็จ:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // ✅ โหลดสินค้าใหม่เมื่อ filters เปลี่ยน
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <>
      <NavbarDesktop />
      <div className="mx-auto py-10 bg-gray-50 min-h-screen md:px-4 lg:px-6 xl:px-8 ">
        {/* ✅ Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            🛡️ รวมกล้องวงจรปิด ราคาดีที่สุด ครบทุกรูปแบบ
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            เลือกซื้อกล้องวงจรปิดคุณภาพสูง พร้อมโปรโมชั่นและการรับประกันที่เชื่อถือได้
          </p>
        </div>

        {/* ✅ Layout: Filter + Products */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🎛️ ฟิลเตอร์ */}
          <aside className="w-full lg:w-1/5">
          <ProductFilter
  onFilterChange={handleFilterChange}
  filters={{ specICT: false, minPrice: 0, maxPrice: 99999 }}
/>
          </aside>

          {/* 🛒 สินค้า */}
          <section className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-blue-500 font-medium text-lg animate-pulse">
                  ⏳ กำลังโหลดข้อมูลสินค้า...
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-red-500 font-semibold text-lg">
                  😢 ไม่พบสินค้าตามเงื่อนไขที่เลือก
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
