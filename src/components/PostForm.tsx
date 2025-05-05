import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PostFormProps {
  initialValues?: {
    id?: string;
    title: string;
    summary: string;
    content: string;
    cover_image?: string;
    author?: string;
  };
  onSubmit: (data: any) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [summary, setSummary] = useState(initialValues?.summary || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [author, setAuthor] = useState(initialValues?.author || '');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (): Promise<string | undefined> => {
    if (imageFiles.length === 0) return initialValues?.cover_image;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of imageFiles.slice(0, 3)) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from('images')
        .upload(`posts/${fileName}`, file);

      if (!error) {
        const { data: publicUrl } = supabase
          .storage
          .from('images')
          .getPublicUrl(`posts/${fileName}`);
        if (publicUrl?.publicUrl) {
          uploadedUrls.push(publicUrl.publicUrl);
        }
      } else {
        console.error('Erro ao subir imagem:', error.message);
      }
    }

    setUploading(false);
    return uploadedUrls[0]; // Só salva a primeira como cover_image
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadedCover = await handleImageUpload();
    onSubmit({
      title,
      summary,
      content,
      author,
      cover_image: uploadedCover,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Título do post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        placeholder="Resumo do post"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={3}
        required
      />

      <Textarea
        placeholder="Conteúdo completo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        required
      />

      <Input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files).slice(0, 3) : [];
          setImageFiles(files);
        }}
      />
      <p className="text-sm text-gray-500">Você pode selecionar até 3 imagens. Apenas a primeira será usada como capa.</p>

      <Button
        type="submit"
        disabled={uploading}
        className="bg-[#4e1b91] hover:bg-[#3d147b] text-white w-full"
      >
        {uploading ? 'Enviando imagens...' : 'Salvar Post'}
      </Button>
    </form>
  );
};

export default PostForm;
