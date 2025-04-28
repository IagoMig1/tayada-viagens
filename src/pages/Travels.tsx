import React, { useEffect, useState } from 'react';
import TravelCard from '../components/TravelCard';
import { SearchIcon, FilterIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Travel } from '../data/travelData';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const Travels = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');

  useEffect(() => {
    const fetchTravels = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('travels').select('*');
      if (error) {
        console.error('Erro ao buscar viagens:', error.message);
      } else {
        setTravels(data as Travel[]);
      }
      setLoading(false);
    };

    fetchTravels();
  }, []);

  const filteredTravels = travels.filter((travel) => {
    // Verifica se a busca corresponde ao termo de pesquisa
    const matchesSearch =
      travel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      travel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      travel.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    // Filtro de preço
    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      matchesPrice = travel.price >= min && (max ? travel.price <= max : true);
    }

    let matchesDuration = true;
    // Filtro de duração
    if (durationFilter) {
      matchesDuration = travel.duration.includes(durationFilter);
    }

    return matchesSearch && matchesPrice && matchesDuration;
  });

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nossos Destinos
        </h1>

        {/* Filtros */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Buscar por destino, local ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <SearchIcon size={20} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="w-full md:w-48">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Preço
              </label>
              <select
                id="price"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os preços</option>
                <option value="0-2000">Até R$ 2.000</option>
                <option value="2000-5000">R$ 2.000 - R$ 5.000</option>
                <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                <option value="10000">Acima de R$ 10.000</option>
              </select>
            </div>

            <div className="w-full md:w-48">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duração
              </label>
              <select
                id="duration"
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Qualquer duração</option>
                <option value="3 dias">3 dias</option>
                <option value="5 dias">5 dias</option>
                <option value="7 dias">7 dias</option>
                <option value="10 dias">10 dias</option>
                <option value="15 dias">15 dias</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Resultados */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Carregando viagens...</div>
        ) : filteredTravels.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredTravels.map((travel) => (
              <motion.div
                key={travel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TravelCard travel={travel} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <FilterIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Travels;
