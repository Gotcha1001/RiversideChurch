import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Image from 'next/image'; // Import Image component from Next.js

const PrayerRequests = () => {
  const [prayerRequests, setPrayerRequests] = useState([]);

  const fetchPrayerRequests = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'prayer-requests'));
    const requests = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(request => request.approved); // Filter only approved requests
    setPrayerRequests(requests);
  }, []);

  useEffect(() => {
    fetchPrayerRequests();
  }, [fetchPrayerRequests]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
      <h1 className="text-4xl font-bold text-white my-8">Prayer Requests</h1>
      <div className="prayer-requests-list w-full max-w-2xl mt-8">
        {prayerRequests.map(request => (
          <div key={request.id} className="prayer-request-item mb-4 p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">{request.title}</h2>
            <p className="text-gray-700 mb-4">{request.content}</p>
            {request.picUrl && (
              <div className="w-full h-80 mb-4 rounded overflow-hidden"> {/* Adjusted height to h-80 */}
                <Image
                  src={request.picUrl}
                  alt={request.title}
                  width={300} // Adjust width as needed
                  height={200} // Adjust height as needed
                  objectFit="contain" // Changed objectFit to contain
                  className="object-contain w-full h-full transition transform hover:scale-110"
                  style={{
                    '@media (min-width: 1024px)': {
                      width: '600px',
                      height: '400px',
                    },
                  }}
                />
              </div>
            )}
            <p className="text-gray-500 text-sm mb-2">Submitted by: {request.userName}</p>
            <p className="text-gray-500 text-sm">Date: {new Date(request.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerRequests;
