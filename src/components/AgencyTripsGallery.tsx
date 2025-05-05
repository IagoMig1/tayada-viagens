import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from 'lucide-react';

interface GalleryImage {
  url: string;
  title: string;
  location: string;
}

const agencyExperiences: GalleryImage[] = [
  {
    url: './4.png',
    title: 'Fernando de Noronha',
    location: '',
  },
  {
    url: './2.png',
    title: 'Aeroporto de Guarulhos',
    location: '',
  },
  {
    url: './1.png',
    title: 'Rumo a Fernando de Noronha!',
    location: '',
  },
  {
    url: './3.png',
    title: 'Partindo para Itália!',
    location: '',
  },
];

const AgencyExperienceGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % agencyExperiences.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + agencyExperiences.length) % agencyExperiences.length);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 sm:text-4xl">
          Experiências Inesquecíveis
        </h2>
        <div className="relative overflow-hidden">
          {/* Main Image */}
          <div className="relative w-full h-[60vh] sm:h-[800px]">
            <div
              className="w-full h-full flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {agencyExperiences.map((image, index) => (
                <div key={index} className="relative w-full h-full flex-shrink-0">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
              <h3 className="text-xl sm:text-3xl font-bold text-white mb-2">
                {agencyExperiences[activeIndex].title}
              </h3>
              <p className="text-base sm:text-xl text-white/90">
                {agencyExperiences[activeIndex].location}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <ZoomInIcon className="text-white" size={24} />
            </button>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors backdrop-blur-sm group shadow-md"
          >
            <ChevronLeftIcon
              size={24}
              className="text-gray-800 transform group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors backdrop-blur-sm group shadow-md"
          >
            <ChevronRightIcon
              size={24}
              className="text-gray-800 transform group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
            {agencyExperiences.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 ${
                  index === activeIndex ? 'ring-4 ring-teal-500' : ''
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-20 h-12 sm:w-32 sm:h-20 object-cover rounded-lg"
                />
                <div
                  className={`absolute inset-0 bg-black/50 transition-opacity ${
                    index === activeIndex ? 'opacity-0' : 'opacity-50'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyExperienceGallery;
