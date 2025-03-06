"use client";
import { SubHero } from "@/components/Hero/SubHero";
import { Hero } from "../../../components/Hero/Hero";
import Image from "next/image";
import { ButtonTextCard } from "@/components/Cards/ButtonTextCard";
import { motion } from "framer-motion";

import team2 from "../../../../public/images/servicio-1.jpg";
import team4 from "../../../../public/images/team.webp";
import areaServicio from "../../../../public/images/áreadeservicio.png";
import areaOperacion from "../../../../public/images/servicio-1.png";
import coverTeam from "../../../../public/images/team-web1.jpg";


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
            heroImage={coverTeam}
            needBackground={false}
            overlay={
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-black/60 rounded-3xl z-[1]"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.4
                    }}
                    className="text-6xl font-bold text-white uppercase"
                  >
                    El corazón detrás de
                  </motion.h1>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="h-px bg-white my-4 opacity-40"
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.8
                    }}
                    className="text-4xl font-bold text-white uppercase"
                  >
                    nuestra visión
                  </motion.h2>
                </motion.div>
              </motion.div>
            }
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
            subtitle="Detrás de cada proyecto exitoso existe un equipo extraordinario de personas comprometidas con la excelencia. Cada integrante aporta su talento y pasión para crear espacios excepcionales, convirtiendo ideas innovadoras en hogares que transforman vidas en Guatemala."
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-center relative"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full -z-[5] hidden md:block" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[95%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-1 md:order-1"
            >
              <ButtonTextCard 
                title="área administrativa"
                text="El equipo administrativo constituye la columna vertebral de Cubika. Con una gestión precisa de recursos, procesos y documentación, garantizamos que cada proyecto alcance la excelencia."
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
              className="relative w-full md:w-[95%] h-[400px] rounded-[24px] overflow-hidden order-2 md:order-2 justify-self-end shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={team4}
                alt="Equipo Administrativo Cubika"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-center relative mt-16 md:mt-24"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full -z-[5] hidden md:block" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[95%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-1 md:order-2"
            >
              <ButtonTextCard
                title="Área comercial"
                text="Profesionales apasionados conforman el equipo comercial, dedicados a materializar los sueños de cada cliente. La experiencia en el mercado inmobiliario permite brindar una asesoría estratégica."
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
              className="relative w-full md:w-[95%] h-[400px] rounded-[24px] overflow-hidden order-2 md:order-1 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={team2}
                alt="Equipo de Ventas Cubika"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-center relative mt-16 md:mt-24"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full -z-[5] hidden md:block" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[95%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-1 md:order-1"
            >
              <ButtonTextCard
                title="área de operación"
                text="La supervisión y ejecución de proyectos inmobiliarios recae en el equipo de operaciones. Cada desarrollo se gestiona bajo estrictos estándares de calidad, implementando cronogramas efectivos."
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
              className="relative w-full md:w-[95%] h-[400px] rounded-[24px] overflow-hidden order-2 md:order-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={areaOperacion}
                alt="Equipo de Servicio Cubika"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-center relative mt-16 md:mt-24"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full -z-[5] hidden md:block" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="w-full md:w-[95%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu z-10 order-1 md:order-2"
            >
              <ButtonTextCard
                title="área de servicio"
                text="Un equipo dedicado a mantener impecables los espacios y garantizar un ambiente acogedor. La atención al detalle en limpieza, mantenimiento y presentación refleja nuestro compromiso con la excelencia."
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
              className="relative w-full md:w-[95%] h-[400px] rounded-[24px] overflow-hidden order-2 md:order-1 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={areaServicio}
                alt="Equipo de Operación Cubika"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}