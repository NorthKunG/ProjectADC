import { useState } from "react";
import NavbarDesktop from "../Component/Desktop/Navbar/NavbarDesktop";
import NavbarMobile from "../Component/Mobile/Navbar-Mobile/NavbarMobile";
import ImageSlider from "../Component/Desktop/Promotion and BrandSlider/ImageSlider";
import LatestProducts from "./LatestProducts";
import LoginPage from "../Component/Desktop/Login/Login"; // ✅ นำเข้า Pop-up Login

function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // ✅ ควบคุม Pop-up Login

  return (
    <>
      <NavbarDesktop onLoginClick={() => setIsLoginOpen(true)} /> {/* ✅ ส่ง onLoginClick */}
        {/* ✅ แสดง Pop-up Login เมื่อ isLoginOpen = true */}
      {isLoginOpen && <LoginPage setIsOpen={setIsLoginOpen} />}
      <NavbarMobile />
      <ImageSlider />
      <LatestProducts />

    </>
  );
}

export default Home;
