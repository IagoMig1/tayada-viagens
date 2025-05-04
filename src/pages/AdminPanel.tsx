// pages/AdminPanel.tsx
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaPlus, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import TravelForm from '@/components/TravelForm';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const AdminPanel: React.FC = () => {
  const [travels, setTravels] = useState<any[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTravels = async () => {
    const { data, error } = await supabase.from('travels').select('*');
    if (!error && data) setTravels(data);
    else console.error('Erro ao carregar viagens:', error?.message);
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  const handleSubmit = async (travelData: any) => {
    if (selectedTravel?.id) {
      const updatedData = { ...travelData, id: selectedTravel.id };
      const { error } = await supabase
        .from('travels')
        .update(updatedData)
        .eq('id', selectedTravel.id);

      if (!error) {
        setShowForm(false);
        setSelectedTravel(null);
        fetchTravels();
      } else {
        console.error('Erro ao atualizar viagem:', error.message);
      }
    } else {
      const { error } = await supabase.from('travels').insert([travelData]);
      if (!error) {
        setShowForm(false);
        fetchTravels();
      } else {
        console.error('Erro ao cadastrar viagem:', error.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Tem certeza que deseja excluir esta viagem?');
    if (!confirm) return;

    const { error } = await supabase.from('travels').delete().eq('id', id);
    if (!error) {
      fetchTravels();
    } else {
      console.error('Erro ao excluir viagem:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f2] pt-32 px-4 pb-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#00853b]">Painel Administrativo</h1>
        </div>

        {!showForm ? (
          <>
            <div className="flex justify-center">
              <Button
                className="bg-[#00853b] hover:bg-[#006b2d] text-white text-md px-6 py-4 rounded-xl shadow"
                onClick={() => {
                  setSelectedTravel(null);
                  setShowForm(true);
                }}
              >
                <FaPlus className="mr-2" />
                Cadastrar Nova Viagem
              </Button>
            </div>

            <Card className="shadow-md rounded-2xl border border-[#d6e2dd]">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-[#00853b] mb-4">Viagens Cadastradas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {travels.map((travel) => (
                    <Card key={travel.id} className="border shadow-sm rounded-xl">
                      <CardContent className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold text-[#00853b]">{travel.departure_location}</h3>
                        <p className="text-sm text-gray-600">
                          Grupo: {travel.group_size} | Vagas: {travel.vagas_restantes}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <Button
                            className="bg-[#00853b] hover:bg-[#006b2d] text-white text-sm"
                            onClick={() => {
                              setSelectedTravel(travel);
                              setShowForm(true);
                            }}
                          >
                            <FaEdit className="mr-1" />
                            Editar
                          </Button>
                   
                          <Button
                            className="bg-red-500 hover:bg-red-600 text-white text-sm"
                            onClick={() => handleDelete(travel.id)}
                          >
                            <FaTrash className="mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#d6e2dd]">
            <TravelForm
              initialValues={selectedTravel}
              onSubmit={handleSubmit}
            />
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setShowForm(false);
                  setSelectedTravel(null);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
