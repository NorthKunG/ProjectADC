import { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react";

export default function IOTProducts() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/newProducts/filter?category=${encodeURIComponent("IOT")}`)
      .then(response => setCount(response.data.count || 0))
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col justify-between min-w-[250px]">
      <div className="flex items-center gap-4 sm:justify-start justify-center">
        <div className="p-3 bg-gray-100 rounded-lg">
          <Users size={28} className="text-gray-700" />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-md text-gray-500 font-medium">IOT</p>
          <h3 className="text-2xl font-bold">
            {loading ? "Loading..." : error ? "Error" : count}
          </h3>
        </div>
      </div>
      <p className="text-green-500 text-sm font-medium mt-2 text-center sm:text-left">
        +2% from last month
      </p>
    </div>
  );
}
