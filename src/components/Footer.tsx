import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-800 text-white pt-10 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Viagens Brasil</h3>
            <p className="text-gray-300">
              Sua agência de turismo para descobrir as maravilhas do Brasil e do
              mundo. Oferecemos os melhores pacotes de viagem com preços
              imbatíveis.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/destinos" className="text-gray-300 hover:text-white transition-colors">
                  Destinos
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon size={20} className="flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  Av. Paulista, 1000 - São Paulo, SP
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon size={20} />
                <p className="text-gray-300">(11) 9999-9999</p>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon size={20} />
                <p className="text-gray-300">contato@viagensbrasil.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Viagens Brasil. Todos os direitos
            reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FacebookIcon size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <InstagramIcon size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <TwitterIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;