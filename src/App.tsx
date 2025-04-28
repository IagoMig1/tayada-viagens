import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Travels from './pages/Travels';
import TravelDetail from './pages/TravelDetail';
import Contact from './pages/Contact';
import Sobre from './pages/Sobre'; 
import AddTravel from './pages/AddTravel'; // Importando o componente AddTravel
import { createClient } from '@supabase/supabase-js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ScrollToTop from './ScrollToTop'; // Importando o ScrollToTop

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export function App() {
  const [travels, setTravels] = useState<any[]>([]);

  // Carregar dados das viagens do Supabase
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

  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Coloque o ScrollToTop aqui */}
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinos" element={<Travels />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/add-travel" element={<AddTravel />} /> {/* Adicionando a rota para AddTravel */}

            {/* Definindo a rota dinâmica para cada viagem */}
            <Route path="/destino/:id" element={<TravelDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
