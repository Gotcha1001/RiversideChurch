import React from 'react';
import Image from 'next/image';

export default function Worship() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-black to-white">
      <h1 className="text-4xl font-bold text-white mb-8">Worship</h1>
      <div className="w-64 h-64 rounded-full shadow-lg overflow-hidden">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdr1DMONakU9MUecTXVHg290MknEaXlFRhrA&s"
          alt="Worship"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
