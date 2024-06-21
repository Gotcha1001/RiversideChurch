import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'; // Import the useRouter hook

export default function AddPost() {
  const [date, setDate] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [content, setContent] = useState('');
  const [likes, setLikes] = useState(0);
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'daily-posts'), {
        date,
        imgUrl,
        postedBy,
        content,
        likes,
      });
      setMessage('Post added successfully!');
      setDate('');
      setImgUrl('');
      setPostedBy('');
      setContent('');
      setLikes(0);
      router.push('/daily-posts'); // Redirect to the Daily Posts page
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Failed to add post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Daily Post</h2>
      {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
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
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Image URL:</label>
        <input
          type="text"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder="Image URL"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Posted By:</label>
        <input
          type="text"
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
          placeholder="Posted By"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Post
      </button>
    </form>
  );
}
