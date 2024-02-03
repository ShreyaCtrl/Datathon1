import React from 'react';
import ReactPlayer from 'react-player';

const VideoBackground = () => {
  return (
    <div className="video-background">
      <ReactPlayer
       url={`${process.env.PUBLIC_URL}/img/video.mp4`} // Replace with your video URL
        playing
        loop
        muted
        className='hu'
        width="100vw"
        height="100vh"
      />
    </div>
  );
};

export default VideoBackground;
