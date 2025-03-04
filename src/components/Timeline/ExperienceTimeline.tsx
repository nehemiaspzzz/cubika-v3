"use client"
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

interface ExperienceProps {
    title: string;
    company_name: string;
    date: string;
    points: string[];
}

const ExperienceCard = ({ experience }: { experience: ExperienceProps }) => {
  return (
      <VerticalTimelineElement
      className="transition-all duration-300 ease-in-out hover:scale-105 transform-gpu"
      contentStyle={{ background: '#ffffff', color: '#1d1836'  }}
      contentArrowStyle={{ borderRight: '7px solid  #1f344e'}}
      date={experience.date}
      iconStyle={{ background: '#CE9659', color: '#fff' }}
    >
      <div>
        <h3 className=' text-[24px] font-bold'>{ experience.title }</h3>
        <p className='text-secondary text-[60px] font-semibold' style={{ margin: 0 }}>{experience.company_name}</p>
      </div>
      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {
          experience.points.map((point, index) => (
            <li key={`experience-point-${index}`} className='text-white-100 text-[14px] pl-1 tracking-wider'>{point}</li>
          ))
        }
      </ul>
    </VerticalTimelineElement>
  )
}

const ExperienceTimeline = ({ experiences }: { experiences: ExperienceProps[] }) => {
  return (
    <>
      <div className='mt-20 flex flex-col '>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default ExperienceTimeline;