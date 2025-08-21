import React from "react";

const placesData = [
  { title: "Điện Tam Thế ", img: "images/tamthe/ĐIỆN TAM THẾ.jpg" },
  { title: "Tượng Phật Di Lặc", img: "https://vrtour.vn/assets/templates/places/03-bc2b388af21f918ccb3d7e1f1dcdbb7b4318466772f26a0dddf29c15e3fc8dcf.jpg" },
  { title: "Hành Lang La Hán ", img: "https://cdn.baogialai.com.vn/images/5d93661b5836672daa8629aec90c6a0bf612943c151dbc9ed94825747e54d2ef1aab495fd4cb10a7c1c6b88f809ac76d8d7c137ec98562003490c77416036c7f/images2700509_12c.jpg" },
  { title: "Bát Chính Đạo", img: "/images/batchinhdao.JPG" },
  { title: "Cafe Chuông Gió", img: "/images/cafechuonggio.JPG" },
  { title: "Chùa Cổ", img: "/images/chuaco.jpg" },
  { title: "Bảo Tháp", img: "/images/baothap.JPG" },
  { title: "Xe Điện", img: "https://vcdn1-dulich.vnecdn.net/2025/02/07/xe-dien1-1736930491-1657-1738896489.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=rz6XC6Jvu6GsHiNyPnKrkQ" },
  { title: "Xá Lợi Đức Phật", img: "https://nld.mediacdn.vn/zoom/700_438/291774122806476800/2025/5/20/49832383311645949290413943455401801062219134n-17475391273651256308037-0-0-1010-1616-crop-1747752265291503412795.jpg" },
  { title: "Khách Sạn ", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/11/61/48/20171023-054359-hdr-largejpg.jpg?w=1000&h=-1&s=1" },
];

const FamousPlaces = () => {
  return (
    <div className="max-w-[1200px] mt-[-100px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 ">Địa Điểm Tham Quan </h1>

      {/* Hàng 1 */}
      <div className="flex gap-4 mb-4">
        {/* Ô lớn bên trái */}
        <div className="flex-1 relative overflow-hidden rounded-lg" style={{ height: "400px" }}>
          <img
            src={placesData[0].img}
            alt={placesData[0].title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
            {placesData[0].title}
          </div>
        </div>

        {/* 4 ô nhỏ bên phải */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {placesData.slice(1, 5).map((place, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-lg" style={{ height: "195px" }}>
              <img
                src={place.img}
                alt={place.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                {place.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hàng 2 */}
      <div className="flex gap-4">
        {/* 4 ô nhỏ bên trái */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {placesData.slice(5, 9).map((place, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-lg" style={{ height: "195px" }}>
              <img
                src={place.img}
                alt={place.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                {place.title}
              </div>
            </div>
          ))}
        </div>

        {/* Ô lớn bên phải */}
        <div className="flex-1 relative overflow-hidden rounded-lg" style={{ height: "400px" }}>
          <img
            src={placesData[9].img}
            alt={placesData[9].title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
            {placesData[9].title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamousPlaces;
