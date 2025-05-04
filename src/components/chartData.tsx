import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

const COLORS = ['#00853b', '#4e1b91', '#FF8042', '#00C49F', '#FFBB28', '#d83f87', '#6dd400'];

const TravelSuggestionsChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    const { data, error } = await supabase.from('viagens_sugeridas').select('city, uf');
    if (error) {
      console.error('Erro ao buscar sugestões:', error.message);
      return;
    }

    if (data) {
      const counts: Record<string, number> = {};

      data.forEach(({ city, uf }) => {
        const key = `${city} - ${uf}`;
        counts[key] = (counts[key] || 0) + 1;
      });

      const formatted = Object.entries(counts).map(([name, value]) => ({ name, value }));
      setChartData(formatted);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      <Card className="border border-gray-200 shadow-md rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-center text-[#4e1b91] mb-6">
            Sugestões de Viagens por Cidade
          </h2>
          {chartData.length > 0 ? (
            <div style={{ width: '100%', height: 500 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={180}
                    label
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhuma sugestão encontrada.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelSuggestionsChart;
