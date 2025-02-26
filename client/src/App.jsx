import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Client/Component/ProtectedRoute";
import CCTVPage from "./Client/Page/CCTVPage";

// 📄 Client Pages
import Home from "./Client/Page/Home";
import LoginPopup from "./Client/Component/Desktop/Login/Login";
import LoginPage from "./Client/Component/Desktop/Login/Loginpage";
import ProductPage from "./Client/Page/ProductPage";

// 📄 Admin Pages
import DashboardPage from "./Admin/Pages/DashboardPage";
import AddProductPage from "./Admin/Pages/AddProductPage";
import Addpromotion from "./Admin/Pages/AddPromotionPage";
import EditProductPage from "./Admin/Pages/EditProductPage";
import EditPromotionPage from "./Admin/Pages/EditPromotionPage";
import Uuu from "./Admin/Pages/signup";
import Test from "./Admin/Pages/Test";
import Twse from "./Admin/Pages/Twse";

function App() {
  const [setIsOpen] = useState(false);

  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login-popup" element={<LoginPopup setIsOpen={setIsOpen} />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cctv" element={<CCTVPage />} />

        {/* ✅ Protected User Routes (ต้องมี token + role = "user") */}
        <Route element={<ProtectedRoute roleRequired="user" />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* ✅ Protected Product Routes (ต้องมี token - ไม่จำกัด role) */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/products/:id" element={<ProductPage />} /> */}
          <Route path="/Test" element={<Test />} />
          <Route path="/Twse" element={<Twse />} />
          <Route path="/uuu" element={<Uuu />} />
        </Route>

        {/* ✅ Protected Admin Routes (ต้องมี token + role = "admin") */}
        <Route element={<ProtectedRoute roleRequired="admin" />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/add-promotion" element={<Addpromotion />} />
          <Route path="/edit-product/:productId" element={<EditProductPage />} />
          <Route path="/edit-promotion/:promotionId" element={<EditPromotionPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
