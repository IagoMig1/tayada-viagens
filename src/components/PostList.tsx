import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import PostCard from './PostCard';

interface Post {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  created_at: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setPosts(data as Post[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <p className="col-span-full text-center text-gray-500">Carregando posts...</p>
      ) : posts.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">Nenhum post encontrado.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
