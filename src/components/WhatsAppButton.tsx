import React, { Component } from 'react';
import { Travel } from '../data/travelData';
import { Phone } from 'lucide-react'; // Importa o ícone de telefone

interface WhatsAppButtonProps {
  travel?: Travel;
  className?: string;
  variant?: 'fixed' | 'inline';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  travel,
  className,
  variant = 'inline'
}) => {
  const phoneNumber = '5512997251473';
  const generateMessage = () => {
    if (travel) {
      return encodeURIComponent(`Olá! Gostaria de mais informações sobre a viagem:\n\n` + `🌍 Destino: ${travel.title}\n` + `📍 Local: ${travel.location}\n` + `⏱️ Duração: ${travel.duration}\n` + `💰 Valor: R$ ${travel.price.toLocaleString('pt-BR')}\n\n` + `Podem me ajudar?`);
    }
    return encodeURIComponent('Olá! Gostaria de informações sobre pacotes de viagem!');
  };

  const baseStyles = 'flex items-center justify-center gap-2 bg-green-500 text-white font-medium transition-all duration-300 hover:bg-green-600 hover:scale-105';
  const variantStyles = {
    fixed: 'fixed bottom-6 right-6 z-40 rounded-full p-4 shadow-lg hover:shadow-xl',
    inline: 'rounded-lg px-6 py-3'
  };

  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${generateMessage()}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <Phone size={variant === 'fixed' ? 32 : 20} /> {/* Adiciona o ícone de telefone */}
      {variant === 'inline' && <span>Conversar no WhatsApp</span>}
    </a>
  );
};

export default WhatsAppButton;
