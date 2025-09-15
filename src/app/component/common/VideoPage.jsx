import React from 'react';

const VideoPage = () => {
  return (
    <div className="bg-[#F1EBE5]/70 flex flex-col items-center p-6">
      
      {/* Tiêu đề với đường kẻ ngang */}
      <div className="w-full max-w-6xl flex items-center mb-6">
      <h2 className="relative inline-block mb-6 select-none 
               text-2xl sm:text-2xl lg:text-3xl font-bold 
               text-[#176734] text-center md:text-left 
               px-8 py-2 
               bg-gradient-to-r from-stone-200 via-amber-200 to-stone-400
               rounded-lg 
               shadow-[0_6px_16px_rgba(0,0,0,0.25)]
               transition-all duration-300 ease-out
               hover:scale-105 hover:text-red-600 hover:shadow-[0_10px_20px_rgba(0,0,0,0.45)]">
  GIỚI THIỆU VỀ CHÙA BÁI ĐÍNH
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
           style={{ boxShadow: "30px 20px 20px rgba(0, 0, 0, 0.5)" }}
        ></iframe>
      </div>

    </div>
  );
};

export default VideoPage;
