import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar post:', error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div className="text-center mt-20 text-gray-500">Carregando post...</div>;
  }

  const formattedDate = new Date(post.published_date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const images = post.cover_image?.split(',').map((img: string) => img.trim());

  return (
    <div className="bg-white min-h-screen px-4 mt-60 pb-10 max-w-6xl mx-auto">
      {/* pt-28 ↑↑↑ Garante espaço abaixo da navbar fixa */}

      {/* Botão voltar */}
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#0b6b5c] hover:text-[#064c41] transition font-medium"
        >
          <ArrowLeft size={18} className="mr-2" />
          Voltar
        </button>
      </div>

      {/* Layout Responsivo */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Texto (esquerda no desktop) */}
        <div className="lg:w-1/2 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0b6b5c] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
            )}
          </div>

          <blockquote className="bg-[#e6f7f5] border-l-4 border-[#0b6b5c] p-4 text-[#0b6b5c] italic rounded-lg">
            {post.summary}
          </blockquote>

          <div className="prose prose-sm sm:prose-base max-w-none text-gray-800">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Carrossel (direita no desktop) */}
        {images?.length > 0 && (
          <div className="lg:w-1/2 w-full">
            <div className="aspect-square rounded-xl overflow-hidden shadow-md">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={5000}
              >
                {images.map((url: string, index: number) => (
                  <div key={index} className="aspect-square bg-gray-100">
                    <img
                      src={url}
                      alt={`Imagem ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;