import { useState, useEffect, useRef } from "react";
import { Search, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const SearchProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [addedProducts, setAddedProducts] = useState(
    JSON.parse(localStorage.getItem("addedProducts")) || []
  );
  const abortControllerRef = useRef(null);
  const navigate = useNavigate();

  // 🔍 ค้นหาสินค้าผ่าน API
  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const apiUrl = `${BASE_URL}/api/newproducts/search?keyword=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl, { signal: abortController.signal });
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      setSuggestions(data.products || []);
    } catch {
      setSuggestions([]);
    }
  };

  const debouncedSearch = useRef(_.debounce(fetchProducts, 300)).current;

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
  }, [addedProducts]);

  const addProduct = (product) => {
    if (!addedProducts.some((item) => item._id === product._id)) {
      const imageUrl = product?.images?.length > 0
        ? `${BASE_URL}/uploads/products/${product.images[0].fileName}`
        : null;
      setAddedProducts((prev) => [...prev, { ...product, imageUrl }]);
    }
  };

  const removeProduct = (id) => {
    setAddedProducts((prev) => prev.filter((item) => item._id !== id));
  };

  const totalPrice = addedProducts.reduce((sum, product) => sum + (product.price || 0), 0);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
    {/* 🔎 ค้นหาสินค้า */}
    <div className="relative flex items-center gap-2 border rounded-lg p-2 bg-white shadow">
      <input
        type="text"
        placeholder="🔍 ค้นหาสินค้า..."
        className="flex-grow h-12 text-sm sm:text-base pl-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={() =>
          searchQuery.trim() && navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
        }
        className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3"
      >
        <Search className="w-6 h-6" />
      </button>
    </div>

    {/* ✅ Responsive Layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* 🔍 แสดงผลลัพธ์สินค้า */}
      <div className="md:col-span-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {suggestions.map((product) => {
            const hasImage = product?.images?.length > 0 && product.images[0]?.fileName;
            const imageUrl = hasImage
              ? `${BASE_URL}/uploads/products/${product.images[0].fileName}`
              : null;

            return (
              <div key={product._id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white">
                {/* ✅ ถ้ามีรูป → แสดงรูป, ถ้าไม่มี → แสดง "ไม่มีรูปสินค้า" */}
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={product.itemDescription || "ไม่มีชื่อสินค้า"} 
                    className="w-32 h-32 object-cover rounded-md border mb-2" 
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-500 text-sm border rounded-md mb-2">
                    ไม่มีรูปสินค้า
                  </div>
                )}

                {/* ✅ ป้องกันชื่อสินค้าทะลุกรอบ */}
                <span 
                  className="text-sm font-medium text-gray-900 text-center w-full truncate max-w-[200px]" 
                  title={product.itemDescription}
                >
                  {product.itemDescription || "ไม่มีชื่อสินค้า"}
                </span>

                <button
                  className="mt-auto bg-green-600 text-white w-full px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition duration-200"
                  onClick={() => addProduct(product)}
                >
                  <PlusCircle className="w-5 h-5" /> เพิ่มสินค้า
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 📦 รายการสินค้าที่เพิ่ม */}
      <div className="border rounded-lg shadow-lg p-4 bg-white md:max-h-full">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">📌 รายการที่เลือก</h3>
        <div className="max-h-96 md:max-h-full overflow-auto space-y-3">
          {addedProducts.length > 0 ? (
            addedProducts.map((product) => {
              const truncatedName =
                product.itemDescription.length > 20
                  ? `${product.itemDescription.slice(0, 20)}...`
                  : product.itemDescription;

              return (
                <div key={product._id} className="flex items-center bg-gray-100 p-3 rounded-lg shadow">
                  {/* ✅ แสดงรูปสินค้า หรือ ข้อความ "ไม่มีรูป" */}
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.itemDescription}
                      className="w-12 h-12 object-cover rounded-md border mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-300 text-gray-600 text-xs border rounded-md mr-3">
                      ไม่มีรูป
                    </div>
                  )}

                  <div className="flex-1">
                    <span
                      className="text-sm font-medium text-gray-900 truncate block"
                      title={product.itemDescription}
                    >
                      {truncatedName}
                    </span>
                    <span className="text-xs text-gray-600">฿{product.price || 0}</span>
                  </div>
                  <button className="text-red-600 hover:text-red-800" onClick={() => removeProduct(product._id)}>
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">ยังไม่มีสินค้าที่เลือก</p>
          )}
        </div>

        {/* 🔥 แสดงราคารวม */}
        {addedProducts.length > 0 && (
          <div className="mt-4 p-3 border-t text-right">
            <span className="text-lg font-bold text-gray-900">
              💰 ราคารวม: ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default SearchProductList;

