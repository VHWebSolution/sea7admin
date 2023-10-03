import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './custom-carousel.css';

const ImagePopup = ({ images, onClose, selectedImageIndex }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 '>
      <div className='flex justify-center max-h-[30vh] p-4 bg-white shadow-md rounded-md my-24'>
        <Carousel showThumbs={false} selectedItem={selectedImageIndex} showArrows={false}>
          {images.map((image, index) => (
            <div key={index} className='flex justify-center items-center'>
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index}`}
                className='custom-carousel'
              />
            </div>
          ))}
        </Carousel>
        <button
          className='mt-4 bg-gray-800 text-white py-2 px-4 rounded-md'
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;
