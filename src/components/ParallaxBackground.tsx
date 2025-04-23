import React, { useEffect, useState } from 'react';
interface ParallaxBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  overlayColor?: string;
  height?: string;
}
const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl,
  children,
  overlayColor = 'bg-black/40',
  height = 'h-screen'
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className={`relative ${height} overflow-hidden`}>
      <div className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-110" style={{
      backgroundImage: `url(${imageUrl})`,
      transform: `translateY(${scrollPosition * 0.5}px)`
    }} />
      <div className={`absolute inset-0 ${overlayColor}`} />
      <div className="relative h-full">{children}</div>
    </div>;
};
export default ParallaxBackground;