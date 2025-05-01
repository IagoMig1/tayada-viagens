import React, { useState } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';  
import emailjs from 'emailjs-com';  

const Contact = () => {
  const [status, setStatus] = useState(""); 

  // Função para enviar o formulário
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_ld1azse',     
        '3T4kw0p6ndOYvtYBv',      
        e.target as HTMLFormElement,
        'YOUR_USER_ID'           
      )
      .then(
        (result) => {
          setStatus("Mensagem enviada com sucesso!"); 
          console.log(result.text);
        },
        (error) => {
          setStatus("Erro ao enviar a mensagem. Tente novamente."); 
          console.log(error.text);
        }
      );
  };

  return (
    <motion.div
      className="bg-gray-50 w-full"
      initial={{ opacity: 0 }}       
      animate={{ opacity: 1 }}       
      transition={{ duration: 0.5 }}  
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Entre em Contato
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <ContactForm sendEmail={sendEmail} />
            {status && <p className="text-center mt-4 text-gray-600">{status}</p>} 
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
                      Av. Francisco Alves Moreira, 355 Caçapava - SP,
                      <br />
                      Vila Santos,
                      <br />
                      CEP:  12280-011
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon size={24} className="text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Telefone</h3>
                    <p className="text-gray-600">(12) 3653-7242</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MailIcon size={24} className="text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">E-mail</h3>
                    <p className="text-gray-600">atendimento@tayadaviagens.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon size={24} className="text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      Horário de Funcionamento
                    </h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 09h às 18h
                      <br />
                      Sábado: 09h às 13h
                      <br />
                      Domingo: Fechado
                    </p>
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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.5290172881474!2d-45.71479252400369!3d-23.610645878780584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cdcbdb45f3b1b5%3A0xf9a3b34240b03a96!2sAv.%20Francisco%20Alves%20Moreira%2C%20355%20-%20Vila%20Santos%2C%20Ca%C3%A7apava%20-%20SP%2C%2012280-011!5e0!3m2!1spt-BR!2sbr!4v1713967462236!5m2!1spt-BR!2sbr" width="100%" height="100%" style={{
                  border: 0
                }} allowFullScreen={false} loading="lazy" title="Mapa da localização"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
