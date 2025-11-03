"use client";

import React, { useEffect, useState } from "react";

const AuthTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    level: "user",
  });

  // Lấy danh sách user
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://113.160.202.187:1985/api/auth/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Xoá user
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xoá user này?")) return;

    try {
      await fetch(`http://113.160.202.187:1985/api/auth/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Lỗi xoá user:", err);
    }
  };

  // Thêm user
  const handleAddUser = async () => {
    try {
      const res = await fetch("http://113.160.202.187:1989/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Lỗi khi thêm user");
        return;
      }
      alert("Thêm user thành công!");
      setShowModal(false);
      setNewUser({ username: "", password: "", email: "", level: "user" });
      fetchUsers(); // reload danh sách
    } catch (err) {
      console.error("Lỗi thêm user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-4">Đang tải danh sách...</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {/* Nút thêm user */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Thêm tài khoản
        </button>
      </div>

      {/* Bảng user */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Level</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
            >
              <td className="px-6 py-4">{u.id}</td>
              <td className="px-6 py-4">{u.username}</td>
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4">{u.level}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="font-medium text-red-600 hover:underline"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                Không có user nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal thêm user */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Thêm tài khoản mới</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <select
              value={newUser.level}
              onChange={(e) =>
                setNewUser({ ...newUser, level: e.target.value })
              }
              className="border p-2 w-full mb-4"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthTable;
