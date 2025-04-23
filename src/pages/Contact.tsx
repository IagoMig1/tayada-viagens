import React, { lazy } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import ContactForm from '../components/ContactForm';
const Contact = () => {
  return <div className="bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Entre em Contato
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <ContactForm />
          </div>
          {/* Contact Info */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Informações de Contato
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon size={24} className="text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Paulista, 1000
                      <br />
                      Bela Vista, 
                      <br />
                      CEP: 01310-100
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon size={24} className="text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Telefone</h3>
                    <p className="text-gray-600">(11) 9999-9999</p>
                    <p className="text-gray-600">(11) 8888-8888</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MailIcon size={24} className="text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">E-mail</h3>
                    <p className="text-gray-600">contato@viagensbrasil.com</p>
                    <p className="text-gray-600">reservas@viagensbrasil.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon size={24} className="text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      Horário de Funcionamento
                    </h3>
                    <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-gray-600">Sábado: 9h às 13h</p>
                    <p className="text-gray-600">Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Nossa Localização
              </h2>
              <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976521482147!2d-46.65567702392011!3d-23.563169361669757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1682890287285!5m2!1spt-BR!2sbr" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen={false} loading="lazy" title="Mapa da localização"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;