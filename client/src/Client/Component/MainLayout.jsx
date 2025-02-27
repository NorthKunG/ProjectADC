import { Outlet } from 'react-router-dom';
import { useState } from 'react'; // ✅ เพิ่ม useState
import NavbarDesktop from "../Component/Desktop/Navbar/NavbarDesktop"; // นำเข้า Navbar
import Footer from "./Footer"; // นำเข้า Footer
import BottomNavigation from "./Mobile/BottomNavigation"; // นำเข้า Bottom Navigation
import LoginPage from "../Component/Desktop/Login/Login"; // ✅ นำเข้า Pop-up Logi
import NavbarMobile from "./Mobile/NavbarMobile"

const MainLayout = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // ✅ ควบคุม Pop-up Login

  return (
    <>
      {/* ✅ Navbar จะแสดงในทุกหน้า */}
       <NavbarDesktop onLoginClick={() => setIsLoginOpen(true)} /> {/* ✅ ส่ง onLoginClick */}
              {/* ✅ แสดง Pop-up Login เมื่อ isLoginOpen = true */}
            {isLoginOpen && <LoginPage setIsOpen={setIsLoginOpen} />}
      <NavbarMobile/>

      {/* ✅ เนื้อหาของแต่ละหน้า */}
      
        <Outlet />
      

      {/* ✅ Bottom Navigation จะแสดงในทุกหน้า */}
      <BottomNavigation />

      {/* ✅ Footer จะแสดงในทุกหน้า */}
      <Footer />
    </>
  );
};

export default MainLayout;
