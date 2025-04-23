import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Travels from './pages/Travels';
import TravelDetail from './pages/TravelDetail';
import Contact from './pages/Contact';
import { travelData } from './data/travelData';
export function App() {
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinos" element={<Travels />} />
            <Route path="/contato" element={<Contact />} />
            {travelData.map(travel => <Route key={travel.id} path={`/destino/${travel.id}`} element={<TravelDetail travel={travel} />} />)}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>;
}