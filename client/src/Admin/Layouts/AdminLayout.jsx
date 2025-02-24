import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gray-300 w-full">
      {/* ✅ Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* ✅ Layout Sidebar & Main Content */}
      <div className="flex pt-[80px]">
        {/* ✅ Sidebar */}
        <aside
          className={`${
            isOpen ? "block" : "hidden"
          } md:block w-64 h-[calc(100vh-80px)] bg-white shadow-lg z-10`}
        >
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </aside>

        {/* ✅ Main Content */}
        <main className="flex-grow p-5 overflow-y-auto bg-gray-100 rounded-2xl shadow-lg">
          {children} {/* ✅ ตรงนี้จะ render DashboardPage */}
        </main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
