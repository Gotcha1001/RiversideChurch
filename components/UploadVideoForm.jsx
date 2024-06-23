import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '@/utils/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UploadVideoForm = ({ onVideoUploaded }) => {
  const [title, setTitle] = useState('');
  const [sermonBy, setSermonBy] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const canEmbed = await checkEmbedPermission(videoUrl);

    try {
      await addDoc(collection(db, 'facebook-video'), {
        title,
        sermonBy,
        videoUrl,
        content,
        date,
        userName,
        embeddable: canEmbed
      });

      setTitle('');
      setSermonBy('');
      setVideoUrl('');
      setContent('');
      setDate('');
      setError(null);

      // Notify parent component that a new video has been uploaded
      onVideoUploaded();

      // Redirect to the facebook-live page
      router.push('/facebook-live');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkEmbedPermission = async (url) => {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=734`;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      iframe.onload = () => {
        resolve(true);
        document.body.removeChild(iframe);
      };

      iframe.onerror = () => {
        resolve(false);
        document.body.removeChild(iframe);
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Sermon By:</label>
        <input
          type="text"
          value={sermonBy}
          onChange={(e) => setSermonBy(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Video URL:</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default UploadVideoForm;
