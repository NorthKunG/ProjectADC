// src/components/Nav/Banners.jsx
import { Phone } from 'lucide-react';
import LanguageDropdown from "./LanguageDropdown";

function Banners() {
  return (
    // hidden sm:block = ซ่อนบนจอเล็ก แสดงเฉพาะจอ ≥640px
    <div className="hidden md:block bg-white  px-2 py-0 text-black">
      {/* 
        layout-wrapper ถ้ามี (หรือจะตัดออกไปใช้ flex ตรง ๆ ก็ได้)
        แล้วใส่ flex justify-between เพื่อจัดซ้ายเป็นเบอร์โทร ขวาเป็น dropdown 
      */}
      <div className=" flex items-center justify-between text-sm font-medium mx-20">
        {/* ด้านซ้าย = เบอร์โทร */}
        <div className="flex items-center gap-3 text-sm">
          <Phone />
          <span>055-055-589</span>
          <span>089-359-6456</span>
        </div>

        {/* ด้านขวา = Dropdown เปลี่ยนภาษา */}
        <LanguageDropdown />
      </div>
    </div>
  );
}

export default Banners;
