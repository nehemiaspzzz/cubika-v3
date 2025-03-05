import Image from 'next/image';

interface SimpleTemplateProps {
  title: string;
  content: string;
  image?: string;
}

export default function SimpleTemplate({ title, content, image }: SimpleTemplateProps) {
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
      {image && (
        <div className="relative w-full aspect-[21/9]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h1>
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