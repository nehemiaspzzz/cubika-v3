import { motion, AnimatePresence } from 'framer-motion';
import SimpleTemplate from './templates/SimpleTemplate';
import GalleryTemplate from './templates/GalleryTemplate';
import FeaturedTemplate from './templates/FeaturedTemplate';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: 'simple' | 'gallery' | 'featured';
  title: string;
  content: string;
  image?: string;
  additionalImages?: string[];
}

const TEMPLATES = {
  simple: SimpleTemplate,
  gallery: GalleryTemplate,
  featured: FeaturedTemplate,
};

export default function PreviewModal({
  isOpen,
  onClose,
  template,
  title,
  content,
  image,
  additionalImages,
}: PreviewModalProps) {
  const Template = TEMPLATES[template];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-4 md:inset-10 bg-gray-50 rounded-3xl overflow-auto z-50"
          >
            <div className="sticky top-0 flex justify-end p-4 bg-gradient-to-b from-gray-50 to-gray-50/80 backdrop-blur-sm">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
              >
                Cerrar
              </button>
            </div>
            <div className="p-4">
              <Template
                title={title || 'Título del Post'}
                content={content || 'Contenido del post...'}
                image={image}
                additionalImages={additionalImages}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 