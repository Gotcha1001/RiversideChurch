import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image'; // Import Image component from Next.js

export default function DailyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'daily-posts'));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
        console.log('Posts fetched successfully:', postsData);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId, currentLikes) => {
    try {
      const postRef = doc(db, 'daily-posts', postId);
      await updateDoc(postRef, {
        likes: currentLikes + 1
      });

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, likes: currentLikes + 1 } : post
        )
      );
    } catch (err) {
      console.error('Error updating likes:', err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
      <h1 className="text-4xl font-bold text-white my-8 mt-16 zoom">Daily Quotes</h1>
      <div className="daily-posts-list w-full max-w-2xl mt-1">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div 
              key={index} 
              className="daily-post-item mb-4 p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <p className="text-2xl font-bold mb-2">Date Posted: {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              {post.imgUrl && (
  <div className="w-full h-96 mb-4 rounded overflow-hidden flex justify-center items-center"> {/* Added flex and justify-center items-center */}
    <Image src={post.imgUrl} alt="Post Image" width={500} height={300} objectFit="cover" className="transition transform hover:wobble" />
  </div>
)}


              <p className="text-gray-700 mb-4">Content: {post.content}</p>
              <p className="text-gray-500 text-sm mb-2">Posted by: {post.postedBy}</p>
              <div className="flex items-center">
                <p className="text-gray-500 text-sm mr-2">Likes: {post.likes}</p>
                <button
                  onClick={() => handleLike(post.id, post.likes)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                >
                  Like
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No posts available</p>
        )}
      </div>
    </div>
  );
}
