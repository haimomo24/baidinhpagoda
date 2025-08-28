// src/BlogPage.jsx
'use client'
import React from "react";

const BlogPage = () => {
  const blogs = [
    {
      img: "https://img.baoninhbinh.org.vn//DATA/ARTICLES/2023/6/18/khoa-tu-mua-he-chua-bai-dinh-to-chuc-le-hoa-dang-cau-nguyen-b1c42.jpg",
      title: "Khoá Tu Mùa hè ",
      desc: "Khoá tu mùa hè tại chùa Bái Đính là nơi để các bạn trẻ rèn luyện đạo đức, học tập giáo lý và trải nghiệm đời sống tinh thần an lạc."
    },
    {
      img: "https://media.vietnamplus.vn/images/ed1918d4cf848798286fdbd286ae25b406b95d2478e886d3f52ca07765bf691af594862dfc25ea3ffa4fe0d18c2da40987d5ccfc80f5147adb64a46c0c470127a333567bea3ce0aab61d0e875c1bdfe8ec9eef6a4146d0cc91025123fd1a0d38ff4fee10717dc99dc36b5fb5c8254a5a967e4317c60b3acfbb2a3ffed867c5b2/ttxvn-dong-dao-nguoi-dan-va-tin-do-phat-tu-chiem-bai-xa-loi-duc-phat-tai-chua-bai-dinh-8045339-7.jpg",
      title: "Xá Lợi Đức Phật",
      desc: "Sự kiện chiêm bái xá lợi Đức Phật thu hút đông đảo phật tử và du khách, mang ý nghĩa tâm linh to lớn."
    },
    {
      img: "https://storage.googleapis.com/teko-gae.appspot.com/media/image/2024/8/12/98179a30-a574-42b7-941d-41101371e292/Anh%20tin%20tuc%20%2812%29.png",
      title: "Lễ Vu Lan Báo hiếu",
      desc: "Lễ Vu Lan là dịp để tưởng nhớ công ơn sinh thành dưỡng dục của cha mẹ, gắn liền với tinh thần hiếu đạo."
    },
    {
      img: "https://cdn-i.doisongphapluat.com.vn/resize/th/upload/2024/08/09/ngay-le-vu-lan-bao-hieu-la-ngay-gi-nguon-goc-va-y-nghia-dspl-1-10102027.jpg",
      title: "Lễ Hội Hoa Đăng",
      desc: "Lễ hội Hoa Đăng mang đến khung cảnh lung linh huyền ảo với hàng ngàn ngọn đèn thắp sáng cầu nguyện bình an."
    },
    {
      img: "https://bizweb.dktcdn.net/100/349/716/files/bai-dinh-03.jpg?v=1565173213556",
      title: "Bái Đính Về Đêm",
      desc: "Khung cảnh Bái Đính về đêm rực rỡ ánh sáng, mang lại trải nghiệm độc đáo và thanh tịnh."
    },
    {
      img: "https://storage.googleapis.com/teko-gae.appspot.com/media/image/2024/8/12/98179a30-a574-42b7-941d-41101371e292/Anh%20tin%20tuc%20%2812%29.png",
      title: "Lễ Vu Lan Báo hiếu",
      desc: "Lễ Vu Lan là dịp để tưởng nhớ công ơn sinh thành dưỡng dục của cha mẹ, gắn liền với tinh thần hiếu đạo."
    }
  ];

  return (
    <div className="bg-[#FFFFFF] py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Bai Dinh complex</h2>

        {/* Grid 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden group cursor-pointer shadow-md">
              {/* Ảnh */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              {/* Nội dung */}
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
