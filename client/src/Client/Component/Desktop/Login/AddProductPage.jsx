import { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./image-upload";

const AddProductPage = () => {
  const [brandName, setBrand] = useState(""); // Dropdown สำหรับ Brand
  const [brands, setBrands] = useState([]); // รายการ Brand
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [ict, setIct] = useState([]); // Checkbox ICT
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([{ name: "", description: "" }]); // Features เป็น Array
  const [cscode, setCsCode] = useState(""); // Dropdown สำหรับ Category
  const [categories, setCategories] = useState([]); // รายการ Category
  const [message, setMessage] = useState("");

  // ดึงข้อมูล Brands และ Categories จาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await axios.get(
          "http://localhost:3000/api/brands"
        );
        setBrands(brandResponse.data.brands); // สมมติ API ส่ง { brands: [...] }

        const categoryResponse = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(categoryResponse.data.categories); // สมมติ API ส่ง { categories: [...] }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // จัดการการเปลี่ยน Features (Array)
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value; // เปลี่ยนค่าใน Feature ที่ต้องการ
    setFeatures(updatedFeatures);
  };

  // เพิ่มช่องสำหรับ Feature ใหม่
  const addFeature = () => {
    setFeatures((prev) => [...prev, { name: "", description: "" }]);
  };

  // ลบ Feature
  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/products", {
        brandName,
        productId,
        name,
        ict,
        description,
        price,
        features,
        cscode,
      });

      if (response.status === 201) {
        setMessage("เพิ่มสินค้าสำเร็จ!");
        setBrand("");
        setProductId("");
        setName("");
        setIct([]);
        setDescription("");
        setPrice("");
        setFeatures([{ name: "", description: "" }]);
        setCsCode("");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มสินค้า"
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">เพิ่มสินค้า</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand Dropdown */}
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              แบรนด์
            </label>
            <select
              id="brand"
              value={brandName}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
            >
              <option value="">เลือกแบรนด์</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product ID */}
          <div>
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสสินค้า
            </label>
            <input
              id="productId"
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
              placeholder="รหัสสินค้า"
            />
          </div>

          {/* ชื่อสินค้า */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อสินค้า
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
              placeholder="ชื่อสินค้า"
            />
          </div>

          <div>
            <ImageUpload/>
          </div>

          {/* ICT Checkbox */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ICT (เปิด/ปิด)
            </label>
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={ict} // ICT จะเป็น true/false
                onChange={(e) => setIct(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>{ict ? "เปิดใช้งาน" : "ปิดใช้งาน"}</span>
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              ราคา
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
              placeholder="ราคา"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              รายละเอียดสินค้า
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
              placeholder="รายละเอียดสินค้า"
            ></textarea>
          </div>

         

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              คุณสมบัติสินค้า
            </label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 mt-2">
                <input
                  type="text"
                  value={feature.name}
                  onChange={(e) =>
                    handleFeatureChange(index, "name", e.target.value)
                  }
                  placeholder="ชื่อคุณสมบัติ"
                  className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={feature.description}
                  onChange={(e) =>
                    handleFeatureChange(index, "description", e.target.value)
                  }
                  placeholder="รายละเอียด"
                  className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ลบ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              + เพิ่มคุณสมบัติ
            </button>
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              หมวดหมู่
            </label>
            <select
              id="category"
              value={cscode}
              onChange={(e) => setCsCode(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
            >
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.code}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm ${
                message === "เพิ่มสินค้าสำเร็จ!"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            เพิ่มสินค้า
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
