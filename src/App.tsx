import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Travels from './pages/Travels';
import TravelDetail from './pages/TravelDetail';
import Contact from './pages/Contact';
import Sobre from './pages/Sobre'; 
import { travelData } from './data/travelData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ScrollToTop from './ScrollToTop'; // Importando o ScrollToTop

export function App() {
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
            {travelData.map(travel => (
              <Route
                key={travel.id}
                path={`/destino/${travel.id}`}
                element={<TravelDetail travel={travel} />}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
