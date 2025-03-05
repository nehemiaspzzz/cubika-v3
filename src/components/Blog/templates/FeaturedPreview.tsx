import Image from 'next/image';

export default function FeaturedPreview() {
  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src="/images/arboleda-hero.png"
          alt="Featured Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-2">
        <div className="flex gap-2 mb-3">
          <div className="relative w-16 aspect-square">
            <Image
              src="/images/arboleda-img.webp"
              alt="Additional Image 1"
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <div className="relative w-16 aspect-square">
            <Image
              src="/images/brand-arboleda.webp"
              alt="Additional Image 2"
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <div className="relative w-16 aspect-square">
            <Image
              src="/images/logo-arboleda.png"
              alt="Additional Image 3"
              fill
              className="object-cover rounded-sm bg-white"
            />
          </div>
        </div>
        <h3 className="text-sm font-semibold mb-1 truncate">Proyecto Arboleda: Un Nuevo Concepto de Vida</h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          Descubre nuestro nuevo desarrollo residencial que combina naturaleza y modernidad en un entorno único.
        </p>
      </div>
    </div>
  );
} 