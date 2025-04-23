import React, { useState } from 'react';
import { SendIcon, CheckIcon } from 'lucide-react';
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setSubscribed(true);
    setEmail('');
  };
  return <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Receba Ofertas Exclusivas</h2>
          <p className="text-lg mb-8">
            Inscreva-se para receber as melhores ofertas de viagens e dicas de
            destinos incríveis.
          </p>
          {subscribed ? <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-flex items-center">
              <CheckIcon size={24} className="text-green-400 mr-3" />
              <p className="text-white">
                Obrigado por se inscrever! Em breve você receberá nossas
                novidades.
              </p>
            </div> : <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Seu melhor e-mail" value={email} onChange={e => setEmail(e.target.value)} required className="flex-1 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <button type="submit" className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center">
                <SendIcon size={20} className="mr-2" />
                Inscrever-se
              </button>
            </form>}
        </div>
      </div>
    </section>;
};
export default NewsletterSection;