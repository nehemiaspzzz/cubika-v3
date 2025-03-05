"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SimpleTemplateProps {
  title: string;
  content: string;
  image?: string;
  date?: string;
}

export default function SimpleTemplate({ title, content, image, date }: SimpleTemplateProps) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen"
    >
      {/* Background Image */}
      {image && (
        <div className="fixed inset-0 w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>
      )}

      {/* Content Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-4xl mx-auto px-4 pt-32 pb-16"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          {/* Title and Date */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            {date && (
              <time className="text-gray-500">
                {date}
              </time>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link 
                href="/blog"
                className="group inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
              >
                <svg 
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver al Blog
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-gray-400">Compartir:</span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-all"
                    aria-label="Compartir en Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-all"
                    aria-label="Compartir en Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}