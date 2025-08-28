// src/app/api/blog/[id]/route.js
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

// ================== DELETE ==================
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const pool = await getConnection();
    await pool
      .request()
      .input("id", id)
      .query("DELETE FROM blog WHERE id = @id");

    return NextResponse.json({ message: "Xoá thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi xoá blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ================== PUT (Cập nhật) ==================
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, title_1, images_1, title_2, images_2, title_3 } = body;

    const pool = await getConnection();
    await pool
      .request()
      .input("id", id)
      .input("name", name)
      .input("title_1", title_1)
      .input("images_1", images_1)
      .input("title_2", title_2)
      .input("images_2", images_2)
      .input("title_3", title_3)
      .query(`
        UPDATE blog 
        SET name=@name, title_1=@title_1, images_1=@images_1,
            title_2=@title_2, images_2=@images_2, title_3=@title_3
        WHERE id=@id
      `);

    return NextResponse.json({ message: "Cập nhật thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cập nhật blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM blog WHERE id = @id");

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: "Không tìm thấy blog" }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0], { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết blog:", error);
    return NextResponse.json(
      { error: "Lỗi server khi lấy chi tiết blog!" },
      { status: 500 }
    );
  }
}
