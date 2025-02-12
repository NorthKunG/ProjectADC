import React from "react";

export default function CardLayout() {
  return (
    <div className="flex gap-[2%] flex-wrap p-4 min-h-screen">
      <div className="w-[23.5%] h-[23.5%] bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">1</div>
      <div className="w-[23.5%] h-[23.5%] bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">2</div>
      <div className="w-[23.5%] h-[23.5%] bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">3</div>
      <div className="w-[23.5%] h-[23.5%] bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">4</div>
    </div>
  );
}