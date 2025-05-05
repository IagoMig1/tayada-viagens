import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: any;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/fallback.jpg';
  };

  const formattedDate = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link
      to={`/blog/${post.id}`}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      <div className="relative">
        <img
          src={post.cover_image || '/fallback.jpg'}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
        <div className="absolute top-2 left-2 bg-white/90 text-[#0b6b5c] text-xs font-semibold px-2 py-1 rounded shadow flex items-center gap-1">
          <CalendarIcon size={14} />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#0b6b5c] transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">{post.summary}</p>
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0b6b5c] hover:underline transition">
            Ler mais <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
