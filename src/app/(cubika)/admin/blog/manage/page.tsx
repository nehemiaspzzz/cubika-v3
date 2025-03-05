"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
}

export default function ManagePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts');
      if (!response.ok) throw new Error('Error al cargar los posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Error al cargar los posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!password) {
      alert('Por favor ingresa la contraseña de administrador');
      return;
    }

    if (!window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      return;
    }

    setIsDeleting(true);
    setDeleteId(id);

    try {
      const response = await fetch(`/api/blog/post?id=${id}&password=${password}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar el post');
      }

      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar el post');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Administrar Posts
          </motion.h1>
          <Link
            href="/admin/blog"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
          >
            Crear Nuevo Post
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-[32px] shadow-[0_0_40px_rgba(0,0,0,0.04)] p-8"
        >
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña de Administrador
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {isLoading ? (
            <div className="text-center py-8">Cargando posts...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No hay posts publicados</div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-6 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  {post.image && (
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting && deleteId === post.id}
                    className={`px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all ${
                      (isDeleting && deleteId === post.id) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isDeleting && deleteId === post.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
} 