import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditUserPage() {
  const { id } = useParams(); // ✅ รับ userId จาก URL
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    address: "",
    taxNumber: "",
    role: "user", // ค่าเริ่มต้นเป็น user
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/users/${id}`,
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("บันทึกสำเร็จ!", "ข้อมูลผู้ใช้ถูกอัปเดตเรียบร้อย", "success");
      navigate("/UserDashboard"); // ✅ กลับไปหน้า User Dashboard
    } catch (error) {
      Swal.fire("เกิดข้อผิดพลาด", error.response?.data?.message || "บันทึกไม่สำเร็จ", "error");
    }
  };

  if (loading) return <p className="text-center text-gray-500">กำลังโหลด...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">แก้ไขข้อมูลผู้ใช้</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          ชื่อผู้ใช้:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          อีเมล์:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          หมายเลขโทรศัพท์:
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          บริษัท:
          <input
            type="text"
            name="companyName"
            value={user.companyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          ที่อยู่:
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          หมายเลขภาษี:
          <input
            type="text"
            name="taxNumber"
            value={user.taxNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          บทบาท (Role):
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          บันทึกการแก้ไข
        </button>
      </form>
      <button
        onClick={() => navigate("/users")}
        className="w-full mt-3 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
      >
        ยกเลิก
      </button>
    </div>
  );
}
