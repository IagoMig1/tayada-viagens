import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Travels from './pages/Travels';
import 'swiper/css';
import 'swiper/css/pagination';
import TravelDetail from './pages/TravelDetail';
import Contact from './pages/Contact';
import Sobre from './pages/Sobre';
import AddTravel from './pages/AddTravel';
import PrivateTravel from './components/PrivateTravel';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import UpdateTravel from './pages/UpdateTravel';
import Blog from "./pages/blog";
 // ✅ Importação da página pública do blog
import PostsPage from './pages/posts'; // ✅ Importação da nova página
import { createClient } from '@supabase/supabase-js';
import PostDetail from './components/PostDetail';
import ScrollToTop from './ScrollToTop';
import { Toaster } from 'react-hot-toast'; // ✅ Importação do Toaster

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export function App() {
  const [travels, setTravels] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getSession();
      if (user) {
        setUser(user);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

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
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/destinos" element={<Travels />} />
  <Route path="/contato" element={<Contact />} />
  <Route path="/sobre" element={<Sobre />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/add-travel"
    element={user ? <AddTravel /> : <Navigate to="/login" />}
  />
  <Route
    path="/adminpanel"
    element={user ? <AdminPanel /> : <Navigate to="/login" />}
  />
  <Route
    path="/editar-viagem/:id"
    element={user ? <UpdateTravel /> : <Navigate to="/login" />}
  />
  <Route path="/destino/:id" element={<TravelDetail />} />
  <Route path="/posts" element={<PostsPage />} />

  <Route path="/blog" element={<Blog />} />
  <Route path="/blog/:id" element={<PostDetail />} /> {/* ✅ Esta é a linha que faltava */}
</Routes>

        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
