import React from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

interface ParallaxBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  overlayColor?: string;
  height?: string;
  transitionDuration?: string;
  text: string;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl,
  children,
  overlayColor = 'bg-black/40',
  height = 'h-screen',
  transitionDuration = '1s',
  text,
}) => {
  return (
    <div className={`relative ${height} overflow-hidden`}>
      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat sm:bg-fixed"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transitionDuration: transitionDuration,
        }}
      />

      {/* Overlay escuro */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* Conteúdo */}
      <div className="relative h-full flex flex-col justify-center items-center px-4 gap-6 text-center">
        <div className="text-white text-2xl sm:text-4xl font-bold transform transition-all duration-1000 ease-out opacity-0 scale-98 animate-fadeInSubtle">
          {text}
        </div>

        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
