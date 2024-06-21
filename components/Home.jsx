import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import HomeImage from '../public/HomeImage.jpg';
import Pic2 from '../public/pic2.jpg';
import Pic3 from '../public/pic3.jpg';
import Pic4 from '../public/pic4.jpg';


const Home = () => {
  return (
    <div className="home flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2 mt-3">Welcome to Riverside Home Page</h1>
        <h2 className="text-lg text-gray-300 mb-4">Life is loving</h2>
        <div className="relative  rounded-lg overflow-hidden p-3 sm:p-5 zoom">
          <Image src={HomeImage} alt="Home Image" width={500} height={500} style={{ borderRadius: '20px', objectFit: 'cover' }} />
        </div>
        <a href="https://www.facebook.com/Riversidechurchwestville1" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline block mt-4 text-lg">Visit us on Facebook</a>
      </div>

      <Carousel interval={1000} controls={false} indicators={false} style={{ maxWidth: '800px', margin: 'auto', marginTop: '15px', marginBottom: '50px' }}>
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
  );
};

export default Home;
