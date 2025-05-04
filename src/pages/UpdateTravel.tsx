import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TravelData } from '@/components/TravelForm';

const UpdateTravel: React.FC = () => {
  const [travels, setTravels] = useState<TravelData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTravels = async () => {
      const { data, error } = await supabase.from('travels').select('*');
      if (error) {
        console.error('Erro ao buscar viagens:', error);
      } else {
        setTravels(data as TravelData[]);
      }
    };
    fetchTravels();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-[#4e1b91] mb-6">Editar Viagens</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {travels.map((travel) => (
          <Card
            key={travel.id}
            className="cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/edit-travel/${travel.id}`)}
          >
            <CardContent className="p-4">
              <img src={travel.image} alt="Imagem da viagem" className="w-full h-32 object-cover rounded-md mb-2" />
              <h2 className="text-lg font-semibold text-[#4e1b91]">{travel.departure_location}</h2>
              <p className="text-sm text-gray-600">Vagas restantes: {travel.vagas_restantes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpdateTravel;
