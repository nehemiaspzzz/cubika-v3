import Image from 'next/image';

interface MinimalTemplateProps {
  title: string;
  content: string;
  image?: string;
  additionalImages?: string[];
}

export default function MinimalTemplate({ title, content, image, additionalImages = [] }: MinimalTemplateProps) {
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: content.substring(0, 100) + '...',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    }
  };

  return (
    <article className="max-w-3xl mx-auto">
      <div className="relative mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {title}
        </h1>
        <button
          onClick={sharePost}
          className="absolute top-0 right-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
          aria-label="Compartir artículo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      {image && (
        <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {additionalImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {additionalImages.map((img, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
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
    </article>
  );
} 