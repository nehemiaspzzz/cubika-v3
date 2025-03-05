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
  if (title.toLowerCase().includes('cubika')) {
    return {
      bg: '#91472d',
      shadow: 'rgba(145, 71, 45, 0.3)'
    };
  }
  if (title.toLowerCase().includes('prados')) {
    return {
      bg: '#1d324d',
      shadow: 'rgba(29, 50, 77, 0.3)'
    };
  }
  if (title.toLowerCase().includes('arboleda')) {
    return {
      bg: '#153832',
      shadow: 'rgba(21, 56, 50, 0.3)'
    };
  }
  // Para J&L
  return {
    bg: '#CE9659',
    shadow: 'rgba(206, 150, 89, 0.3)'
  };
}

const getLogo = (title: string): string => {
  if (title.toLowerCase().includes('cubika')) return 'cubika-logo.png';
  if (title.toLowerCase().includes('prados')) return 'prados-logo.png';
  if (title.toLowerCase().includes('arboleda')) return 'arboleda-logo.png';
  return 'logo-jyl.png'; // Simplificamos esta función ya que por defecto será J&L
}

const ExperienceCard = ({ experience }: { experience: ExperienceProps }) => {
  const colors = getTimelineColors(experience.title);
  const logo = getLogo(experience.title);
  
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work group"
      contentStyle={{
        background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
        color: '#1d1836',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '16px',
        padding: '2rem',
      }}
      contentArrowStyle={{
        borderRight: '10px solid #f8f9fa'
      }}
      date={experience.date}
      dateClassName="text-gray-600 font-medium md:text-lg"
      iconStyle={{
        background: colors.bg,
        color: '#fff',
        boxShadow: `0 4px 6px -1px ${colors.shadow}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
      }}
      icon={
        <div className="w-[90%] h-[90%] relative">
          <Image
            src={`/images/${logo}`}
            alt={`${experience.title} logo`}
            fill
            className="object-contain p-1"
          />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group-hover:translate-y-[-5px] transition-all duration-300"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-bold" style={{ color: colors.bg }}>
            {experience.title}
          </h3>
          <p className="text-xl md:text-2xl font-medium text-gray-700">
            {experience.company_name}
          </p>
        </div>
        
        <ul className="mt-6 space-y-4">
          {experience.points.map((point, index) => (
            <motion.li
              key={`experience-point-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-3 text-gray-600"
            >
              <span 
                className="inline-block w-2 h-2 mt-2 rounded-full" 
                style={{ backgroundColor: `${colors.bg}80` }}
              />
              <span className="text-base md:text-lg leading-relaxed text-justify">
                {point}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </VerticalTimelineElement>
  )
}

const ExperienceTimeline = ({ experiences }: { experiences: ExperienceProps[] }) => {
  return (
    <div className="mt-20">
      <VerticalTimeline
        animate={true}
        lineColor={'#CE9659'}
      >
        {experiences.map((experience, index) => (
          <ExperienceCard 
            key={`experience-${index}`} 
            experience={experience} 
          />
        ))}
      </VerticalTimeline>
    </div>
  )
}

export default ExperienceTimeline;