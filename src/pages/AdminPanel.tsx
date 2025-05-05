import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import TravelForm from '@/components/TravelForm';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  const cityCounts = suggestions.reduce((acc: Record<string, number>, suggestion) => {
    const key = `${suggestion.city} - ${suggestion.uf}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(cityCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#4e1b91', '#C4B5FD', '#A78BFA', '#DDD6FE', '#EDE9FE'];

  const handleExportCSV = () => {
    if (suggestions.length === 0) return;

    const headers = Object.keys(suggestions[0]);
    const csvRows = [
      headers.join(','),
      ...suggestions.map((row) => headers.map((fieldName) => JSON.stringify(row[fieldName] ?? '')).join(',')),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'viagens_sugeridas.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 px-4 sm:px-6 pb-20 mt-10">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-2">Painel Administrativo</h1>
          <p className="text-gray-500 text-base">Gerencie as viagens cadastradas e sugestões dos usuários</p>
        </div>

        {/* Botão Nova Viagem */}
        {!showForm && (
          <div className="text-center">
            <Button
              className="bg-[#4e1b91] hover:bg-[#3d147b] text-white px-6 py-3 rounded-xl transition"
              onClick={() => {
                setSelectedTravel(null);
                setShowForm(true);
              }}
            >
              <FaPlus className="mr-2" /> Nova Viagem
            </Button>
          </div>
        )}

        {/* Formulário */}
        {showForm ? (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow border">
            <TravelForm initialValues={selectedTravel} onSubmit={handleSubmit} />
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setShowForm(false);
                  setSelectedTravel(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md"
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Lista de Viagens */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Viagens Cadastradas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {travels.map((travel) => (
                  <Card key={travel.id} className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition">
                    <CardContent className="p-6 space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">{travel.location}</h3>
                      <p className="text-sm text-gray-500">
                        Grupo: {travel.group_size} | Vagas: {travel.vagas_restantes}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button
                          className="bg-[#4e1b91] hover:bg-[#3d147b] text-white px-4 py-2 text-sm rounded-md"
                          onClick={() => {
                            setSelectedTravel(travel);
                            setShowForm(true);
                          }}
                        >
                          <FaEdit className="mr-1" /> Editar
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md"
                          onClick={() => handleDelete(travel.id)}
                        >
                          <FaTrash className="mr-1" /> Excluir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
  <a
    href="/posts"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-[#4e1b91] hover:bg-[#3d147b] text-white px-5 py-2 rounded-lg text-sm transition"
  >
    Gerenciar Posts do Blog
  </a>
</div>    {/* Gráfico */}
            {chartData.length > 0 && (
              <div className="mt-16 bg-white p-6 sm:p-8 rounded-2xl border shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Sugestões de viagens</h2>
                  <Button onClick={handleExportCSV} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded-md">
                    Exportar CSV
                  </Button>
                </div>
                <div className="w-full h-[300px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        label
                      >
                        {chartData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>


    </div>
    
  );
};

export default AdminPanel;
