import React from 'react';
import { Compass, Calendar, CreditCard, Map, Camera, Sun, Umbrella, BoxIcon } from 'lucide-react';
const tips = [{
  icon: Calendar,
  title: 'Melhor Época',
  description: 'Descubra a melhor época para visitar cada destino e aproveite ao máximo sua viagem.'
}, {
  icon: CreditCard,
  title: 'Economia',
  description: 'Dicas para economizar em passagens, hospedagem e passeios turísticos.'
}, {
  icon: BoxIcon,
  title: 'O Que Levar',
  description: 'Lista essencial do que você precisa levar para cada tipo de viagem.'
}, {
  icon: Map,
  title: 'Roteiros',
  description: 'Roteiros personalizados e dicas de lugares imperdíveis para visitar.'
}
// Add more tips...
];
const TravelTips = () => {
  return <section className="py-20 bg-gradient-to-br from-teal-500 to-teal-700 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Dicas de Viagem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-colors duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
                <tip.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
              <p className="text-white/80">{tip.description}</p>
            </div>)}
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl mb-8">
            Quer receber mais dicas de viagem? Inscreva-se em nossa newsletter!
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Seu melhor e-mail" className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" />
            <button type="submit" className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg hover:bg-white/90 transition-colors">
              Inscrever
            </button>
          </form>
        </div>
      </div>
    </section>;
};
export default TravelTips;