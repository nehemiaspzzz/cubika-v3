"use client";
import { SubHero } from "@/components/Hero/SubHero";
import { Hero } from "../../../components/Hero/Hero";
import Image from "next/image";
import { ButtonTextCard } from "@/components/Cards/ButtonTextCard";
import { motion } from "framer-motion";

import team1 from "../../../../public/images/team-1.webp";
import team2 from "../../../../public/images/team-2.webp";
import team3 from "../../../../public/images/team-3.webp";
import team4 from "../../../../public/images/team.webp";

export default function Team() {
  // Animaciones suaves
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="w-full overflow-x-hidden"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative"
      >
        <div className="mt-2 md:mt-8 ">
          <Hero
            title="El corazón detrás de"
            subtitle="nuestra visión"
            heroImage="bg-about-hero"
            needBackground={false}
          />
        </div>
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
          }}
          viewport={{ once: true }}
          className="px-4 md:px-8 lg:px-16 mb-16"
        >
          <SubHero
            title="Nuestra Dirección Empresarial"
            subtitle="En Cubika, nuestra dirección empresarial está guiada por principios de sostenibilidad, innovación y compromiso. Nos enfocamos en desarrollar proyectos inmobiliarios que integren diseño funcional, respeto por el entorno y soluciones accesibles para las familias guatemaltecas."
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
          }}
          viewport={{ once: true }}
          className="relative mb-16 md:mb-32 px-4 md:px-8 lg:px-12 mt-8 md:mt-16 max-w-[1800px] mx-auto"
        >
          {/* Timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-secondary/20 -z-10" />
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-secondary/0 via-primary to-primary/0 -z-10" />

          {/* Área Administrativa */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center justify-center relative"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full -z-[5]" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[98%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-1 md:order-1"
            >
              <ButtonTextCard 
                title="área administrativa"
                text="Nuestra filosofía empresarial es contribuir de manera sostenible, con innovación en el diseño y construcción de cada proyecto, que nos motivan a crear sueños, ilusiones y emociones que estamos seguros de lograrlo en cada uno de nuestros clientes, con el motor principal que es nuestro equipo de trabajo."
                showButton={false}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="relative w-full md:w-[98%] h-[600px] rounded-[30px] overflow-hidden order-2 md:order-2 justify-self-end"
            >
              <Image
                src={team1}
                alt="Equipo Administrativo Cubika"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Área de Ventas */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center justify-center relative mt-20 md:mt-40"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full -z-[5]" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="relative w-full md:w-[98%] h-[600px] rounded-[30px] overflow-hidden order-1 md:order-1"
            >
              <Image
                src={team2}
                alt="Equipo de Ventas Cubika"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[98%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-2 md:order-2"
            >
              <ButtonTextCard
                title="Área de ventas"
                text="Nuestro equipo de ventas está comprometido con brindar un servicio excepcional, asesorando y acompañando a nuestros clientes en cada paso del proceso, asegurando que encuentren la propiedad perfecta que se ajuste a sus necesidades y sueños."
                showButton={false}
              />
            </motion.div>
          </motion.div>

          {/* Área de Servicio */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center justify-center relative mt-20 md:mt-40"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full -z-[5]" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[98%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-1 md:order-1"
            >
              <ButtonTextCard
                title="Área de servicio"
                text="Nuestra filosofía empresarial es contribuir de manera sostenible, con innovación en el diseño y construcción de cada proyecto, que nos motivan a crear sueños, ilusiones y emociones que estamos seguros de lograrlo en cada uno de nuestros clientes, con el motor principal que es nuestro equipo de trabajo."
                showButton={false}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="relative w-full md:w-[98%] h-[600px] rounded-[30px] overflow-hidden order-2 md:order-2"
            >
              <Image
                src={team3}
                alt="Equipo de Servicio Cubika"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Área de Operación */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center justify-center relative mt-20 md:mt-40"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full -z-[5]" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[98%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-1 md:order-2"
            >
              <ButtonTextCard
                title="área de Operacion"
                text="Nuestra filosofía empresarial es contribuir de manera sostenible, con innovación en el diseño y construcción de cada proyecto, que nos motivan a crear sueños, ilusiones y emociones que estamos seguros de lograrlo en cada uno de nuestros clientes, con el motor principal que es nuestro equipo de trabajo."
                showButton={false}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="relative w-full md:w-[98%] h-[600px] rounded-[30px] overflow-hidden order-2 md:order-1"
            >
              <Image
                src={team4}
                alt="Equipo de Operación Cubika"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}