import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from 'lucide-react';
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
}
// Add more images...
];
const TravelGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % galleryImages.length);
  };
  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  return <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Destinos Deslumbrantes
        </h2>
        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden">
            <img src={galleryImages[activeIndex].url} alt={galleryImages[activeIndex].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                {galleryImages[activeIndex].title}
              </h3>
              <p className="text-xl text-white/90">
                {galleryImages[activeIndex].location}
              </p>
            </div>
            <button onClick={() => setLightboxOpen(true)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
              <ZoomInIcon className="text-white" size={24} />
            </button>
          </div>
          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group">
            <ChevronLeftIcon size={24} className="text-white transform group-hover:-translate-x-1 transition-transform" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group">
            <ChevronRightIcon size={24} className="text-white transform group-hover:translate-x-1 transition-transform" />
          </button>
          {/* Thumbnails */}
          <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
            {galleryImages.map((image, index) => <button key={index} onClick={() => setActiveIndex(index)} className={`flex-shrink-0 relative rounded-lg overflow-hidden ${index === activeIndex ? 'ring-4 ring-teal-500' : ''}`}>
                <img src={image.url} alt={image.title} className="w-32 h-20 object-cover" />
                <div className={`absolute inset-0 bg-black/50 transition-opacity ${index === activeIndex ? 'opacity-0' : 'opacity-50'}`} />
              </button>)}
          </div>
        </div>
      </div>
    </section>;
};
export default TravelGallery;