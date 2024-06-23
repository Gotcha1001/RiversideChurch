import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Image from 'next/image'; // Import Image component from Next.js

export default function UpdatePrayerRequests() {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', content: '', picUrl: '' });

  useEffect(() => {
    const fetchPrayerRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'prayer-requests'));
      const requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrayerRequests(requests);
    };

    fetchPrayerRequests();
  }, []);

  const handleEdit = (request) => {
    setEditingRequest(request.id);
    setFormValues({ title: request.title, content: request.content, picUrl: request.picUrl });
  };

  const handleDelete = async (requestId) => {
    await deleteDoc(doc(db, 'prayer-requests', requestId));
    setPrayerRequests(prayerRequests.filter(request => request.id !== requestId));
  };

  const handleApprove = async (requestId) => {
    await updateDoc(doc(db, 'prayer-requests', requestId), { approved: true });
    setPrayerRequests(prayerRequests.map(request => 
      request.id === requestId ? { ...request, approved: true } : request
    ));
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'prayer-requests', editingRequest), formValues);
    setEditingRequest(null);
    setPrayerRequests(prayerRequests.map(request => 
      request.id === editingRequest ? { id: request.id, ...formValues } : request
    ));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
      <h1 className="text-4xl font-bold text-white my-8">Update Prayer Requests</h1>
      {editingRequest ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Edit Prayer Request</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Content:</label>
            <textarea
              name="content"
              value={formValues.content}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Picture URL:</label>
            <input
              type="text"
              name="picUrl"
              value={formValues.picUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="w-full max-w-2xl mt-8 bg-white p-6 rounded-lg shadow-md">
          {prayerRequests.map(request => (
            <div key={request.id} className="prayer-request-item mb-4 p-4 border-b border-gray-300 last:border-b-0">
              <h2 className="text-xl font-bold">{request.title}</h2>
              <p className="text-gray-700">{request.content}</p>
              {request.picUrl && (
  <div className="w-full h-80 mt-4 flex items-center justify-center">
    <Image
      src={request.picUrl}
      alt={request.title}
      width={300} // Adjust the width as needed
      height={200} // Adjust the height as needed
      objectFit="cover"
    />
  </div>
)}

              <p className="text-gray-500 text-sm mt-2">Submitted by: {request.userName}</p>
              <p className="text-gray-500 text-sm">Date: {new Date(request.date).toLocaleString()}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                  onClick={() => handleEdit(request)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(request.id)}
                >
                  Delete
                </button>
                {!request.approved && (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
