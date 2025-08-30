'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/login"); // ❌ chưa login thì về trang login
    } else {
      setUser(JSON.parse(savedUser));
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
          localStorage.removeItem("user");
          router.push("/login");
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default DashboardPage;
