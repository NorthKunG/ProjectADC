import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Client/Page/Home";
import LoginPopup from "./Client/Component/Desktop/Login/Login"; // นำเข้าไฟล์ login.jsx
import DashboardPage from "./Admin/Pages/DashboardPage"; // นำเข้าไฟล์ dashboard.jsx
import AddProductPage from "./Admin/Pages/AddProductPage"; // นำเข้าไฟล์ AddProduct.jsx
import LoginPage from "./Client/Component/Desktop/Login/Loginpage"; // นำเข้าไฟล์ Loginpage.jsx
import Test from "./Admin/Pages/test"; // นำเข้าไฟล์ test.jsx
import Twse from "./Admin/Pages/Twse"; // นำเข้าไฟล์ Twse.jsx
import Uuu from "./Admin/Pages/signup"; // นำเข้าไฟล์ uuu.jsx
import Addpromotion from "./Admin/Pages/AddPromotionPage"


function App() {
  const [ setIsOpen] = useState(false);  // สร้าง state สำหรับควบคุมการเปิด/ปิด Modal

  return (
    <Router>
      {/* ส่วน Banner และ Navbar แสดงผลเสมอ */}

      {/* กำหนด Routing */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* หน้าแรก */}
        <Route path="/Home" element={<Home />} /> {/* หน้าแรก */}
        
        {/* ส่ง setIsOpen ไปที่ LoginPage */}
        <Route path="/login" element={<LoginPopup setIsOpen={setIsOpen} />} /> {/* หน้าล็อกอิน */}
        
        <Route path="/Test" element={<Test/>} />
        <Route path="/Twse" element={<Twse/>} />
        <Route path="/uuu" element={<Uuu/>} />
        <Route path="/add-promotion" element={<Addpromotion/>} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
