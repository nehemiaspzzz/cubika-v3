"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SimplePreview from '@/components/Blog/templates/SimplePreview';
import GalleryPreview from '@/components/Blog/templates/GalleryPreview';
import FeaturedPreview from '@/components/Blog/templates/FeaturedPreview';
import PreviewModal from '@/components/Blog/PreviewModal';

const TEMPLATES = [
  {
    id: 'simple',
    name: 'Simple',
    description: 'Una imagen principal con texto',
    preview: SimplePreview
  },
  {
    id: 'gallery',
    name: 'Galería',
    description: 'Múltiples imágenes en formato galería',
    preview: GalleryPreview
  },
  {
    id: 'featured',
    name: 'Destacado',
    description: 'Imagen principal grande con imágenes secundarias',
    preview: FeaturedPreview
  }
];

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: 'simple' | 'gallery' | 'featured';
  formData: {
    title: string;
    content: string;
  };
  preview: string;
  additionalPreviews: string[];
}

function TemplatePreviewModal({
  isOpen,
  onClose,
  template,
  formData,
  preview,
  additionalPreviews
}: TemplatePreviewModalProps) {
  return (
    <PreviewModal
      isOpen={isOpen}
      onClose={onClose}
      template={template}
      title={formData.title || 'Título de ejemplo'}
      content={formData.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
      image={preview || `/images/${template === 'simple' ? 'quienes-somos-2.webp' : template === 'gallery' ? 'team-web1.jpg' : 'arboleda-hero.png'}`}
      additionalImages={additionalPreviews.length > 0 ? additionalPreviews : template === 'gallery' ? [
        '/images/team-web.jpg',
        '/images/cover-team.jpg',
        '/images/team-meet.webp'
      ] : template === 'featured' ? [
        '/images/arboleda-img.webp',
        '/images/brand-arboleda.webp',
        '/images/logo-arboleda.png'
      ] : []}
    />
  );
}

export default function BlogAdmin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    password: '',
    template: 'simple' as 'simple' | 'gallery' | 'featured'
  });
  const [image, setImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [preview, setPreview] = useState('');
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<'simple' | 'gallery' | 'featured' | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError('La imagen principal no debe exceder 1MB');
        e.target.value = '';
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validar tamaño de cada imagen
    for (const file of files) {
      if (file.size > 1024 * 1024) {
        setError('Todas las imágenes deben ser menores a 1MB');
        e.target.value = '';
        return;
      }
    }
    
    setAdditionalImages(files);
    
    const previews: string[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setAdditionalPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('template', formData.template);
      
      if (image) {
        formDataToSend.append('image', image);
      }

      additionalImages.forEach(file => {
        formDataToSend.append('additionalImages', file);
      });

      const response = await fetch('/api/blog/post', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el post');
      }

      router.push('/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Crear Nuevo Post
          </motion.h1>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="px-6 py-2 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition-all"
            >
              Vista Previa Final
            </button>
            <Link
              href="/admin/blog/manage"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
            >
              Administrar Posts
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-[32px] shadow-[0_0_40px_rgba(0,0,0,0.04)] p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
                Plantilla
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {TEMPLATES.map((template) => {
                  const PreviewComponent = template.preview;
                  return (
                    <div
                      key={template.id}
                      className={`relative rounded-xl p-4 border-2 transition-all ${
                        formData.template === template.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div 
                        className="aspect-video relative rounded-lg overflow-hidden mb-3 cursor-pointer"
                        onClick={() => setFormData(prev => ({ ...prev, template: template.id as any }))}
                      >
                        <PreviewComponent />
                      </div>
                      <h3 className="font-medium mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{template.description}</p>
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template.id as any)}
                        className="w-full px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                      >
                        Ver Ejemplo Completo
                      </button>
                      <input
                        type="radio"
                        name="template"
                        value={template.id}
                        checked={formData.template === template.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Imagen Principal
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {preview && (
                <div className="mt-4 relative group">
                  <img src={preview} alt="Preview" className="max-h-60 rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreview('');
                      const input = document.getElementById('image') as HTMLInputElement;
                      if (input) input.value = '';
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {(formData.template === 'gallery' || formData.template === 'featured') && (
              <div>
                <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-700 mb-2">
                  Imágenes Adicionales
                </label>
                <input
                  type="file"
                  id="additionalImages"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {additionalPreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {additionalPreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <img src={preview} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Contenido
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={10}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={formData.template}
        title={formData.title}
        content={formData.content}
        image={preview}
        additionalImages={additionalPreviews}
      />

      {previewTemplate && (
        <TemplatePreviewModal
          isOpen={true}
          onClose={() => setPreviewTemplate(null)}
          template={previewTemplate}
          formData={formData}
          preview={preview}
          additionalPreviews={additionalPreviews}
        />
      )}
    </motion.div>
  );
}
