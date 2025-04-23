import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, UsersIcon, UtensilsIcon, PlaneIcon, HomeIcon, CheckIcon, XIcon, PhoneIcon } from 'lucide-react';
import { Travel } from '../data/travelData';
interface TravelDetailProps {
  travel: Travel;
}
const TravelDetail: React.FC<TravelDetailProps> = ({
  travel
}) => {
  return <div className="bg-gray-50 w-full">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 w-full">
        <img src={travel.image} alt={travel.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {travel.title}
            </h1>
            <div className="flex items-center text-white">
              <MapPinIcon size={18} className="mr-1" />
              <span>{travel.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sobre o Destino
              </h2>
              <p className="text-gray-700 mb-6">{travel.description}</p>
              {travel.longDescription && <div className="text-gray-700 space-y-4">
                  {travel.longDescription.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                O Que Está Incluído
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="flex items-center text-lg font-medium text-gray-800 mb-3">
                    <PlaneIcon size={20} className="mr-2 text-blue-600" />
                    Transporte
                  </h3>
                  <ul className="space-y-2">
                    {travel.includes?.transport.map((item, index) => <li key={index} className="flex items-start">
                        <CheckIcon size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center text-lg font-medium text-gray-800 mb-3">
                    <HomeIcon size={20} className="mr-2 text-blue-600" />
                    Hospedagem
                  </h3>
                  <ul className="space-y-2">
                    {travel.includes?.accommodation.map((item, index) => <li key={index} className="flex items-start">
                        <CheckIcon size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center text-lg font-medium text-gray-800 mb-3">
                    <UtensilsIcon size={20} className="mr-2 text-blue-600" />
                    Alimentação
                  </h3>
                  <ul className="space-y-2">
                    {travel.includes?.meals.map((item, index) => <li key={index} className="flex items-start">
                        <CheckIcon size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center text-lg font-medium text-gray-800 mb-3">
                    <UsersIcon size={20} className="mr-2 text-blue-600" />
                    Atividades
                  </h3>
                  <ul className="space-y-2">
                    {travel.includes?.activities.map((item, index) => <li key={index} className="flex items-start">
                        <CheckIcon size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
            {travel.notIncluded && travel.notIncluded.length > 0 && <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  O Que Não Está Incluído
                </h2>
                <ul className="space-y-2">
                  {travel.notIncluded.map((item, index) => <li key={index} className="flex items-start">
                      <XIcon size={18} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>)}
                </ul>
              </div>}
          </div>
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  R$ {travel.price.toLocaleString('pt-BR')}
                </div>
                <div className="text-gray-500 text-sm">por pessoa</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CalendarIcon size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Duração</div>
                    <div className="text-gray-600">{travel.duration}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <UsersIcon size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">
                      Tamanho do Grupo
                    </div>
                    <div className="text-gray-600">
                      Máximo de {travel.groupSize || 15} pessoas
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">
                      Local de Partida
                    </div>
                    <div className="text-gray-600">
                      {travel.departureLocation || 'São Paulo'}
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/contato" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md text-center transition-colors mb-4">
                Reservar Agora
              </Link>
              <a href="tel:1199999999" className="flex items-center justify-center w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-md transition-colors">
                <PhoneIcon size={18} className="mr-2" />
                (11) 9999-9999
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default TravelDetail;