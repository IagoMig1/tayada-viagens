// src/pages/AddTravel.tsx
import React from 'react';
import TravelForm from '@/components/TravelForm';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const AddTravel: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    const { error } = await supabase.from('travels').insert([data]);

    if (error) {
      alert('Erro ao cadastrar viagem: ' + error.message);
    } else {
      alert('Viagem cadastrada com sucesso!');
      navigate('/AdminPanel');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f2] p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-[#d6e2dd]">
        <h2 className="text-2xl font-bold mb-6 text-[#00853b] text-center">Cadastrar Nova Viagem</h2>
        <TravelForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default AddTravel;
