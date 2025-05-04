// pages/AdminPanel.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaPlus, FaEdit, FaTrash, FaChartPie } from 'react-icons/fa';
import TravelForm from '@/components/TravelForm';

const AdminPanel: React.FC = () => {
  const [travels, setTravels] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showChart, setShowChart] = useState(true);

  const fetchTravels = async () => {
    const { data, error } = await supabase.from('travels').select('*');
    if (!error && data) setTravels(data);
  };

  const fetchSuggestions = async () => {
    const { data, error } = await supabase.from('viagens_sugeridas').select('*');
    if (!error && data) setSuggestions(data);
  };

  useEffect(() => {
    fetchTravels();
    fetchSuggestions();
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
      }
    } else {
      const { error } = await supabase.from('travels').insert([travelData]);
      if (!error) {
        setShowForm(false);
        fetchTravels();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Tem certeza que deseja excluir esta viagem?');
    if (!confirm) return;

    const { error } = await supabase.from('travels').delete().eq('id', id);
    if (!error) fetchTravels();
  };

  // Agrupamento por cidade e UF
  const cityCounts = suggestions.reduce((acc: Record<string, number>, suggestion) => {
    const key = `${suggestion.city} - ${suggestion.uf}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(cityCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

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

            <Card className="shadow-md rounded-2xl border border-[#d6e2dd] mt-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-[#00853b] mb-4">Viagens Cadastradas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {travels.map((travel) => (
                    <Card key={travel.id} className="border shadow-sm rounded-xl">
                      <CardContent className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold text-[#00853b]">
                          {travel.departure_location}
                        </h3>
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

            <div className="flex justify-center mt-10">
              <Button
                onClick={() => setShowChart(!showChart)}
                className="bg-[#4e1b91] hover:bg-[#3e1477] text-white px-4"
              >
                <FaChartPie className="mr-2" />
                {showChart ? 'Ocultar Gráfico de Sugestões' : 'Mostrar Gráfico de Sugestões'}
              </Button>
            </div>

            {/* Gráfico simples usando divs */}
            {showChart && chartData.length > 0 && (
              <div className="mt-10 flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-[#4e1b91] mb-6">
                  Sugestões por Cidade
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {chartData.map((entry, index) => {
                    const percentage = ((entry.value / total) * 100).toFixed(1);
                    return (
                      <div
                        key={index}
                        className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm min-w-[200px]"
                      >
                        <h3 className="text-md font-bold text-[#00853b]">{entry.name}</h3>
                        <p className="text-sm text-gray-600">
                          {entry.value} sugestões ({percentage}%)
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                          <div
                            className="h-4 rounded-full bg-[#4e1b91]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#d6e2dd]">
            <TravelForm initialValues={selectedTravel} onSubmit={handleSubmit} />
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
