import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Image from 'next/image'; // Import Image component from Next.js

export default function UpdateDailyPost() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'daily-posts'));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleUpdateClick = (post) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (postId) => {
    try {
      await deleteDoc(doc(db, 'daily-posts', postId));
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const { id, date, content, imgUrl, likes, postedBy } = selectedPost;
    try {
      const postRef = doc(db, 'daily-posts', id);
      await updateDoc(postRef, {
        date,
        content,
        imgUrl,
        likes,
        postedBy
      });
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedPost(prevPost => ({
      ...prevPost,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
      <h1 className="text-4xl font-bold text-white my-8 mt-16">Update Daily Posts</h1>
      <div className="daily-posts-list w-full max-w-2xl mt-1">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-4"
            >
              <h2 className="text-2xl font-bold mb-4">{post.content}</h2>
              <p className="mb-4"><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
              <p className="mb-4"><strong>Posted By:</strong> {post.postedBy}</p>
              {post.imgUrl && (
  <div className="mb-4 flex justify-center">
    <Image src={post.imgUrl} alt="Post" width={200} height={150} className="w-full h-auto rounded-lg" />
  </div>
)}

              <button
                className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleUpdateClick(post)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={() => handleDeleteClick(post.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No daily posts available.</p>
        )}
      </div>

      {isDialogOpen && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Update Post</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={new Date(selectedPost.date).toISOString().split('T')[0]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content:</label>
                <textarea
                  id="content"
                  name="content"
                  value={selectedPost.content}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imgUrl" className="block text-gray-700 font-bold mb-2">Image URL:</label>
                <input
                  type="text"
                  id="imgUrl"
                  name="imgUrl"
                  value={selectedPost.imgUrl}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {selectedPost.imgUrl && (
                  <div className="mt-4 flex justify-center">
                    <Image src={selectedPost.imgUrl} alt="Post" width={150} height={150} className="w-32 h-auto rounded-lg" />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="likes" className="block text-gray-700 font-bold mb-2">Likes:</label>
                <input
                  type="number"
                  id="likes"
                  name="likes"
                  value={selectedPost.likes}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="postedBy" className="block text-gray-700 font-bold mb-2">Posted By:</label>
                <input
                  type="text"
                  id="postedBy"
                  name="postedBy"
                  value={selectedPost.postedBy}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
