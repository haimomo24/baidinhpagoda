"use client";
import React from "react";

export default function RestaurantPage() {
  return (
    <div className="w-full font-serif">
      {/* Hero */}
      <section className="relative">
        <img
          src="/images/3fab96ee3296b8c8e187.jpg"
          alt=""
          className="w-full h-[90vh] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
          <h1 className="text-5xl font-bold">NHÀ HÀNG CÁT TƯỜNG</h1>
          <p className="text-xl mt-2">CAT TUONG RESTAURANT</p>
        </div>
      </section>

      {/* Buffet Chay */}
      <section className="bg-[#FAE6CC]  py-16 text-center">
        <h2 className="text-4xl font-bold">BUFFET CHAY – NGÀY XANH LÁ</h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg leading-relaxed">
          Nhà hàng Cát Tường với mong muốn lan tỏa văn hóa chay tới thực khách...
        </p>
        <p className="mt-4 italic">
          Thân mời Quý khách ghé nhà hàng dùng một bữa chay lành thay...
        </p>
        <div className="mt-6 font-bold">
          Hotline: <span className="">091 613 8692</span>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          <img src="/images/397cd5a83dd8b786eec9.jpg" className="rounded-lg" />
          <img src="/images/8ef54698a4e82eb677f9.jpg" className="rounded-lg" />
          <img src="/images/518ad8073f77b529ec66.jpg" className="rounded-lg" />
        </div>
      </section>
      {/* Tráng miệng */}
     <section className="text-emerald-900 py-16 flex flex-wrap items-center justify-center">
  {/* Cột ảnh */}
  <div className="w-full md:w-1/2 px-10 flex justify-center">
    <img
      src="/images/518ad8073f77b529ec66.jpg"
      className="max-w-md w-full object-cover rounded-2xl"
      alt="Tráng miệng"
    />
  </div>

  {/* Cột chữ */}
  <div className="w-full md:w-1/2 px-10">
    <h2 className="text-4xl font-bold mb-6">TRÁNG MIỆNG & THỨC UỐNG</h2>
    <p className="text-lg leading-relaxed">
      “Thức quả” gợi nhớ tuổi thơ, đong đầy “hương vị vượt thời gian”...
    </p>
  </div>
</section>


      {/* Lẩu */}
    <section className="bg-[#FAE6CC] py-16 flex justify-center">
  <div className="flex items-center gap-8 max-w-6xl w-full px-6">
    {/* Cột chữ */}
    <div className=" max-w-lg">
      <h2 className="text-4xl font-bold mb-6">LẨU</h2>
      <ul className="space-y-6 text-lg">
        <li>
          <span className="font-semibold">• Lẩu chay</span> <br />
          Nấm các loại, rau củ các loại, đậu phụ, váng đậu, bún miến.
        </li>
        <li>
          <span className="font-semibold">• Lẩu riêu cua bắp bò</span> <br />
          Bắp bò, sườn non, đậu phụ, nấm các loại, rau củ các loại, váng đậu, bún.
        </li>
        <li>
          <span className="font-semibold">• Lẩu Thái hải sản thập cẩm</span> <br />
          Tôm, mực, cá, nấm, rau củ các loại, đậu phụ, váng đậu, bún.
        </li>
      </ul>
    </div>

    {/* Cột ảnh */}
    <div className="flex-shrink-0">
      <img
        src="/images/e5810ef0ec8066de3f91.jpg"
        className="rounded-l-[80px] max-w-md object-cover"
        alt="Lẩu"
      />
    </div>
  </div>
</section>


      {/* Mâm cơm */}
     <section className="py-16 flex flex-wrap items-center justify-center text-emerald-900">
  {/* Cột ảnh */}
  <div className="w-full md:w-1/2 px-10 flex justify-center">
    <img
      src="/images/5b9a212ec95e43001a4f.jpg"
      className="rounded-2xl max-w-md w-full object-cover"
      alt="Mâm cơm đãi khách"
    />
  </div>

  {/* Cột chữ */}
  <div className="w-full md:w-1/2 px-10">
    <h2 className="text-4xl font-bold mb-6">MÂM CƠM ĐÃI KHÁCH</h2>
    <p className="text-lg leading-relaxed">
      Trong miền kí ức mỗi người sẽ có định nghĩa mâm cơm tuổi thơ khác nhau...
    </p>
  </div>
</section>


      {/* Thực đơn */}
      <section className="bg-[#FAE6CC] text-emerald-900 py-16 text-center">
        <h2 className="text-4xl font-bold">THỰC ĐƠN</h2>
        <p className="mt-4 mb-[50px] text-lg">Chỉ từ <span className="text-3xl">50.000 VND</span></p>
         <a
      href="https://heyzine.com/flip-book/b84f7cb6c2.html#page/1" 
      className="border px-6 py-2 rounded-lg hover:bg-emerald-900 mt-[20px] hover:text-white transition"
      target="_blank"
    >
      MENU BOOK
    </a>
      </section>

      {/* Liên hệ */}
      <section className="bg-gray-200 py-12 px-6 flex justify-center">
  <div className="flex flex-wrap w-full max-w-5xl">
    {/* Cột bên trái */}
    <div className="w-full md:w-1/2 md:pr-6 flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-4">LIÊN HỆ ĐẶT BÀN</h2>
      <p className="mb-2">Hotline: 0916 138 692</p>
      <p className="mb-2">Địa chỉ: Phường Tây hoa Lư , Ninh Bình </p>
    </div>

    {/* Cột bên phải */}
    <div className="w-full md:w-1/2">
      <form className="grid gap-3">
        <input
          type="text"
          placeholder="Your name"
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Your phone"
          className="p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Your email"
          className="p-3 border rounded-lg"
        />
        <textarea
          placeholder="Message"
          className="p-3 border rounded-lg h-28"
        />
        <button className="border px-6 py-2 rounded-lg hover:bg-emerald-900 hover:text-white transition">
          SUBMIT
        </button>
      </form>
    </div>
  </div>
</section>


      
      
    </div>
  );
}
