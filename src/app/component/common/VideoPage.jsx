import React from 'react';

const VideoPage = () => {
  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col mb-[-200px] items-center p-6">
      
      

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
