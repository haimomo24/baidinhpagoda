import React from 'react';

const VideoPage = () => {
  return (
    <div className="bg-[#F1EBE5]/70 flex flex-col items-center p-6">
      
      {/* Tiêu đề với đường kẻ ngang */}
      <div className="w-full max-w-6xl flex items-center mb-6">
        <h2 className="hover-shake hover:text-red-600 text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center md:text-left">
          Giới thiệu về Chùa Bái Đính
        </h2>
        
        <hr className="flex-1 border-t-4 border-[#356D3D]" />
      </div>

      {/* Khung nhúng video */}
      <div className="w-full max-w-6xl aspect-video mb-4">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/vmiRrM145TI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
};

export default VideoPage;
