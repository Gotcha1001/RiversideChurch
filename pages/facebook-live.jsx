import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import FacebookVideo from '../components/FacebookVideo'; // Adjust the path if necessary

export default function FacebookLive() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, 'facebook-video'));
      const videoList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(videoList);
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Facebook Recorded Services</h1>
      {videos.map((video) => (
        <div
          key={video.id}
          className="card-content mb-8 bg-teal-500 p-4 rounded-lg mx-auto w-full lg:w-2/3"
        >
          <h2 className="text-2xl font-bold text-white">{video.title}</h2>
          <p className="text-lg text-gray-300 mb-1">Sermon By: {video.sermonBy}</p>
          <p className="text-lg text-gray-300 mb-1">Date: {new Date(video.date).toLocaleDateString()}</p>
          {video.embeddable ? (
            <div className="video-container">
              <FacebookVideo videoUrl={video.videoUrl} />
            </div>
          ) : (
            <p className="text-red-500">
              This video cannot be embedded. You can watch it{' '}
              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                here
              </a>.
            </p>
          )}
          <p className="text-gray-300 mt-4">{video.content}</p>
        </div>
      ))}
    </div>
  );
}
