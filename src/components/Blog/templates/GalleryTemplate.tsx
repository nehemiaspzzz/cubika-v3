import Image from 'next/image';

interface GalleryTemplateProps {
  title: string;
  content: string;
  image?: string;
  additionalImages?: string[];
}

export default function GalleryTemplate({ title, content, image, additionalImages = [] }: GalleryTemplateProps) {
  const allImages = image ? [image, ...additionalImages] : additionalImages;

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h1>
        
        {allImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {allImages.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-xl overflow-hidden ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} - Imagen ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
} 