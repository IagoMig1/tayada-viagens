import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface GalleryImage {
  url: string;
  title: string;
  location: string;
}

const galleryImages: GalleryImage[] = [{
  url: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
  title: 'Praias Paradisíacas',
  location: 'Fernando de Noronha'
}, {
  url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
  title: 'Vista Panorâmica',
  location: 'Rio de Janeiro'
}, {
  url: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527',
  title: 'Aventura na Amazônia',
  location: 'Amazonas'
}, {
  url: 'https://images.unsplash.com/photo-1690907938160-133874466bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  title: 'Charme Europeu',
  location: 'Gramado'
}];

const TravelGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const nextSlide = () => {
    setTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleTransitionEnd = () => {
    setTransitioning(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Destinos Deslumbrantes
        </h2>
        <div className="relative">
          {/* Main Image with carousel transition */}
          <div
            className="relative overflow-hidden"
            style={{
              width: '100%',
              height: '700px', // Aumento da altura das imagens para garantir que não cortem
            }}
          >
            {/* Container for all images */}
            <div
              className={`flex duration-1000   'opacity-0' : 'opacity-100'}`}
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full rounded-xl overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {image.title}
                    </h3>
                    <p className="text-xl text-white/90">{image.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group"
          >
            <ChevronLeftIcon size={24} className="text-white transform group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group"
          >
            <ChevronRightIcon size={24} className="text-white transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TravelGallery;
