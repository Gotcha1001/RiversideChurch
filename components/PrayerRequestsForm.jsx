import React, { useState, useEffect } from 'react';
import { db, auth } from '../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image'; // Import Image component from Next.js

const PrayerRequestForm = ({ onRequestAdded, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [picUrl, setPicUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

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

    try {
      await addDoc(collection(db, 'prayer-requests'), {
        userName,
        title,
        content,
        picUrl,
        date: new Date().toISOString(),
      });

      setTitle('');
      setContent('');
      setPicUrl('');
      setError(null);

      // Notify parent component that a new request has been added
      onRequestAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Submit a Prayer Request</h2>
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
        <label className="block text-gray-700 font-semibold mb-2">Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Enter your prayer request here..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Picture URL:</label>
        <input
          type="text"
          value={picUrl}
          onChange={(e) => setPicUrl(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {picUrl && (
        <div className="mb-4">
          <Image src={picUrl} alt="Prayer Request Image" width={400} height={300} />
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default PrayerRequestForm;
