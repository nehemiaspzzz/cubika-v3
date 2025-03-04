import { PostsCard } from "@/components/Posts/PostCard";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

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
  createdAt: string;
  category?: string;
}

async function getLocalPosts(): Promise<LocalPost[]> {
  const postsPath = path.join(process.cwd(), 'data', 'blog-posts.json');
  try {
    const postsData = fs.readFileSync(postsPath, 'utf-8');
    return JSON.parse(postsData);
  } catch (error) {
    return [];
  }
}

export default async function BlogPage() {
  const localPosts = await getLocalPosts();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="relative h-[500px]">
            <img
              src="/images/about-us-image-2.webp"
              alt="Blog Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="inline-block px-4 py-1 bg-primary text-white text-sm font-medium rounded-full mb-4">
                  Blog Cubika
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                  Explorando el Futuro del Desarrollo Inmobiliario
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                  Descubre las últimas novedades y tendencias en desarrollo inmobiliario sustentable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Featured Post */}
            {localPosts.length > 0 && (
              <Link href={`/blog/${localPosts[0].id}`} className="block mb-16">
                <article className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 relative">
                      {localPosts[0].image && (
                        <img
                          src={localPosts[0].image}
                          alt={localPosts[0].title}
                          className="w-full h-full object-cover min-h-[300px]"
                        />
                      )}
                      {localPosts[0].category && (
                        <span className="absolute top-6 left-6 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full">
                          {localPosts[0].category}
                        </span>
                      )}
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {localPosts[0].title}
                      </h2>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {localPosts[0].content}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">
                          {new Date(localPosts[0].createdAt).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-primary inline-flex items-center group">
                          Leer más
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* WordPress Posts */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  Noticias de Cubika
                </h2>
                <Link href="/blog/noticias" className="text-primary hover:text-primary/80 inline-flex items-center group">
                  Ver todas
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                  fetch("https://admin.grupocubika.com/wp-json/wp/v2/posts?per_page=6&_embed")
                    .then(res => res.json())
                    .then(posts => posts.map((post: Post) => (
                      <div key={post.id} className="transform hover:scale-105 transition-all duration-300">
                        <PostsCard
                          header={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
                          title={post.title.rendered}
                          text={post.excerpt.rendered}
                          date={post.date}
                          author={post._embedded?.author?.[0]?.name}
                          slug={post.slug}
                        />
                      </div>
                    )))
                }
              </div>
            </div>

            {/* Local Posts */}
            {localPosts.length > 1 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Últimas Publicaciones
                  </h2>
                  <Link href="/blog/publicaciones" className="text-primary hover:text-primary/80 inline-flex items-center group">
                    Ver todas
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {localPosts.slice(1).map((post) => (
                    <Link
                      href={`/blog/${post.id}`}
                      key={post.id}
                      className="group"
                    >
                      <article className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-300 group-hover:scale-105">
                        {post.image && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {post.category && (
                              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                                {post.category}
                              </span>
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
                            <span className="text-primary inline-flex items-center group">
                              Leer más
                              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}