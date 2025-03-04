"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  category?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`);
        if (!response.ok) {
          throw new Error('Post no encontrado');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la entrada');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 md:pb-0">
        <div className="max-w-3xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-[400px] bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-24 pb-12 md:pb-0">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
            <Link href="/blog" className="text-primary hover:text-primary/80">
              Volver al Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      {post.image && (
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 -mt-32 mb-16">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Category */}
            {post.category && (
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                {post.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Date */}
            <div className="text-gray-600 mb-8">
              {new Date(post.createdAt).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Section */}
            <div className="border-t border-gray-100 mt-12 pt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Compartir:</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver al Blog
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
