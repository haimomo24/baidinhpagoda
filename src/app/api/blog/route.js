// src/app/api/blog/route.js
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

// ================== POST: Thêm Blog ==================
export async function POST(req) {
  try {
    const formData = await req.formData();

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

    // Lưu file vào thư mục public/uploads
    let image1Name = null;
    if (images_1 && images_1 instanceof File) {
      const bytes = await images_1.arrayBuffer();
      const buffer = Buffer.from(bytes);
      image1Name = Date.now() + "-" + images_1.name; // tránh trùng tên
      const filePath = path.join(process.cwd(), "public/uploads", image1Name);
      await writeFile(filePath, buffer);
    }

    let image2Name = null;
    if (images_2 && images_2 instanceof File) {
      const bytes = await images_2.arrayBuffer();
      const buffer = Buffer.from(bytes);
      image2Name = Date.now() + "-" + images_2.name;
      const filePath = path.join(process.cwd(), "public/uploads", image2Name);
      await writeFile(filePath, buffer);
    }

    // Lưu vào database
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

// ================== GET: Lấy danh sách Blog ==================
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
