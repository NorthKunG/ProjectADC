import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Client/Page/Home"
import LoginPage from "./Client/Component/Desktop/Login/Login"; // นำเข้าไฟล์ login.jsx
import DashboardPage from "./Client/Component/Desktop/Login/dashboard"; // นำเข้าไฟล์ dashboard.jsx
import AddProductPage from "./Client/Component/Desktop/Login/AddProductPage"; // นำเข้าไฟล์ AddProduct.jsx

function App() {
  return (
    <Router>
      {/* ส่วน Banner และ Navbar แสดงผลเสมอ */}
     
      {/* กำหนด Routing */}
      <Routes>
        <Route path="/" element={<Home/>} /> {/* หน้าแรก */}
        <Route path="/Home" element={<Home/>} /> {/* หน้าแรก */}
        <Route path="/login" element={<LoginPage />} /> {/* หน้าล็อกอิน */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
