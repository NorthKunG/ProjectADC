import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";

const AddProductPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [brandName, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [ict, setIct] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([{ name: "", description: "" }]);
  const [cscode, setCsCode] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/loginPage");
    }
    const fetchData = async () => {
      try {
        const brandRes = await axios.get("http://localhost:3000/api/brands", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBrands(brandRes.data.brands);

        const categoryRes = await axios.get("http://localhost:3000/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(categoryRes.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token, navigate]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      setMessage("อัปโหลดได้สูงสุด 4 รูป");
      return;
    }
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen p-8">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">เพิ่มสินค้า</h2>
          <form className="space-y-6 text-black">
            {/* เลือกแบรนด์ */}
            <div>
              <label className="block font-semibold mb-1 text-black">เลือกแบรนด์</label>
              <select
                value={brandName}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="w-full p-3 border rounded-lg text-black"
              >
                <option value="">เลือกแบรนด์</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name} className="text-black">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* รหัสสินค้า & ชื่อสินค้า */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="รหัสสินค้า"
                required
                className="w-full p-3 border rounded-lg text-black"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ชื่อสินค้า"
                required
                className="w-full p-3 border rounded-lg text-black"
              />
            </div>

            {/* อัปโหลดไฟล์ */}
            <div>
              <label className="block font-semibold text-black">อัปโหลดรูปสินค้า (สูงสุด 4 รูป)</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-3 border rounded-lg text-black"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {previewImages.map((img, index) => (
                  <img key={index} src={img} alt="preview" className="w-full h-24 object-cover border rounded-lg" />
                ))}
              </div>
            </div>

            {/* Checkbox เปิดใช้งาน ICT */}
            <div className="flex items-center">
              <input type="checkbox" checked={ict} onChange={(e) => setIct(e.target.checked)} className="text-black" />
              <span className="ml-2 text-black">เปิดใช้งาน ICT</span>
            </div>

            {/* รายละเอียดสินค้า */}
            <div>
              <label className="block font-semibold mb-1 text-black">รายละเอียดสินค้า</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="รายละเอียดสินค้า"
                className="w-full p-3 border rounded-lg min-h-[100px] text-black"
              ></textarea>
            </div>

            {/* ราคา */}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="ราคา"
              required
              className="w-full p-3 border rounded-lg text-black"
            />

            {/* Dropdown เลือกหมวดหมู่ */}
            <div>
              <label className="block font-semibold mb-1 text-black">เลือกหมวดหมู่</label>
              <select
                value={cscode}
                onChange={(e) => setCsCode(e.target.value)}
                required
                className="w-full p-3 border rounded-lg text-black"
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.code} className="text-black">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {message && <p className="text-center text-red-500">{message}</p>}

            <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg">
              เพิ่มสินค้า
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProductPage;
