import React, { useState } from 'react';
import { SendIcon, CheckIcon, Loader2Icon, AlertTriangleIcon, MapPinIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const NewsletterSection = () => {
  const [suggestion, setSuggestion] = useState({
    uf: '',
    city: '',
  });

  const [suggestionStatus, setSuggestionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSuggestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSuggestion(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestionStatus('loading');

    const { error } = await supabase.from('viagens_sugeridas').insert({
      uf: suggestion.uf,
      city: suggestion.city,
    });

    if (!error) {
      setSuggestionStatus('success');
      setSuggestion({ uf: '', city: '' });
    } else {
      console.error('Erro sugestão:', error.message);
      setSuggestionStatus('error');
    }
  };

  return (
    <section className="relative py-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-xl">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Indique uma viagem!</h2>
            <p className="text-sm text-gray-200">Diga pra onde você gostaria de viajar com a gente</p>
          </div>

          {suggestionStatus === 'success' && (
            <div className="text-green-100 bg-green-600/30 border border-green-400 rounded-md p-3 mb-4 flex items-center">
              <CheckIcon size={18} className="mr-2" />
              Viagem sugerida com sucesso!
            </div>
          )}
          {suggestionStatus === 'error' && (
            <div className="text-red-100 bg-red-600/30 border border-red-400 rounded-md p-3 mb-4 flex items-center">
              <AlertTriangleIcon size={18} className="mr-2" />
              Erro ao sugerir viagem.
            </div>
          )}

          <form onSubmit={handleSuggestionSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
            <select
              name="uf"
              value={suggestion.uf}
              onChange={handleSuggestionChange}
              required
              className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="">UF da viagem</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf} className="text-black">{uf}</option>
              ))}
            </select>

            <input
              name="city"
              placeholder="Cidade da viagem"
              value={suggestion.city}
              onChange={handleSuggestionChange}
              required
              className="px-4 py-2 rounded-md bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <button
              type="submit"
              disabled={suggestionStatus === 'loading'}
              className="col-span-1 sm:col-span-2 mt-2 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-md transition duration-300 flex items-center justify-center gap-2"
            >
              {suggestionStatus === 'loading' ? (
                <>
                  <Loader2Icon size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <SendIcon size={18} />
                  Sugerir viagem
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
