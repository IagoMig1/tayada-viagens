import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  overlayColor?: string;
  height?: string;
  parallaxFactor?: number;
  transitionDuration?: string; // Duração da transição
  text: string; // Texto que muda na seção
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl,
  children,
  overlayColor = 'bg-black/40',
  height = 'h-screen',
  parallaxFactor = 0.1,
  transitionDuration = '0.5s', // Duração padrão de 1 segundo
  text,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Atualiza a imagem com a transição quando `imageUrl` mudar
    setCurrentImageUrl(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    // Transição do texto quando mudar
    setCurrentText(text);
  }, [text]);

  return (
    <div className={`relative ${height} overflow-hidden`}>
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-110 transition-all"
        style={{
          backgroundImage: `url(${currentImageUrl})`,
          transform: `translateY(${scrollPosition * parallaxFactor}px)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          transitionDuration: transitionDuration,
        }}
      />
      <div className={`absolute inset-0 ${overlayColor}`} />
      <div className="relative h-full flex justify-center items-center">
        {/* Seção com transição de texto */}
        <div
          className="text-white text-4xl font-bold opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: currentText ? 1 : 0, // A opacidade vai ser 0 enquanto o texto não for atualizado
            transition: `opacity ${transitionDuration} ease-in-out`, // Duração da transição de opacidade
          }}
        >
          {currentText}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
