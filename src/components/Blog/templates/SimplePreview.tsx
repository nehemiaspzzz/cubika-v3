import Image from 'next/image';

export default function SimplePreview() {
  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src="/images/quienes-somos-2.webp"
          alt="Simple Template Preview"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2 truncate">Innovación en Desarrollo Inmobiliario</h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
} 