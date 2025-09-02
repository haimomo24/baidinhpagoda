'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (!savedAuth) {
      router.push("/login"); // ❌ chưa login thì về trang login
    } else {
      const parsed = JSON.parse(savedAuth);
      setUser(parsed.user); // ✅ lấy user từ auth
    }
  }, [router]);

  if (!user) return <p className="p-6">Đang kiểm tra đăng nhập...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Xin chào, {user.username}</h1>
      <p className="mt-2">Level: {user.level}</p>

      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("auth"); // ❌ xóa auth chứ không phải user
          router.push("/login");
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default DashboardPage;
