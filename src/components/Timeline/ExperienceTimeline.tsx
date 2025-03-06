"use client"
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ExperienceProps {
    title: string;
    company_name: string;
    date: string;
    points: string[];
}

const getTimelineColors = (title: string): { bg: string, shadow: string } => {
  // Usar el mismo color para todos los círculos (el color de Cubika)
  return {
    bg: '#91472d',
    shadow: 'rgba(145, 71, 45, 0.3)'
  };
}

const ExperienceCard = ({ experience, index, total }: { experience: ExperienceProps, index: number, total: number }) => {
  const colors = getTimelineColors(experience.title);
  
  const logos = [
    'cubika-logo.png',
    'prados-logo.png',
    'arboleda-logo.png',
    'logo-jyl.png'
  ];
  
  const logoSrc = logos[index];
  const isArboleda = logoSrc === 'arboleda-logo.png';
  
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work group"
      contentStyle={{
        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        color: '#1d1836',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid rgba(145, 71, 45, 0.1)',
        transition: 'all 0.3s ease',
      }}
      contentArrowStyle={{
        borderRight: '12px solid #f8f9fa',
        filter: 'drop-shadow(-3px 2px 2px rgba(0, 0, 0, 0.1))'
      }}
      date={experience.date}
      dateClassName="text-gray-600 font-semibold md:text-lg tracking-wide"
      iconStyle={{
        background: colors.bg,
        color: '#fff',
        boxShadow: `0 8px 16px -4px ${colors.shadow}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isArboleda ? '0' : '2px',
        width: isArboleda ? '70px' : '60px',
        height: isArboleda ? '70px' : '60px',
        marginLeft: isArboleda ? '-35px' : '-30px',
        border: '3px solid #fff',
        transition: 'all 0.3s ease',
      }}
      icon={
        <div className="relative w-full h-full">
          <Image
            src={`/images/${logoSrc}`}
            alt={`${experience.title} logo`}
            fill
            className={`object-contain ${isArboleda ? 'scale-150' : 'p-1'}`}
          />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group-hover:translate-y-[-8px] transition-all duration-500 ease-out"
      >
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#91472d] to-[#b15e3d] bg-clip-text text-transparent">
            {experience.title}
          </h3>
          <p className="text-xl md:text-2xl font-medium text-gray-700">
            {experience.company_name}
          </p>
        </div>
        
        <div className="mt-8 space-y-7">
          {experience.points.map((point, index) => (
            <motion.div
              key={`experience-point-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <p className="text-base md:text-lg leading-relaxed text-justify text-gray-600">
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </VerticalTimelineElement>
  )
}

const ExperienceTimeline = ({ experiences }: { experiences: ExperienceProps[] }) => {
  return (
    <div className="mt-24">
      <VerticalTimeline
        animate={true}
        lineColor={'#91472d'}
        className="before:w-[3px]"
      >
        {experiences.map((experience, index) => (
          <ExperienceCard 
            key={`experience-${index}`} 
            experience={experience}
            index={index}
            total={experiences.length}
          />
        ))}
      </VerticalTimeline>
    </div>
  )
}

export default ExperienceTimeline;