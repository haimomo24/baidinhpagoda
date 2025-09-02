"use client";
import AuthTable from '@/app/component/dashboard/AuthTable';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [status, setStatus] = useState("checking"); // checking | unauthorized | forbidden | ok

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (!stored) {
      setStatus("unauthorized");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (!parsed.user) {
        setStatus("unauthorized");
        return;
      }

      // Lấy level từ parsed.user.level
      if (parsed.user.level === "admin") {
        setStatus("ok");
      } else {
        setStatus("forbidden");
      }
    } catch (e) {
      setStatus("unauthorized");
    }
  }, []);

  if (status === "checking") return <p>Đang kiểm tra...</p>;
  if (status === "unauthorized") return <p>Bạn chưa đăng nhập.</p>;
  if (status === "forbidden") return <p>Bạn không có quyền xem trang này.</p>;

  return (
    <div>
      <AuthTable />
    </div>
  );
};

export default Page;
