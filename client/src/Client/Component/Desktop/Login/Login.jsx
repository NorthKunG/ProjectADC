import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ใช้สำหรับ Redirect หลัง Login สำเร็จ
import NavbarDesktop from "../Navbar/NavbarDesktop";



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ใช้ navigate() เพื่อเปลี่ยนหน้า

  const handleLogin = async (e) => {
    
    e.preventDefault(); // ป้องกันการ reload หน้า
    setMessage("");

    try {
      // ส่งคำขอ POST ไปยัง API
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      // กรณีเข้าสู่ระบบสำเร็จ
      if (response.status === 200) {
        const token = response.data.token; // รับ Token จาก API (ถ้ามี)
        setMessage("เข้าสู่ระบบสำเร็จ!");
        localStorage.setItem("token", token); // เก็บ Token ใน LocalStorage

        // เปลี่ยนหน้าไปยัง Dashboard หรือ Home
        setTimeout(() => {
          navigate("/dashboard"); // เปลี่ยนหน้าไปยัง /dashboard
        }, 2000); // รอ 2 วินาทีก่อนเปลี่ยนหน้า
      }
    } catch (error) {
      // แสดงข้อผิดพลาด
      setMessage(error.response?.data?.message || "เข้าสู่ระบบล้มเหลว");
    }
  };

  return (
    <div >
      <NavbarDesktop />
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              placeholder="กรอกอีเมล"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสผ่าน
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          {message && (
            <p
              className={`text-center text-sm ${
                message === "เข้าสู่ระบบสำเร็จ!"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
