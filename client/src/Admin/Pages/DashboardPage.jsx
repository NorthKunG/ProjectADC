import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบว่า token อยู่ใน localStorage หรือไม่
    const token = localStorage.getItem("token");
    if (!token) {
      // ถ้าไม่มี token, นำทางไปที่หน้า login
      navigate("/loginPage");
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="p-5">
        {/* ✅ ส่วนหัว Dashboard */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to the Admin Dashboard.</p>

        {/* ✅ การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$50,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">New Orders</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">245</p>
          </div>
        </div>

        {/* ✅ ตารางข้อมูล */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Users</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">John Doe</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">john@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Jane Smith</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">jane@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400">Inactive</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-2 border border-gray-300 dark:border-gray-600">Mike Johnson</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">mike@example.com</td>
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400">Active</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ✅ กราฟแสดงผล (ตัวอย่าง) */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Sales Report</h2>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Graph Placeholder]
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
