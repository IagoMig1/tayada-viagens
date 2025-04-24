import React from 'react';
import ParallaxBackground from '../components/ParallaxBackground';
import { motion } from 'framer-motion';

interface Milestone {
  ano: string;
  texto: string;
}

const Sobre: React.FC = () => {
  const milestones: Milestone[] = [
    { ano: '2015', texto: 'Fundação da Tayada Viagens com foco em viagens nacionais, oferecendo aos nossos clientes as melhores opções de destinos e pacotes personalizados.' },
    { ano: '2017', texto: 'Expansão para pacotes internacionais, trazendo ao público a oportunidade de explorar novos destinos e experiências culturais em todo o mundo.' },
    { ano: '2020', texto: 'Início de parcerias com grandes agências globais e hotéis exclusivos, ampliando as opções de hospedagem e roteiros de viagem de alto padrão.' },
    { ano: '2024', texto: 'Comemoração de mais de 10.000 clientes atendidos com excelência e personalização, consolidando nossa posição como líder no mercado de viagens.' },
  ];

  return (
    <div className="w-full">
      {/* Banner com imagem de fundo */}
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1900"
        overlayColor="bg-black/50"
      >
        <motion.div
          className="container mx-auto px-4 h-full flex items-center justify-center text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-3xl animate__animated animate__fadeIn">
            <h1 className="text-5xl font-bold mb-6">Sobre a Tayada Viagens</h1>
            <p className="text-xl opacity-80">
              A Tayada Viagens é uma empresa com um compromisso inabalável em proporcionar as melhores experiências de viagem. 
              Conheça nossa história e os valores que nos guiam todos os dias.
            </p>
          </div>
        </motion.div>
      </ParallaxBackground>

      {/* Linha do Tempo */}
      <section className="py-24 bg-white text-gray-800 animate__animated animate__fadeIn">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">Nossa Jornada</h2>
        </motion.div>
      </section>

      {/* Sobre a Empresa */}
      <motion.section
        className="relative py-32 bg-gradient-to-br from-white via-gray-50 to-teal-50 text-gray-800 overflow-hidden animate__animated animate__fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-16 relative z-10">
          {/* Imagem com moldura suave */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative p-2 bg-white shadow-xl rounded-3xl border-4 border-teal-200 hover:scale-105 transition-transform duration-500">
              <img
                src="./logo vertical.png"
                alt="Logo Tayada Viagens"
                className="w-72 h-auto object-contain"
              />
            </div>
          </div>

          {/* Texto com destaque visual */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block mb-4 px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium tracking-wide">
              Conheça nossa história
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-teal-700">
              Sobre a Tayada Viagens
            </h2>
            <p className="text-lg md:text-xl mb-4 leading-relaxed text-gray-700">
              A Tayada Viagens nasceu com a missão de transformar sonhos em destinos. Atuando há mais de 10 anos no mercado,
              oferecemos experiências completas e personalizadas, cuidando de cada detalhe da sua viagem.
            </p>
            <p className="text-lg md:text-xl mb-4 leading-relaxed text-gray-700">
              Nossa equipe é formada por especialistas apaixonados por turismo, comprometidos em planejar roteiros sob medida
              com conforto, segurança e momentos memoráveis.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              Na Tayada, acreditamos que cada viagem é única. Por isso, ouvimos você, entendemos seus objetivos e criamos
              experiências que ficam para sempre na memória.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Parcerias */}
      <motion.section
        className="py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative animate__animated animate__fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 relative inline-block">
            Nossas Parcerias
            <span className="block w-24 h-1 bg-teal-400 mt-2 mx-auto rounded-full animate-pulse"></span>
          </h2>
          <p className="text-gray-400 mb-16 max-w-xl mx-auto">
            Parceiros que confiam em nosso trabalho e tornam cada jornada ainda mais especial.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center justify-center">
            {[ './cvc.png', './cvc.png', './cvc.png' ].map((logo, i) => (
              <div
                key={i}
                className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={logo}
                  alt={`Parceria ${i}`}
                  className="h-50 w-20 mx-auto object-contain filter"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Equipe */}
      <motion.section
        className="relative py-32 bg-gray-50 text-gray-800 overflow-hidden animate__animated animate__fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-teal-100 via-white to-transparent rounded-full mix-blend-multiply opacity-40 animate-pulse-slow"></div>

        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-16 relative z-10">
          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-700 leading-tight">
              Nosso Time
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0">
              Profissionais apaixonados por viagens e comprometidos com experiências únicas para cada cliente. Planejamos cada roteiro com dedicação e atenção aos detalhes.
            </p>
          </div>

          {/* Imagem com borda e efeito */}
          <div className="flex-1 flex justify-center">
            <div className="relative rounded-3xl shadow-2xl overflow-hidden border-4 border-teal-600 group">
              <img
                src="https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Equipe Tayada Viagens"
                className="object-cover w-full h-[400px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Missão, Visão e Valores */}
      <motion.section
        className="py-28 bg-gradient-to-br from-white to-gray-100 text-gray-800 animate__animated animate__fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-16 relative inline-block">
            Missão, Visão e Valores
            <span className="block w-24 h-1 bg-teal-500 mt-2 mx-auto rounded-full animate-pulse"></span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[ 
              { title: 'Missão', icon: '🚀', text: 'Proporcionar experiências de viagem únicas, com qualidade, segurança e atendimento personalizado.' },
              { title: 'Visão', icon: '🌍', text: 'Ser referência nacional em turismo personalizado até 2030 com roteiros exclusivos.' },
              { title: 'Valores', icon: '💎', text: 'Transparência, confiança, paixão por viagens e excelência no atendimento.' }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-3xl shadow-2xl hover:shadow-teal-400/40 hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-4 animate-bounce-slow">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-teal-600">{item.title}</h3>
                <p className="text-md text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Sobre;
