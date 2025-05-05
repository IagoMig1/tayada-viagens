import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { FaUtensils } from 'react-icons/fa';

import {
  FaPlane, FaBus, FaShuttleVan, FaTshirt, FaExchangeAlt,
  FaShoppingCart, FaGift, FaMoneyBillWave, FaHotel, FaCalendarAlt, FaUserTie
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  'https://rehqecghbtpowejzwkpg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaHFlY2doYnRwb3dlanp3a3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDcyNzEsImV4cCI6MjA2MTQyMzI3MX0.uucJX7oj2yfZsobItacZq1p1xglLu7KMunYHQRESvtg'
);

const COLORS = {
  primary: '#00853b', // Verde Tayada
  danger: '#e53935',
  text: '#222222',
  background: '#ffffff',
  card: '#f0f4f2',
  border: '#d6e2dd'
};

const commonOptions = [
  { label: 'Transporte Aéreo', value: 'air', icon: <FaPlane /> },
  { label: 'Transporte Terrestre', value: 'ground', icon: <FaBus /> },
  { label: 'Lavanderia', value: 'laundry', icon: <FaTshirt /> },
  { label: 'Traslado', value: 'transfer', icon: <FaShuttleVan /> },
  { label: 'Caçapava → São Paulo', value: 'csp', icon: <FaExchangeAlt /> },
  { label: 'São Paulo → Caçapava', value: 'spc', icon: <FaExchangeAlt /> },
  { label: 'Compras', value: 'shopping', icon: <FaShoppingCart /> },
  { label: 'Lembranças', value: 'souvenirs', icon: <FaGift /> },
  { label: 'Gastos pessoais', value: 'personal_expenses', icon: <FaMoneyBillWave /> },
  { label: 'Hospedagem', value: 'hotel', icon: <FaHotel /> },
  { label: 'Guia de Turismo', value: 'guide', icon: <FaUserTie /> },
  { label: 'Alimentação', value: 'food', icon: <FaUtensils /> } // ← esta linha é a nova
];


const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-emerald-600';

  return (
    <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white text-center z-50 ${bgColor}`}>
      {message}
    </div>
  );
};

const TravelForm = ({ initialValues, onSubmit }) => {
  const [uploading, setUploading] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: initialValues?.id || undefined,
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    long_description: initialValues?.long_description || '',
    group_size: initialValues?.group_size || '',
    departure_location: initialValues?.departure_location || '',
    location: initialValues?.location || '',
    duration: initialValues?.duration || '',
    price: initialValues?.price || '',
    image: initialValues?.image || '',
    includes: initialValues?.includes || [],
    not_included: initialValues?.not_included || [],
    date: initialValues?.date ? new Date(initialValues.date) : new Date(),
    end_date: initialValues?.end_date ? new Date(initialValues.end_date) : new Date(),
    vagas_restantes: initialValues?.vagas_restantes || ''
  });

  const toggleOption = (type, value) => {
    setFormData((prev) => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value]
      };
    });
  };

  const showNotif = (msg, type = 'success') => {
    setNotification({ message: msg, type });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage.from('images').upload(filePath, file);

    if (error) {
      showNotif('Erro ao fazer upload da imagem.', 'error');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    setFormData((prev) => ({ ...prev, image: data.publicUrl }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      date: formData.date.toISOString(),
      end_date: formData.end_date.toISOString()
    };

    if (formData.id) {
      const { error } = await supabase
        .from('travels')
        .update(payload)
        .eq('id', formData.id);

      if (error) {
        showNotif('Erro ao atualizar a viagem.', 'error');
      } else {
        showNotif('Viagem atualizada com sucesso!');
        onSubmit?.(payload);
        navigate('/AdminPanel');
      }
    } else {
      const newId = uuidv4();
      const { error } = await supabase
        .from('travels')
        .insert([{ ...payload, id: newId }]);

      if (error) {
        showNotif('Erro ao criar a viagem.', 'error');
      } else {
        showNotif('Viagem criada com sucesso!');
        onSubmit?.({ ...payload, id: newId });
        navigate('/AdminPanel');
      }
    }
  };

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
      <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl shadow-xl max-w-3xl mx-auto" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <h2 className="text-2xl font-semibold text-center" style={{ color: COLORS.primary }}>Cadastro de Viagem</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input placeholder="Título da viagem" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <Input placeholder="Descrição curta" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <Input placeholder="Duração (ex: 7 dias / 6 noites)" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
          <Input placeholder="Local" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          <Input placeholder="Preço (R$)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
          <Input placeholder="Tamanho do grupo" type="number" value={formData.group_size} onChange={(e) => setFormData({ ...formData, group_size: Number(e.target.value) })} />
          <Input placeholder="Local de partida" value={formData.departure_location} onChange={(e) => setFormData({ ...formData, departure_location: e.target.value })} />
          <Input placeholder="Vagas restantes" type="number" value={formData.vagas_restantes} onChange={(e) => setFormData({ ...formData, vagas_restantes: Number(e.target.value) })} />
        </div>

        <textarea
          placeholder="Descrição longa"
          className="w-full border rounded-lg p-3 text-sm"
          rows={5}
          value={formData.long_description}
          onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
        />

        <div>
          <label className="font-semibold block mb-1" style={{ color: COLORS.text }}>Imagem:</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading ? <p>Carregando imagem...</p> : formData.image && <img src={formData.image} alt="Preview" className="mt-3 rounded-xl max-h-56 border" />}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="font-semibold block mb-1" style={{ color: COLORS.text }}>Inclui:</label>
            <div className="flex flex-wrap gap-2">
              {commonOptions.map((opt) => (
                <button
                  key={`inc-${opt.value}`}
                  type="button"
                  onClick={() => toggleOption('includes', opt.value)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${formData.includes.includes(opt.value) ? 'opacity-100' : 'opacity-50'}`}
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {opt.icon}<span className="text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <label className="font-semibold block mb-1" style={{ color: COLORS.text }}>Não inclui:</label>
            <div className="flex flex-wrap gap-2">
              {commonOptions.map((opt) => (
                <button
                  key={`ninc-${opt.value}`}
                  type="button"
                  onClick={() => toggleOption('not_included', opt.value)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${formData.not_included.includes(opt.value) ? 'opacity-100' : 'opacity-50'}`}
                  style={{ backgroundColor: COLORS.danger }}
                >
                  {opt.icon}<span className="text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1" style={{ color: COLORS.text }}>Data de ida:</label>
            <button type="button" className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm" onClick={() => setShowStartCalendar(!showStartCalendar)}>
              <FaCalendarAlt /><span>{format(formData.date, 'dd/MM/yyyy')}</span>
            </button>
            {showStartCalendar && (
              <Calendar selected={formData.date} mode="single" onSelect={(date) => date && setFormData({ ...formData, date })} />
            )}
          </div>

          <div>
            <label className="font-semibold block mb-1" style={{ color: COLORS.text }}>Data de volta:</label>
            <button type="button" className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm" onClick={() => setShowEndCalendar(!showEndCalendar)}>
              <FaCalendarAlt /><span>{format(formData.end_date, 'dd/MM/yyyy')}</span>
            </button>
            {showEndCalendar && (
              <Calendar selected={formData.end_date} mode="single" onSelect={(date) => date && setFormData({ ...formData, end_date: date })} />
            )}
          </div>
        </div>

        <Button type="submit" style={{ backgroundColor: COLORS.primary, color: 'white' }} className="w-full py-2 text-lg rounded-xl hover:brightness-110">
          Salvar viagem
        </Button>
      </form>
    </>
  );
};

export default TravelForm;
