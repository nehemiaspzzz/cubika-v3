"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Definición de tipos para las propiedades de experiencia
interface ExperienceProps {
  title: string;
  company_name?: string;
  date: string;
  points: string[];
}

// Componente principal del timeline
const ExperienceTimeline = ({ experiences }: { experiences: ExperienceProps[] }) => {
  // Mapeo de logos para cada experiencia
  const logos = [
    'cubika-logo.png',
    'prados-logo.png',
    'arboleda-logo.png',
    'icono-modulé.png',
    'logo-jyl.png'
  ];

  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Línea vertical central */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-[#91472d]"></div>
      
      <div className="relative">
        {experiences.map((experience, index) => (
          <TimelineItem 
            key={index}
            experience={experience}
            logo={logos[index]}
            isLeft={index % 2 === 0}
            isFirst={index === 0}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

// Componente para cada elemento del timeline
const TimelineItem = ({ 
  experience, 
  logo, 
  isLeft, 
  isFirst, 
  isLast 
}: { 
  experience: ExperienceProps; 
  logo: string;
  isLeft: boolean;
  isFirst: boolean;
  isLast: boolean;
}) => {
  // Determinar si el logo necesita un tratamiento especial (más grande)
  const needsLargerLogo = logo === 'prados-logo.png' || logo === 'arboleda-logo.png' || logo === 'icono-modulé.png';
  
  return (
    <div className="flex items-center mb-24 relative">
      {/* Tarjeta de contenido - Izquierda o Derecha */}
      <div className={`w-[45%] ${isLeft ? 'order-1 pr-8' : 'order-3 pl-8'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`bg-white rounded-xl shadow-lg p-8 ${isLeft ? 'ml-auto' : 'mr-auto'}`}
        >
          <div className="mb-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#91472d] to-[#b15e3d] bg-clip-text text-transparent">
              {experience.title}
            </h3>
            {experience.company_name && (
              <p className="text-xl font-medium text-gray-700 mt-2">
                {experience.company_name}
              </p>
            )}
            <div className="mt-3">
              <span className="inline-block bg-[#91472d] text-white px-4 py-1 rounded-full text-sm font-semibold">
                {experience.date}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {experience.points.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <p className="text-base md:text-lg text-gray-600 leading-relaxed text-justify">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Círculo con logo - Centrado */}
      <div className="w-[10%] order-2 flex justify-center">
        <div className="w-32 h-32 rounded-full bg-[#91472d] border-4 border-white shadow-lg flex items-center justify-center z-10 relative">
          <div className={`relative ${needsLargerLogo ? 'w-full h-full' : 'w-[75%] h-[75%]'}`}>
            <Image
              src={`/images/${logo}`}
              alt={`${experience.title} logo`}
              fill
              className={`object-contain ${needsLargerLogo ? 'scale-125 p-0' : 'p-1'}`}
            />
          </div>
        </div>
      </div>
      
      {/* Espacio vacío para el lado opuesto */}
      <div className={`w-[45%] ${isLeft ? 'order-3' : 'order-1'}`}></div>
    </div>
  );
};

export default ExperienceTimeline;