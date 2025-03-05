import Image from 'next/image';

interface FeaturedTemplateProps {
  title: string;
  content: string;
  image?: string;
  additionalImages?: string[];
}

export default function FeaturedTemplate({ title, content, image, additionalImages = [] }: FeaturedTemplateProps) {
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
      {image && (
        <div className="relative w-full aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h1 className="absolute bottom-8 left-8 right-8 text-4xl font-bold text-white">
            {title}
          </h1>
        </div>
      )}
      
      <div className="p-8">
        {additionalImages.length > 0 && (
          <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
            {additionalImages.map((img, index) => (
              <div
                key={index}
                className="relative w-48 aspect-[4/3] flex-shrink-0 rounded-xl overflow-hidden"
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