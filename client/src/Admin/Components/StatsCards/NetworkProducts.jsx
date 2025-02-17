import { useEffect, useState } from "react";
import axios from "axios";
import { Wifi } from "lucide-react";

export default function NetworkProducts() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/newProducts/filter?category=${encodeURIComponent("Network")}`)
      .then(response => setCount(response.data.count || 0))
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center min-w-[250px]">
      {/* หมวดหมู่ + ไอคอน */}
      <div className="flex items-center gap-4 ">
        <div className="p-3 bg-gray-100 rounded-lg">
          <Wifi size={28} className="text-gray-700" />
        </div>
        <p className="text-md text-gray-500 font-medium">Network</p>
      </div>

      {/* จำนวนสินค้า */}
      <div className="flex flex-col items-end gap-1">
        <p className="text-sm text-gray-500">จำนวนสินค้า</p>
        <h3 className="text-3xl font-bold text-green-500">
          {loading ? "..." : error ? "Error" : count}
        </h3>
      </div>
    </div>
  );
}
