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
        className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover transition-all"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transitionDuration: transitionDuration,
        }}
        
      />
      <div className={`absolute inset-0 ${overlayColor}`} />

      <div className="relative h-full flex flex-col justify-center items-center px-4 gap-6">
        <div className="text-white text-4xl font-bold transform transition-all duration-1000 ease-out opacity-0 scale-98 animate-fadeInSubtle">
          {text}
          
        </div>

        {children}

    
       
      </div>
    </div>
  );
};

export default ParallaxBackground;
