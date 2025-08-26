// src/app/api/blog/route.js
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Lấy đúng tên field từ frontend
    const name = formData.get("name");
    const title_1 = formData.get("title_1");
    const title_2 = formData.get("title_2");
    const title_3 = formData.get("title_3");

    const images_1 = formData.get("images_1"); // file
    const images_2 = formData.get("images_2"); // file

    if (!name) {
      return NextResponse.json(
        { error: "Thiếu dữ liệu bắt buộc: name" },
        { status: 400 }
      );
    }

    const image1Name = images_1 instanceof File ? images_1.name : null;
    const image2Name = images_2 instanceof File ? images_2.name : null;

    const pool = await getConnection();

    await pool
      .request()
      .input("name", name)
      .input("images_1", image1Name)
      .input("images_2", image2Name)
      .input("title_1", title_1)
      .input("title_2", title_2)
      .input("title_3", title_3)
      .query(`
        INSERT INTO blog (name, images_1, images_2, title_1, title_2, title_3)
        VALUES (@name, @images_1, @images_2, @title_1, @title_2, @title_3)
      `);

    return NextResponse.json(
      { message: "Thêm blog thành công!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi khi thêm blog:", error);
    return NextResponse.json(
      { error: "Lỗi server khi thêm blog!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM blog ORDER BY id DESC");

    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy blog:", error);
    return NextResponse.json(
      { error: "Lỗi server khi lấy dữ liệu!" },
      { status: 500 }
    );
  }
}
