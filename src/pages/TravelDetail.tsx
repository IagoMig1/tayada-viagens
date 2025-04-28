import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { MapPinIcon, CheckIcon } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const TravelDetail = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const [travel, setTravel] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravel = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('travels') // Nome correto da tabela
        .select('*')
        .eq('id', id)
        .single(); // Garante que só traga um item

      if (error) {
        console.error('Erro ao buscar viagem:', error.message);
      } else {
        setTravel(data);
      }
      setLoading(false);
    };

    if (id) fetchTravel(); // Se houver id, busca a viagem
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Carregando detalhes da viagem...</div>;
  }

  if (!travel) {
    return <div className="text-center py-20 text-red-600">Viagem não encontrada.</div>;
  }

  // Formatando a data da viagem no padrão pt-BR
  const formattedDate = new Date(travel.date).toLocaleDateString('pt-BR');

  // Mensagem para WhatsApp
  const whatsappMessage = `Olá! Gostaria de saber mais detalhes sobre a viagem "${travel.title}" que está marcada para ${formattedDate}.`;

  return (
    <div className="bg-gray-50 w-full">

      {/* Hero Image */}
      <div className="relative w-full overflow-hidden">
        <img src={travel.image} alt={travel.title} className="w-full h-[500px] object-cover object-center transition-all duration-300 transform hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{travel.title}</h1>
            <div className="flex justify-center items-center text-lg">
              <MapPinIcon size={18} className="mr-2 text-teal-500" />
              <span>{travel.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Container Principal */}
      <div className="container mx-auto p-8 md:px-16 bg-white shadow-xl rounded-xl mt-8">

        {/* Informações principais da viagem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Preço, data e duração */}
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-800">
              <h3>Preço</h3>
              <p className="text-teal-500 text-2xl font-bold">
                R$ {travel.price.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="text-lg font-semibold text-gray-800">
              <h3>Data da Viagem</h3>
              <p>{formattedDate}</p>
            </div>

            <div className="text-lg font-semibold text-gray-800">
              <h3>Duração</h3>
              <p>{travel.duration}</p>
            </div>
          </div>

          {/* Tamanho do grupo */}
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-800">
              <h3>Tamanho do Grupo</h3>
              <p>{travel.group_size} pessoas</p>
            </div>
          </div>
        </div>

        {/* Descrição longa da viagem */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800">Detalhes da Viagem</h2>
          <p className="text-gray-600 mt-4">{travel.long_description.join(' ')}</p>
        </div>

        {/* O que está incluso */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800">O que está incluso</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {travel.includes && travel.includes.map((item: string, index: number) => (
              <div key={index} className="flex items-center text-gray-600">
                <CheckIcon size={20} className="mr-2 text-teal-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* O que não está incluso */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800">O que não está incluso</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {travel.not_included && travel.not_included.map((item: string, index: number) => (
              <div key={index} className="flex items-center text-gray-600">
                <CheckIcon size={20} className="mr-2 text-teal-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de WhatsApp */}
        <div className="mt-12 flex justify-center">
          <a
            href={`https://wa.me/551236537242?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all flex items-center space-x-3"
          >
            <span>Enviar mensagem no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TravelDetail;
