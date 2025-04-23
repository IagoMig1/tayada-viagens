import React, { useState, lazy } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
interface ImageGalleryProps {
  images: {
    url: string;
    caption: string;
  }[];
}
const ImageGallery: React.FC<ImageGalleryProps> = ({
  images
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };
  const previousImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };
  return <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => <div key={index} className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer" onClick={() => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
      }}>
            <img src={image.url} alt={image.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
              <p className="text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {image.caption}
              </p>
            </div>
          </div>)}
      </div>
      {/* Lightbox */}
      {lightboxOpen && <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors" onClick={() => setLightboxOpen(false)}>
            <XIcon size={32} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors" onClick={previousImage}>
            <ChevronLeftIcon size={40} />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] mx-4">
            <img src={images[currentImageIndex].url} alt={images[currentImageIndex].caption} className="max-w-full max-h-[80vh] object-contain" />
            <p className="text-white text-center mt-4 text-lg">
              {images[currentImageIndex].caption}
            </p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors" onClick={nextImage}>
            <ChevronRightIcon size={40} />
          </button>
        </div>}
    </>;
};
export default ImageGallery;