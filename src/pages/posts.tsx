import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Deseja excluir este post?');
    if (!confirm) return;

    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) fetchPosts();
  };

  const handleSubmit = async (postData: any) => {
    if (selectedPost?.id) {
      const { error } = await supabase.from('posts').update(postData).eq('id', selectedPost.id);
      if (!error) {
        setShowForm(false);
        setSelectedPost(null);
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from('posts').insert([postData]);
      if (!error) {
        setShowForm(false);
        fetchPosts();
      }
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 pb-20 bg-[#f8f9fa]">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-2">Gerenciar Posts do Blog</h1>
          <p className="text-gray-500">Crie, edite ou exclua os conteúdos do seu blog</p>
        </div>

        {!showForm && (
          <div className="text-center">
            <Button
              onClick={() => {
                setSelectedPost(null);
                setShowForm(true);
              }}
              className="bg-[#4e1b91] hover:bg-[#3d147b] text-white px-6 py-3 rounded-xl"
            >
              <FaPlus className="mr-2" /> Novo Post
            </Button>
          </div>
        )}

        {showForm ? (
          <div className="bg-white p-6 rounded-2xl shadow border">
            <PostForm initialValues={selectedPost} onSubmit={handleSubmit} />
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setShowForm(false);
                  setSelectedPost(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md"
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition">
                <PostCard post={post} />
                <div className="flex gap-2 p-4 pt-0">
                  <Button
                    onClick={() => {
                      setSelectedPost(post);
                      setShowForm(true);
                    }}
                    className="bg-[#4e1b91] hover:bg-[#3d147b] text-white px-4 py-2 text-sm rounded-md"
                  >
                    <FaEdit className="mr-1" /> Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md"
                  >
                    <FaTrash className="mr-1" /> Excluir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
