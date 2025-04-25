import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, PhoneIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Top Bar */}
      <motion.div
        custom={1}
        variants={fadeIn}
        className={`w-full py-1 transition-all duration-300 ${
          isScrolled || !isHomePage ? 'bg-teal-600' : 'bg-black/20'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center text-white text-sm">
            <a
              href="tel:+551236537242"
              className="flex items-center hover:text-teal-100 transition-colors"
            >
              <PhoneIcon size={14} className="mr-1" />
              <span>(12) 3653-7242</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div custom={2} variants={fadeIn}>
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={
                  isScrolled || !isHomePage
                    ? '/logo horizontal.png'
                    : '/logo horizontal - mono w.png'
                }
                alt="Tayada Viagens"
                className="h-14 w-auto transition-all duration-300 drop-shadow-md group-hover:scale-105"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            custom={3}
            variants={fadeIn}
            className="hidden md:flex items-center space-x-8"
          >
            {[
              { path: '/', label: 'Início' },
              { path: '/destinos', label: 'Destinos' },
              { path: '/sobre', label: 'Sobre' },
              { path: '/contato', label: 'Contato' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium py-2 transition-colors duration-300 
                  ${isScrolled || !isHomePage ? 'text-gray-600 hover:text-teal-600' : 'text-white hover:text-teal-100'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-full after:h-0.5 after:bg-current after:scale-x-0 
                  after:transition-transform after:duration-300 hover:after:scale-x-100
                  ${location.pathname === item.path ? 'after:scale-x-100' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contato"
              className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105
                ${isScrolled || !isHomePage
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}
            >
              Reservar Agora
            </Link>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            custom={4}
            variants={fadeIn}
            className={`md:hidden focus:outline-none transition-colors duration-300 ${
              isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4 bg-white rounded-lg shadow-lg p-4 animate-fadeIn">
            {[
              { path: '/', label: 'Início' },
              { path: '/destinos', label: 'Destinos' },
              { path: '/sobre', label: 'Sobre' },
              { path: '/contato', label: 'Contato' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-800 hover:text-teal-600 transition-colors ${
                  location.pathname === item.path
                    ? 'font-medium text-teal-600'
                    : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contato"
              className="bg-teal-600 text-white text-center py-2 rounded-lg hover:bg-teal-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar Agora
            </Link>
          </nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
