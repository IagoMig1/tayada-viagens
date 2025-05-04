import React from 'react';

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
      <div className="relative h-full flex justify-center items-center text-center px-4">
        <div
          className="text-white text-4xl font-bold transform transition-all duration-1000 ease-out opacity-0 scale-98 animate-fadeInSubtle"
        >
          {text}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
