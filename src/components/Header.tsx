import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, PhoneIcon } from 'lucide-react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const isHomePage = location.pathname === '/';
  return <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      {/* Top Bar */}
      <div className={`w-full py-1 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-teal-600' : 'bg-black/20'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center text-white text-sm">
            <a href="tel:+551199999999" className="flex items-center hover:text-teal-100 transition-colors">
              <PhoneIcon size={14} className="mr-1" />
              <span>(11) 99999-9999</span>
            </a>
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div size={32} className={`transition-all duration-300 ${isScrolled || !isHomePage ? 'text-teal-600' : 'text-white'} group-hover:rotate-12`} />
            <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}>
              Tayada Viagens
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[{
            path: '/',
            label: 'Início'
          }, {
            path: '/destinos',
            label: 'Destinos'
          }, {
            path: '/contato',
            label: 'Contato'
          }].map(item => <Link key={item.path} to={item.path} className={`relative font-medium py-2 transition-colors duration-300 
                  ${isScrolled || !isHomePage ? 'text-gray-600 hover:text-teal-600' : 'text-white hover:text-teal-100'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-full after:h-0.5 after:bg-current after:scale-x-0 
                  after:transition-transform after:duration-300 hover:after:scale-x-100
                  ${location.pathname === item.path ? 'after:scale-x-100' : ''}`}>
                {item.label}
              </Link>)}
            <Link to="/contato" className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105
                ${isScrolled || !isHomePage ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}>
              Reservar Agora
            </Link>
          </nav>
          {/* Mobile Menu Button */}
          <button className={`md:hidden focus:outline-none transition-colors duration-300 ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4 bg-white rounded-lg shadow-lg p-4 animate-fadeIn">
            {[{
          path: '/',
          label: 'Início'
        }, {
          path: '/destinos',
          label: 'Destinos'
        }, {
          path: '/contato',
          label: 'Contato'
        }].map(item => <Link key={item.path} to={item.path} className={`text-gray-800 hover:text-teal-600 transition-colors ${location.pathname === item.path ? 'font-medium text-teal-600' : ''}`} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>)}
            <Link to="/contato" className="bg-teal-600 text-white text-center py-2 rounded-lg hover:bg-teal-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Reservar Agora
            </Link>
          </nav>}
      </div>
    </header>;
};
export default Header;