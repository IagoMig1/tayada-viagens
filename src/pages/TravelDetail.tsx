import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
  MapPinIcon,
  PlaneIcon,
  BusIcon,
  ShirtIcon,
  TruckIcon,
  ArrowRightLeftIcon,
  ShoppingCartIcon,
  GiftIcon,
  WalletIcon,
  HotelIcon,
  UserRoundIcon,
  HelpCircleIcon
} from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Ícones + textos das opções de inclui/não inclui (iguais ao TravelForm)
const travelItems: Record<string, { label: string; icon: JSX.Element }> = {
  air: { label: 'Transporte Aéreo', icon: <PlaneIcon size={18} className="mr-2" /> },
  ground: { label: 'Transporte Terrestre', icon: <BusIcon size={18} className="mr-2" /> },
  laundry: { label: 'Lavanderia', icon: <ShirtIcon size={18} className="mr-2" /> },
  transfer: { label: 'Traslado', icon: <TruckIcon size={18} className="mr-2" /> },
  csp: { label: 'Caçapava → São Paulo', icon: <ArrowRightLeftIcon size={18} className="mr-2" /> },
  spc: { label: 'São Paulo → Caçapava', icon: <ArrowRightLeftIcon size={18} className="mr-2" /> },
  shopping: { label: 'Compras', icon: <ShoppingCartIcon size={18} className="mr-2" /> },
  souvenirs: { label: 'Lembranças', icon: <GiftIcon size={18} className="mr-2" /> },
  personal_expenses: { label: 'Gastos Pessoais', icon: <WalletIcon size={18} className="mr-2" /> },
  hotel: { label: 'Hospedagem', icon: <HotelIcon size={18} className="mr-2" /> },
  guide: { label: 'Guia de Turismo', icon: <UserRoundIcon size={18} className="mr-2" /> },
};

const TravelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [travel, setTravel] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravel = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('travels')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar viagem:', error.message);
      } else {
        setTravel(data);
      }
      setLoading(false);
    };

    if (id) fetchTravel();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Carregando detalhes da viagem...</div>;
  }

  if (!travel) {
    return <div className="text-center py-20 text-red-600">Viagem não encontrada.</div>;
  }

  const formattedDate = new Date(travel.date).toLocaleDateString('pt-BR');
  const whatsappMessage = `Olá! Gostaria de saber mais detalhes sobre a viagem "${travel.title}" que está marcada para ${formattedDate}.`;

  return (
    <div className="bg-gray-50 w-full">
      {/* Hero */}
      <div className="relative w-full overflow-hidden">
        <img
          src={travel.image}
          alt={travel.title}
          className="w-full h-[500px] object-cover object-center transition-all duration-300 transform hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
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

      {/* Detalhes */}
      <div className="container mx-auto p-8 md:px-16 bg-white shadow-xl rounded-xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <p>{travel.duration} Dias</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-800">
              <h3>Tamanho do Grupo</h3>
              <p>{travel.group_size} pessoas</p>
            </div>
            <div className="text-lg font-semibold text-gray-800">
              <h3>Vagas Restantes</h3>
              <p>{travel.vagas_restantes}</p>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800">Detalhes da Viagem</h2>
          <p className="text-gray-600 mt-4 whitespace-pre-line">{travel.long_description}</p>
        </div>

        {/* Inclui */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-teal-800">Inclui</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {travel.includes?.map((item: string, index: number) => {
              const data = travelItems[item];
              return (
                <div key={index} className="flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  {data?.icon || <HelpCircleIcon size={18} className="mr-2" />}
                  {data?.label || item}
                </div>
              );
            })}
          </div>
        </div>

        {/* Não Inclui */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-red-800">Não Inclui</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {travel.not_included?.map((item: string, index: number) => {
              const data = travelItems[item];
              return (
                <div key={index} className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {data?.icon || <HelpCircleIcon size={18} className="mr-2" />}
                  {data?.label || item}
                </div>
              );
            })}
          </div>
        </div>

        {/* WhatsApp */}
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
