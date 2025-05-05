import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Função para buscar dados da tabela 'trips' ou qualquer outra que você tenha
export const getTravelData = async () => {
  try {
    const { data, error } = await supabase
      .from('travels') // Substitua pelo nome da sua tabela
      .select('*');  // Você pode ajustar os campos conforme necessário
    if (error) throw error;
    return data;  // Retorna os dados obtidos
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];  // Retorna um array vazio em caso de erro
  }
};
export const getPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts') // sua tabela de blog
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};
