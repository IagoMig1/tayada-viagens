import React from 'react';
import { Travel } from '../data/travelData';

interface WhatsAppButtonProps {
  travel?: Travel;
  className?: string;
  variant?: 'fixed' | 'inline';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  travel,
  className = '',
  variant = 'inline',
}) => {
  const phoneNumber = '551236537242';

  const generateMessage = () => {
    if (travel) {
      return encodeURIComponent(
        `Olá! Gostaria de mais informações sobre a viagem:\n\n` +
        `🌍 Destino: ${travel.title}\n` +
        `📍 Local: ${travel.location}\n` +
        `⏱️ Duração: ${travel.duration}\n` +
        `💰 Valor: R$ ${travel.price.toLocaleString('pt-BR')}\n\n` +
        `Podem me ajudar?`
      );
    }
    return encodeURIComponent('Olá! Gostaria de informações sobre pacotes de viagem!');
  };

  const variantStyles = {
    fixed: 'fixed bottom-6 right-6 w-20 h-20 z-[9999]', // aumentei o tamanho
    inline: 'inline-flex items-center gap-2',
  };

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${generateMessage()}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantStyles[variant]} ${className}`}
    >
      {variant === 'fixed' ? (
        <img
          src="/logo-wpp.png"
          alt="WhatsApp"
          className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <>
          <img
            src="/logo-wpp.png"
            alt="WhatsApp"
            className="w-5 h-5 object-contain"
          />
          <span className="text-white">Conversar no WhatsApp</span>
        </>
      )}
    </a>
  );
};

export default WhatsAppButton;
