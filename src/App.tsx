import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Travels from './pages/Travels';
import TravelDetail from './pages/TravelDetail';
import Contact from './pages/Contact';
import Sobre from './pages/Sobre';
import AddTravel from './pages/AddTravel';
import Login from './pages/Login'; // Importando o componente de login
import { createClient } from '@supabase/supabase-js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ScrollToTop from './ScrollToTop';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export function App() {
  const [travels, setTravels] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);  // Estado para armazenar o usuário

  // Verificar se o usuário está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getSession();
      if (user) {
        setUser(user);  // Se existir uma sessão ativa, armazene o usuário no estado
      }
    };

    checkAuth();

    // Ouvir mudanças no estado de autenticação (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);  // Atualize o estado com a nova sessão
        } else {
          setUser(null);  // Caso o usuário faça logout, remova a sessão
        }
      }
    );

    // Cleanup do listener
    return () => {
      authListener?.unsubscribe();
    };
  }, []); // Essa função será chamada apenas uma vez, ao carregar a aplicação

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
  }, []);  // Esse useEffect roda apenas quando a página é carregada

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinos" element={<Travels />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} /> {/* Adicionando a rota do login */}

            {/* Protegendo a rota de AddTravel */}
            <Route
              path="/add-travel"
              element={user ? <AddTravel /> : <Navigate to="/login" />}
            />

            {/* Definindo a rota dinâmica para cada viagem */}
            <Route path="/destino/:id" element={<TravelDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
