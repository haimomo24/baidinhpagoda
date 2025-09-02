import React from 'react';

const VideoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col mb-[-200px] items-center p-6">
      {/* Tiêu đề video */}
      <h1 className="text-3xl font-bold mb-6 text-center">Tên Video YouTube</h1>

      {/* Khung nhúng video */}
      <div className="w-full max-w-4xl aspect-video mb-4">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/VIDEO_ID" // thay VIDEO_ID bằng ID video
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Mô tả video */}
      <p className="max-w-4xl text-gray-700 text-center">
        Đây là mô tả video. Bạn có thể thêm thông tin chi tiết, link, hoặc hướng dẫn liên quan đến video.
      </p>
    </div>
  );
};

export default VideoPage;
