import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;  // ✅ params phải await
    const pool = await getConnection();

    // Lấy ảnh trong DB
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT images_1, images_2, image_3 FROM visit WHERE id=@id");

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: "Không tìm thấy blog" }, { status: 404 });
    }

    const blog = result.recordset[0];
    const uploadDir = path.join(process.cwd(), "public");

    // Xoá file
    for (const img of [blog.images_1, blog.images_2, blog.image_3]) {
      if (img) {
        // Nếu DB đã lưu kèm 'uploads/visit/...' thì chỉ cần join với public
        const filePath = path.join(uploadDir, img);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.warn("Không xoá được file:", filePath, err.message);
        }
      }
    }

    // Xoá DB record
    await pool.request().input("id", id).query("DELETE FROM visit WHERE id=@id");

    return NextResponse.json({ message: "Xoá blog thành công" });
  } catch (error) {
    console.error("Lỗi xoá blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
