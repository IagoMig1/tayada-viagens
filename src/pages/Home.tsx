import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, CreditCardIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import FeaturedDestinations from '../components/FeaturedDestinations';
import { travelData } from '../data/travelData';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import ImageGallery from '../components/ImageGallery';
import ParallaxBackground from '../components/ParallaxBackground';
import TravelGallery from '../components/TravelGallery';
import SpecialOffers from '../components/SpecialOffers';
import TravelTips from '../components/TravelTips';
import WhatsAppButton from '../components/WhatsAppButton';
const heroImages = [{
  url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80',
  title: 'Descubra Novos Horizontes',
  subtitle: 'Explore destinos incríveis com a Tayada Viagens'
}, {
  url: 'https://images.unsplash.com/photo-1696450724328-c075ecff6f50?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  title: 'Experiências Únicas',
  subtitle: 'Momentos inesquecíveis em cada viagem'
}, {
  url: 'https://images.unsplash.com/photo-1723817496695-4afecff18ad0?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  title: 'Paraísos Naturais',
  subtitle: 'Conheça as maravilhas do Brasil e do mundo'
}];
const galleryImages = [{
  url: 'https://images.unsplash.com/photo-1564750576234-75de3cc54053?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  caption: 'Amazônia Brasileira'
}, {
  url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
  caption: 'Rio de Janeiro'
}, {
  url: 'https://images.unsplash.com/photo-1729382215929-75812f7a113f?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  caption: 'Fernando de Noronha'
}, {
  url: 'https://images.unsplash.com/photo-1667049663930-f6d42755f76b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  caption: 'Gramado'
}];
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredDestinations = travelData.slice(0, 6);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroImages.length) % heroImages.length);
  };
  return <div className="w-full">
      <ParallaxBackground imageUrl={heroImages[currentSlide].url} overlayColor="bg-black/50">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeInUp">
              {heroImages[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeInUp animation-delay-200">
              {heroImages[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-400">
              <Link to="/destinos" className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Explorar Destinos
              </Link>
              <Link to="/contato" className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <button onClick={prevSlide} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group">
                <ChevronLeftIcon size={24} className="text-white transform group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="flex space-x-2">
                {heroImages.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`transition-all duration-300 ${index === currentSlide ? 'w-8 bg-teal-500' : 'w-2 bg-white/50 hover:bg-white/75'} h-2 rounded-full`} />)}
              </div>
              <button onClick={nextSlide} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group">
                <ChevronRightIcon size={24} className="text-white transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </ParallaxBackground>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Destinos Deslumbrantes
          </h2>
          <ImageGallery images={galleryImages} />
        </div>
      </section>
      <SpecialOffers />
      <TravelGallery />
      <FeaturedDestinations destinations={featuredDestinations} />
      <TravelTips />
      <TestimonialsSection />
      <NewsletterSection />
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Sua Próxima Aventura?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-teal-100">
            Entre em contato conosco e comece a planejar a viagem dos seus
            sonhos com a Tayada Viagens.
          </p>
          <Link to="/contato" className="inline-block bg-white text-teal-600 font-bold py-4 px-8 rounded-lg hover:bg-teal-50 transition-colors">
            Fale Conosco
          </Link>
        </div>
      </section>
      <WhatsAppButton variant="fixed" />
    </div>;
};
export default Home;