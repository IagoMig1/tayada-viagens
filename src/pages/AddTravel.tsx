import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AddTravel = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState('');
  const [groupSize, setGroupSize] = useState(0);
  const [departureLocation, setDepartureLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [includes, setIncludes] = useState<string[]>([]);
  const [notIncluded, setNotIncluded] = useState<string[]>([]);
  const [travelDate, setTravelDate] = useState<string>('');  // Novo campo de data
  const [travels, setTravels] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<'includes' | 'notIncluded' | null>(null);

  const includesOptions = [
    "Transporte", "Acomodações", "Alimentação", "Atividades", "Guias turísticos"
  ];

  const notIncludedOptions = [
    "Passagens aéreas", "Seguro viagem", "Gastos pessoais"
  ];

  useEffect(() => {
    const fetchTravels = async () => {
      const { data, error } = await supabase.from('travels').select('*');
      if (error) {
        console.error('Erro ao carregar viagens:', error.message);
      } else {
        setTravels(data);
      }
    };
    fetchTravels();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let imageUrl: string | null = null;
  
    if (image) {
      const fileExt = image.name.split('.').pop();
      const filePath = `travels/${Date.now()}.${fileExt}`;
  
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, image);
  
      if (uploadError) {
        alert('Erro ao enviar a imagem: ' + uploadError.message);
        return;
      }
  
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
  
      if (urlError) {
        alert('Erro ao obter a URL da imagem: ' + urlError.message);
        return;
      }
  
      imageUrl = publicUrlData.publicUrl;
    }

    // Formatando a data para o formato pt-BR
    const formattedDate = travelDate.split('-').reverse().join('/');

    const { error } = await supabase.from('travels').insert([{
      title,
      location,
      image: imageUrl,
      description,
      long_description: longDescription,
      duration,
      price,
      group_size: groupSize,
      departure_location: departureLocation,
      includes,
      not_included: notIncluded,
      date: travelDate,  // Salvando a data diretamente na coluna `date`
    }]);
  
    if (error) {
      alert('Erro ao cadastrar a viagem: ' + error.message);
    } else {
      alert('Viagem cadastrada com sucesso!');
      navigate('/travels');
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('travels').delete().eq('id', id);

    if (error) {
      alert('Erro ao excluir a viagem: ' + error.message);
    } else {
      alert('Viagem excluída com sucesso!');
      setTravels((prev) => prev.filter((travel) => travel.id !== id));
    }
  };

  const handleEdit = async (id: string) => {
    const travelToEdit = travels.find((travel) => travel.id === id);
    if (travelToEdit) {
      setTitle(travelToEdit.title);
      setDescription(travelToEdit.description);
      setLongDescription(travelToEdit.long_description || []);
      setLocation(travelToEdit.location);
      setPrice(travelToEdit.price);
      setDuration(travelToEdit.duration);
      setGroupSize(travelToEdit.group_size || 0);
      setDepartureLocation(travelToEdit.departure_location || '');
      setIncludes(travelToEdit.includes || []);
      setNotIncluded(travelToEdit.not_included || []);
      setTravelDate(travelToEdit.date); // Usando a data armazenada na coluna `date`
    }
    navigate('/add-travel');
  };

  const handleSelectChange = (option: string, type: 'includes' | 'notIncluded') => {
    if (type === 'includes') {
      setIncludes(prev => 
        prev.includes(option) ? prev : [...prev, option]
      );
    } else {
      setNotIncluded(prev => 
        prev.includes(option) ? prev : [...prev, option]
      );
    }
    setOpenDropdown(null); // Fechar o dropdown após a seleção
  };

  const handleLongDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLongDescription(e.target.value.split("\n"));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const toggleDropdown = (dropdown: 'includes' | 'notIncluded') => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);  // Fechar o menu atual se ele já estiver aberto
    } else {
      setOpenDropdown(dropdown);  // Abrir o novo menu e fechar o outro
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl mt-24">
      <h2 className="text-3xl font-bold text-center mb-8">Cadastrar Nova Viagem</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Título da Viagem</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Descrição Curta</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Long Description */}
        <div className="flex flex-col">
          <label htmlFor="long_description" className="text-sm font-medium text-gray-700">Descrição Longa</label>
          <textarea
            id="long_description"
            value={longDescription.join("\n")}
            onChange={handleLongDescriptionChange}
            className="p-4 border border-gray-300 rounded-lg"
            placeholder="Digite descrições separadas por linha"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium text-gray-700">Localização</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">Preço</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="p-4 border border-gray-300 rounded-lg"
            placeholder="Ex: 1000.00"
          />
          <span className="text-sm text-gray-500">{formatPrice(price)}</span>
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label htmlFor="duration" className="text-sm font-medium text-gray-700">Duração</label>
          <input
            id="duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Group Size */}
        <div className="flex flex-col">
          <label htmlFor="group_size" className="text-sm font-medium text-gray-700">Tamanho do Grupo</label>
          <input
            id="group_size"
            type="number"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Departure Location */}
        <div className="flex flex-col">
          <label htmlFor="departure_location" className="text-sm font-medium text-gray-700">Local de Partida</label>
          <input
            id="departure_location"
            type="text"
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium text-gray-700">Imagem</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Travel Date */}
        <div className="flex flex-col">
          <label htmlFor="travel_date" className="text-sm font-medium text-gray-700">Data da Viagem</label>
          <input
            id="travel_date"
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Includes Dropdown */}
        <div className="flex flex-col relative">
          <label htmlFor="includes" className="text-sm font-medium text-gray-700">O que está incluído</label>
          <div className="relative group">
            <button 
              type="button"
              onClick={() => toggleDropdown('includes')}
              className="p-4 border border-gray-300 rounded-lg w-full text-left bg-white"
            >
              {includes.length > 0 ? includes.join(', ') : 'Selecione o que está incluído'}
            </button>
            {openDropdown === 'includes' && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg opacity-100 transition-opacity duration-300 z-10">
                {includesOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectChange(option, 'includes')}
                    className="block p-4 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Not Included Dropdown */}
        <div className="flex flex-col relative">
          <label htmlFor="not_included" className="text-sm font-medium text-gray-700">O que não está incluído</label>
          <div className="relative group">
            <button 
              type="button"
              onClick={() => toggleDropdown('notIncluded')}
              className="p-4 border border-gray-300 rounded-lg w-full text-left bg-white"
            >
              {notIncluded.length > 0 ? notIncluded.join(', ') : 'Selecione o que não está incluído'}
            </button>
            {openDropdown === 'notIncluded' && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg opacity-100 transition-opacity duration-300 z-10">
                {notIncludedOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectChange(option, 'notIncluded')}
                    className="block p-4 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 w-full">Cadastrar Viagem</button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Viagens Cadastradas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {travels.map((travel) => (
            <div key={travel.id} className="border border-gray-300 rounded-lg p-4 shadow-md">
              <img src={travel.image} alt={travel.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">{travel.title}</h3>
              <p className="text-gray-500">{travel.location}</p>
              <button
                onClick={() => handleEdit(travel.id)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg mt-4"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(travel.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddTravel;
