import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../lib/supabase';
import PostCard from './PostCard';

const LatestBlogPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error('Erro ao carregar os posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-teal-800">
          Últimos Posts do Blog
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ver todos os posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
