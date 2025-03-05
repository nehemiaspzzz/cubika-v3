import Image from 'next/image';

export default function GalleryPreview() {
  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <div className="grid grid-cols-2 gap-1 p-1">
        <div className="relative aspect-square">
          <Image
            src="/images/team-web1.jpg"
            alt="Gallery Image 1"
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/team-web.jpg"
            alt="Gallery Image 2"
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/cover-team.jpg"
            alt="Gallery Image 3"
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/team-meet.webp"
            alt="Gallery Image 4"
            fill
            className="object-cover rounded-sm"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2 truncate">Nuestro Equipo en Acción</h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          Conoce al equipo que hace posible transformar tus sueños en realidad. Profesionales comprometidos con la excelencia.
        </p>
      </div>
    </div>
  );
} 