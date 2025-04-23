import React from 'react';
import { Timer, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const offers = [{
  id: 'rio-carnaval',
  title: 'Carnaval no Rio',
  location: 'Rio de Janeiro',
  image: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6',
  originalPrice: 3990,
  discountedPrice: 3290,
  endsIn: '2024-02-01',
  discount: 20
}, {
  id: 'noronha-verao',
  title: 'Verão em Noronha',
  location: 'Fernando de Noronha',
  image: 'https://images.unsplash.com/photo-1621126791066-b9439d674b9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  originalPrice: 8990,
  discountedPrice: 7490,
  endsIn: '2024-01-15',
  discount: 15
}
// Add more offers
];
const SpecialOffers = () => {
  return <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Ofertas Especiais
            </h2>
            <p className="text-gray-600">
              Aproveite nossos melhores preços por tempo limitado
            </p>
          </div>
          <Link to="/destinos" className="hidden md:flex items-center text-teal-600 hover:text-teal-700 font-medium group">
            Ver todas as ofertas
            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map(offer => <div key={offer.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {offer.discount}% OFF
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.location}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-gray-500">
                    <Timer size={20} className="mr-2" />
                    <span className="text-sm">Oferta termina em 7 dias</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 line-through text-sm">
                      R$ {offer.originalPrice.toLocaleString('pt-BR')}
                    </span>
                    <div className="text-2xl font-bold text-teal-600">
                      R$ {offer.discountedPrice.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <Link to={`/destino/${offer.id}`} className="flex items-center text-teal-600 hover:text-teal-700 font-medium">
                    Ver detalhes
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>)}
        </div>
        <Link to="/destinos" className="md:hidden mt-8 flex items-center justify-center text-teal-600 hover:text-teal-700 font-medium">
          Ver todas as ofertas
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>;
};
export default SpecialOffers;