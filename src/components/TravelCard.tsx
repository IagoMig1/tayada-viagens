import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
import { Travel } from '../data/travelData';

interface TravelCardProps {
  travel: Travel;
}

const TravelCard: React.FC<TravelCardProps> = ({ travel }) => {
  // Fallback de imagem caso a original não carregue
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/path/to/fallback-image.jpg'; // Caminho da imagem fallback
  };

  // Formatação da data para o formato pt-BR
  const formattedDate = new Date(new Date(travel.date).setDate(new Date(travel.date).getDate() + 1)).toLocaleDateString('pt-BR');


  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-64">
        <img
          src={travel.image || '/path/to/fallback-image.jpg'} // Verifica se a imagem existe, caso contrário usa o fallback
          alt={travel.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError} // Aplica a função para fallback de imagem
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm line-clamp-2">{travel.description}</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
          {travel.title}
        </h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPinIcon size={18} className="text-teal-500 mr-2" />
            <span>{travel.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CalendarIcon size={18} className="text-teal-500 mr-2" />
            <span>{formattedDate}</span> {/* Aqui está a data formatada */}
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSignIcon size={18} className="text-teal-500 mr-2" />
            <span className="font-medium">
              A partir de R$ {travel.price.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
        <Link to={`/destino/${travel.id}`} className="block text-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default TravelCard;
