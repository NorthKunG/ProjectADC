import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Client/Page/Home";
import LoginPopup from "./Client/Component/Desktop/Login/Login";
import LoginPage from "./Client/Component/Desktop/Login/Loginpage";
import DashboardPage from "./Admin/Pages/DashboardPage";
import AddProductPage from "./Admin/Pages/AddProductPage";
import Addpromotion from "./Admin/Pages/AddPromotionPage";
import EditProductPage from "./Admin/Pages/EditProductPage";
import EditPromotionPage from "./Admin/Pages/EditPromotionPage";  // ✅ นำเข้าไฟล์ EditPromotionPage
import Uuu from "./Admin/Pages/signup"  // ✅ นำเข้าไฟล์ Uuu
import Test from "./Admin/Pages/Test";  // ✅ นำเข้าไฟล์ Test
import Twse from "./Admin/Pages/Twse";  // ✅ นำเข้าไฟล์ Twse

function App() {
  const [setIsOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login-popup" element={<LoginPopup setIsOpen={setIsOpen} />} />
        <Route path="/loginPage" element={<LoginPage />} />

        {/* ✅ Protected User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/Test" element={<Test />} />  {/* ✅ เพิ่มเส้นทาง Uuu */}
        <Route path="/Twse" element={<Twse />} />  {/* ✅ เพิ่มเส้นทาง Uuu */}
        <Route path="/uuu" element={<Uuu />} />  {/* ✅ เพิ่มเส้นทาง Uuu */}

        {/* ✅ Protected Admin Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/add-promotion" element={<Addpromotion />} />
        <Route path="/edit-product/:productId" element={<EditProductPage />} />
        <Route path="/edit-promotion/:promotionId" element={<EditPromotionPage />} /> {/* ✅ เพิ่มเส้นทางแก้ไขโปรโมชั่น */}
      </Routes>
    </Router>
  );
}

export default App;
