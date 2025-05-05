import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import FeaturedDestinations from '../components/FeaturedDestinations';
import TestimonialsSection from '../components/TestimonialsSection';
import { FacebookIcon, InstagramIcon } from 'lucide-react';

import NewsletterSection from '../components/NewsletterSection';
import ParallaxBackground from '../components/ParallaxBackground';
import TravelTips from '../components/TravelTips';
import AgencyTripsGallery from '../components/AgencyTripsGallery';
import WhatsAppButton from '../components/WhatsAppButton';
import { motion } from 'framer-motion';
import { getTravelData } from '../lib/supabase';

const heroImages = [
  {
    url: 'https://www.meon.com.br/source/files/c/175396/Carro_Cacapava-266360_2000-1500-0-0.jpg',
    title: 'Descubra Novos Horizontes',
    subtitle: 'Explore destinos incríveis com a Tayada Viagens'
  },
  {
    url: 'https://blog.paineirascorcovado.com.br/wp-content/uploads/2024/11/Cristo-Redentor-Por-do-sol-scaled.jpg',
    title: 'Experiências Únicas',
    subtitle: 'Momentos inesquecíveis em cada viagem'
  },
  {
    url: 'https://a.storyblok.com/f/239725/4096x2731/9eacb27b6d/hero-paris.jpg/m/3840x2560',
    title: 'Paraísos Naturais',
    subtitle: 'Conheça as maravilhas do Brasil e do mundo'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [travelData, setTravelData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data = await getTravelData();
        setTravelData(data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Erro ao carregar os dados de viagem:', error);
      }
    };

    fetchTravelData();
  }, []);

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

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <meta name="description" content="Explore destinos incríveis com a Tayada Viagens. Planeje sua viagem dos sonhos agora!" />
        <meta name="keywords" content="viagem, destinos, turismo, aventuras, Tayada Viagens" />
        <meta property="og:title" content="Tayada Viagens - Viagens Inesquecíveis" />
        <meta property="og:description" content="Explore os melhores destinos do Brasil e do mundo com a Tayada Viagens." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80" />
      </head>

      <div className="w-full">
        {/* Hero com Parallax */}
        <ParallaxBackground imageUrl={heroImages[currentSlide].url} overlayColor="bg-black/50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {heroImages[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {heroImages[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/destinos"
                  className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Explorar Destinos
                </Link>
                <Link
                  to="/contato"
                  className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                >
                  Fale Conosco
                </Link>
              </div>
              <div className="flex gap-4 mt-10">
  <a href="https://www.facebook.com/profile.php?id=100064805885974&locale=pt_BR" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
    <FacebookIcon className="text-white hover:text-teal-300 transition-colors" size={24} />
  </a>
  <a href="https://www.instagram.com/tayada_viagens/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
    <InstagramIcon className="text-white hover:text-teal-300 transition-colors" size={24} />
  </a>
</div>


            </motion.div>
          </div>

          {/* Controles de Slide */}
          <motion.div
            className="absolute bottom-8 left-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <motion.button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeftIcon size={24} className="text-white group-hover:-translate-x-1 transition-transform" />
                </motion.button>
                <div className="flex space-x-2">
                  {heroImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 ${index === currentSlide ? 'w-8 bg-teal-500' : 'w-2 bg-white/50 hover:bg-white/75'} h-2 rounded-full`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                <motion.button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRightIcon size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </ParallaxBackground>

        {/* Conteúdo principal */}
        {isDataLoaded ? (
          <>
            <FeaturedDestinations destinations={featuredDestinations} />
            <TravelTips />
            <AgencyTripsGallery />
            <NewsletterSection />
            <TestimonialsSection />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-teal-600">Carregando dados...</p>
          </div>
        )}

        {/* Call to Action Final */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Pronto para Sua Próxima Aventura?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-teal-100">
              Entre em contato conosco e comece a planejar a viagem dos seus sonhos com a Tayada Viagens.
            </p>
            <Link
              to="/contato"
              className="inline-block bg-white text-teal-600 font-bold py-4 px-8 rounded-lg hover:bg-teal-50 transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </section>

        {/* Botão flutuante do WhatsApp */}
        <WhatsAppButton variant="fixed" />
      </div>
    </>
  );
};

export default Home;
