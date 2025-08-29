// src/app/api/visit/route.js
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const title_1 = formData.get("title_1");
    const title_2 = formData.get("title_2");
    const title_3 = formData.get("title_3");

    // Thư mục upload
    const uploadDir = path.join(process.cwd(), "public/uploads/visit");

    let images_1 = null;
    let images_2 = null;
    let image_3 = null;

    // Hàm xử lý lưu ảnh
    const saveFile = async (file) => {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        return `/uploads/visit/${fileName}`;
      }
      return null;
    };

    // Upload từng ảnh
    images_1 = await saveFile(formData.get("images_1"));
    images_2 = await saveFile(formData.get("images_2"));
    image_3 = await saveFile(formData.get("images_3")); 

    // Lưu vào DB
    const pool = await getConnection();
    await pool
      .request()
      .input("name", name)
      .input("title_1", title_1)
      .input("title_2", title_2)
      .input("title_3", title_3)
      .input("images_1", images_1)
      .input("images_2", images_2)
      .input("image_3", image_3) 
      .query(`
        INSERT INTO visit (name, title_1, title_2, title_3, images_1, images_2, image_3)
        VALUES (@name, @title_1, @title_2, @title_3, @images_1, @images_2, @image_3)
      `);

    return NextResponse.json({ message: "Thêm dữ liệu thành công" });
  } catch (error) {
    console.error("Error POST /visit:", error);
    return NextResponse.json({ error: "Lỗi khi thêm dữ liệu" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM visit ORDER BY id DESC");

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Error GET /visit:", error);
    return NextResponse.json({ error: "Lỗi khi lấy dữ liệu" }, { status: 500 });
  }
}