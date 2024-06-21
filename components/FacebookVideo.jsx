import React from 'react';

const FacebookVideo = ({ videoUrl }) => {
  const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&width=734`;

  return (
    <div>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden', borderRadius: '8px' }}
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default FacebookVideo;

