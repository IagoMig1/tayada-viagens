import React from 'react';
import { StarIcon, QuoteIcon } from 'lucide-react';
const testimonials = [{
  name: 'Ana Silva',
  location: 'São Paulo, SP',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  text: 'Uma experiência incrível em Fernando de Noronha! A Tayada Viagens cuidou de todos os detalhes, tornando nossa viagem inesquecível.',
  rating: 5,
  destination: 'Fernando de Noronha'
}, {
  name: 'Carlos Santos',
  location: 'Rio de Janeiro, RJ',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  text: 'Gramado foi um sonho! O atendimento personalizado e o roteiro perfeito fizeram toda a diferença.',
  rating: 5,
  destination: 'Gramado'
}, {
  name: 'Marina Costa',
  location: 'Belo Horizonte, MG',
  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  text: 'Paris e Roma foram maravilhosas! Os guias eram excelentes e os hotéis muito bem localizados.',
  rating: 5,
  destination: 'Paris e Roma'
}];
const TestimonialsSection = () => {
  return <section className="py-20 bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          O Que Nossos Viajantes Dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <StarIcon key={i} size={20} className="text-yellow-400 fill-current" />)}
              </div>
              <div className="relative">
                <QuoteIcon size={24} className="absolute -top-2 -left-2 text-teal-200" />
                <p className="text-gray-600 italic pl-6">{testimonial.text}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-teal-600 font-medium">
                  Viagem para {testimonial.destination}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;