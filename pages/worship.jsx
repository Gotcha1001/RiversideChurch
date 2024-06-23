import React from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import Pic2 from '../public/pic2.jpg';
import Pic3 from '../public/pic3.jpg';
import Pic4 from '../public/pic4.jpg';

export default function Worship() {
  const audioUrl = '/Nature.mp3'; // Path to your audio file in the public folder

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-black to-white pt-20">
      <h1 className="text-4xl font-bold text-white mb-8">Worship</h1>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdr1DMONakU9MUecTXVHg290MknEaXlFRhrA&s"
        alt="Worship"
        width={256} // specify the actual width of the image
        height={256} // specify the actual height of the image
        className="w-64 h-64 object-cover rounded-full shadow-lg mb-8 transition-transform transform hover:scale-110"
      />
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-8 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-black mb-4">What is Worship?</h2>
        <p className="text-lg text-gray-700 text-center hover:text-teal-500 transition duration-300">
          Worship is the heart&apos;s cry of gratitude and love,<br/>
          A sacred moment with the divine above.<br/>
          It&apos;s in the whispers of the soul at peace,<br/>
          In songs of joy that never cease.<br/>
          Worship is more than words can say,<br/>
          It&apos;s a life lived in a holy way.<br/>
        </p>
      </div>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-8 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-black mb-4">True Worship</h2>
        <p className="text-lg text-gray-700 text-center hover:text-teal-500 transition duration-300">
          True worship is not just a song,<br/>
          Nor the words we sing along.<br/>
          It&apos;s a heart that&apos;s pure and true,<br/>
          Giving all to God, in all we do.<br/>
          It&apos;s a surrender of self, a humble bow,<br/>
          Trusting in God, here and now.<br/>
        </p>
      </div>

      {/* Repeat for other text sections */}

      <div className="w-full max-w-screen-sm mx-auto">
        <Carousel interval={1000} controls={false} indicators={false} style={{ maxWidth: '800px', marginTop: '15px', marginBottom: '50px' }}>
          <Carousel.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image src={Pic2} alt="Image Alt Text" width={800} height={500} style={{ borderRadius: '10px', objectFit: 'cover' }} />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image src={Pic3} alt="Image Alt Text" width={800} height={500} style={{ borderRadius: '10px', objectFit: 'cover' }} />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image src={Pic4} alt="Image Alt Text" width={800} height={500} style={{ borderRadius: '10px', objectFit: 'cover' }} />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <audio controls autoPlay>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
