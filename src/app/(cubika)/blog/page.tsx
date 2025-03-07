"use client";

import { PostsCard } from "@/components/Posts/PostCard";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  _embedded: {
    author: {
      name: string;
    }[];
    'wp:featuredmedia': {
      source_url: string;
    }[];
  };
  slug: string;
}

interface LocalPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  additionalImages?: string[];
  createdAt: string;
  category?: string;
  template: 'simple' | 'gallery' | 'featured';
}

export default function BlogPage() {
  const [localPosts, setLocalPosts] = useState<LocalPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Función para obtener posts del primer repositorio
    const fetchLocalPosts = async () => {
      try {
        const res = await fetch('/api/blog/posts');
        if (!res.ok) throw new Error('Error fetching local posts');
        return await res.json();
      } catch (error) {
        console.error('Error fetching local posts:', error);
        return [];
      }
    };

    // Función para obtener posts del segundo repositorio
    const fetchSecondaryPosts = async () => {
      try {
        // Cambia esta URL por la de tu segundo repositorio
        const res = await fetch('https://tu-segundo-repositorio.com/api/posts');
        if (!res.ok) throw new Error('Error fetching secondary posts');
        
        // Adapta el formato de los datos si es necesario
        const data = await res.json();
        return data.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content || post.description || '',
          image: post.image || post.featured_image || '',
          createdAt: post.createdAt || post.created_at || post.date || new Date().toISOString(),
          template: 'simple'
        }));
      } catch (error) {
        console.error('Error fetching secondary posts:', error);
        return [];
      }
    };

    // Obtener posts de ambas fuentes y combinarlos
    const fetchAllPosts = async () => {
      setIsLoading(true);
      try {
        const [primary, secondary] = await Promise.all([
          fetchLocalPosts(),
          fetchSecondaryPosts()
        ]);

        // Combinar y ordenar por fecha (más recientes primero)
        const combinedPosts = [...primary, ...secondary].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setLocalPosts(combinedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
        >
          <div className="relative h-[500px]">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/images/about-us-image-2.webp"
              alt="Blog Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-4 py-1 bg-primary text-white text-sm font-medium rounded-full mb-4"
                >
                  Blog Cubika
                </motion.span>
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl"
                >
                  Explorando el Futuro del Desarrollo Inmobiliario
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
                >
                  Descubre las últimas novedades y tendencias en desarrollo inmobiliario sustentable
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Featured Post */}
            {Array.isArray(localPosts) && localPosts.length > 0 && (
              <Link href={`/blog/${localPosts[0].id}`}>
                <motion.article 
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg overflow-hidden mb-12"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 relative overflow-hidden">
                      {localPosts[0].image && (
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          src={localPosts[0].image}
                          alt={localPosts[0].title}
                          className="w-full h-full object-cover min-h-[300px]"
                        />
                      )}
                      {localPosts[0].category && (
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="absolute top-6 left-6 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full"
                        >
                          {localPosts[0].category}
                        </motion.span>
                      )}
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <motion.h2 
                        className="text-3xl font-bold text-gray-900 mb-4"
                      >
                        {localPosts[0].title}
                      </motion.h2>
                      <motion.p 
                        className="text-gray-600 mb-6 line-clamp-3"
                      >
                        {localPosts[0].content}
                      </motion.p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">
                          {new Date(localPosts[0].createdAt).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <motion.span 
                          whileHover={{ x: 10 }}
                          className="text-primary inline-flex items-center"
                        >
                          Leer más
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            )}

            {/* Posts Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Array.isArray(localPosts) && localPosts.length > 1 
                ? localPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/blog/${post.id}`}>
                      <article className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                        {post.image && (
                          <div className="relative h-48 overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            {post.category && (
                              <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-sm font-medium rounded-full"
                              >
                                {post.category}
                              </motion.span>
                            )}
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.content}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <motion.span 
                              whileHover={{ x: 10 }}
                              className="text-primary inline-flex items-center"
                            >
                              Leer más
                              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))
                : null}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}