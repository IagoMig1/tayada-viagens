import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PostCard from "@/components/PostCard";
import { SearchIcon, FilterIcon } from "lucide-react";
import { motion } from "framer-motion";

const BlogPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) console.error("Erro ao buscar posts:", error.message);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const postDate = new Date(post.created_at);
    const matchesMonth = monthFilter
      ? postDate.getMonth() + 1 === parseInt(monthFilter)
      : true;
    const matchesYear = yearFilter
      ? postDate.getFullYear() === parseInt(yearFilter)
      : true;

    return matchesSearch && matchesMonth && matchesYear;
  });

  return (
    <section className="min-h-screen bg-white pt-32 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-[#0b6b5c] drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blog Tayada
          </motion.h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Experiências, roteiros e histórias de quem viajou com a Tayada.
          </p>
          <div className="mt-6 h-1 w-24 bg-[#fbc531] rounded-full mx-auto" />
        </div>

        {/* Filtros */}
        <motion.div
          className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <input
                type="text"
                placeholder="Buscar por título ou resumo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b6b5c]"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b6b5c]"
            >
              <option value="">Todos os meses</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
                </option>
              ))}
            </select>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b6b5c]"
            >
              <option value="">Todos os anos</option>
              {[2023, 2024, 2025].map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Lista de posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500">
            <FilterIcon className="mx-auto mb-2" size={32} />
            Nenhum post encontrado com os filtros selecionados.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
