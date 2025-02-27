import { useEffect, useState } from "react";
import axios from "axios";
import { Search, ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/users?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.users || []);
      setTotalPages(Math.ceil(response.data.totalUsers / limit));
    } catch (error) {
      console.error("❌ โหลดข้อมูลล้มเหลว:", error.response?.data || error.message);
      setError(error.response?.data?.message || "โหลดข้อมูลล้มเหลว");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    const confirm = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ต้องการลบผู้ใช้นี้จริงหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (confirm.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== userId));
        Swal.fire("ลบสำเร็จ!", "ผู้ใช้ถูกลบเรียบร้อยแล้ว", "success");
      } catch (error) {
        console.error("❌ ลบไม่สำเร็จ:", error);
        Swal.fire("เกิดข้อผิดพลาด", error.response?.data?.message || "ลบไม่สำเร็จ", "error");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold">ผู้ใช้ทั้งหมด</h3>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:ring focus:ring-blue-200 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">กำลังโหลด...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">ไม่มีข้อมูลผู้ใช้</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-blue-600 text-white text-xs sm:text-sm">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">ชื่อ</th>
                  <th className="p-3 text-left">อีเมล์</th>
                  <th className="p-3 text-left">เบอร์โทร</th>
                  <th className="p-3 text-left">บริษัท</th>
                  <th className="p-3 text-left">ที่อยู่</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-center">แก้ไข</th>
                  <th className="p-3 text-center">ลบ</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{(page - 1) * limit + index + 1}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phoneNumber}</td>
                      <td className="p-3">{user.companyName}</td>
                      <td className="p-3">{user.address}</td>
                      <td className="p-3">{user.role || "-"}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => navigate(`/edit-user/${user._id}`)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 text-sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft size={16} /> ก่อนหน้า
            </button>
            <span className="text-gray-700 text-sm">
              หน้าที่ {page} / {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 text-sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              ถัดไป <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
