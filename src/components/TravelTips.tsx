import React from 'react';
import { Compass, Calendar, CreditCard, Map, Camera, Sun, Umbrella, BoxIcon } from 'lucide-react';

const tips = [
  {
    icon: Calendar,
    title: 'Melhor Época',
    description: 'Descubra a melhor época para visitar cada destino e aproveite ao máximo sua viagem.'
  },
  {
    icon: CreditCard,
    title: 'Economia',
    description: 'Dicas para economizar em passagens, hospedagem e passeios turísticos.'
  },
  {
    icon: BoxIcon,
    title: 'O Que Levar',
    description: 'Lista essencial do que você precisa levar para cada tipo de viagem.'
  },
  {
    icon: Map,
    title: 'Roteiros',
    description: 'Roteiros personalizados e dicas de lugares imperdíveis para visitar.'
  }
  // Add more tips...
];

const TravelTips = () => {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Dicas de Viagem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-500 mb-4">
                <tip.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{tip.title}</h3>
              <p className="text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default TravelTips;
