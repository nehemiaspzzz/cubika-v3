"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SimpleTemplate from '@/components/Blog/templates/SimpleTemplate';
import GalleryTemplate from '@/components/Blog/templates/GalleryTemplate';
import FeaturedTemplate from '@/components/Blog/templates/FeaturedTemplate';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  additionalImages?: string[];
  createdAt: string;
  template: 'simple' | 'gallery' | 'featured';
}

const TEMPLATES = {
  simple: SimpleTemplate,
  gallery: GalleryTemplate,
  featured: FeaturedTemplate,
};

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

  const Template = TEMPLATES[post.template];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Template
          title={post.title}
          content={post.content}
          image={post.image}
          additionalImages={post.additionalImages}
        />
        <div className="mt-8 flex justify-between items-center">
          <div className="text-gray-600">
            {new Date(post.createdAt).toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
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
  );
}
