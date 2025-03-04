"use client";

import { Hero } from "@/components/Hero/Hero";
import Image from "next/image";
import { motion } from "framer-motion";
import brand1 from "../../../../public/images/brand-arboleda.webp";
import brand2 from "../../../../public/images/brand-jyl.webp";
import brand3 from "../../../../public/images/brand-prados.webp";
import { ButtonTextCard } from "@/components/Cards/ButtonTextCard";

export default function Brands() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delayChildren: 0.3, 
        staggerChildren: 0.2 
      } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full overflow-x-hidden pt-10"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="mt-2 md:mt-8">
          <Hero 
            title="Nuestro ADN"
            subtitle=""
            heroImage="bg-brand-todo-logos"
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
          className="relative mb-16 md:mb-32 px-4 md:px-16 lg:px-24 mt-8 md:mt-16 max-w-[1600px] mx-auto"
        >
          {/* Timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/20" />
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/0 via-primary to-primary/0" />

          {/* Arboleda los encinos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center justify-center relative">
            <div className="w-full md:w-[90%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu order-1 md:order-1">
              <ButtonTextCard
                title="arboleda los encinos"
                text="Arboleda Los Encinos, gestionado por Cubika, es un proyecto inmobiliario que ofrece viviendas sostenibles y accesibles, ideales para quienes sueñan con su primera casa. Ubicado en un entorno natural en Chinautla, Guatemala, el proyecto combina modernidad y respeto por el medio ambiente."
                buttonText="Descubre Arboleda"
                buttonLink="https://www.arboledalosencinos.com.gt/"
              />
            </div>
            <motion.div 
              className="overflow-hidden rounded-3xl w-full md:w-[90%] order-2 md:order-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={brand1}
                alt="brand"
                className="w-full aspect-[4/3] object-cover rounded-3xl"
              />
            </motion.div>
          </div>

          {/* JYL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center justify-center relative mt-16 md:mt-32">
            <div className="w-full md:w-[90%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu order-1 md:order-2">
              <ButtonTextCard
                title="Jyl"
                text="J&L, S.A. es una empresa de la corporación Cubika Inmobiliaria, S.A., especializada en la administración y manejo de ornato en proyectos habitacionales, nos enfocamos en ofrecer mecanismos eficientes en los complejos habitacionales, velamos por los intereses y el bien común de los propietarios."
                buttonText="Conoce JYL"
                buttonLink="https://jylservicios.com/"
              />
            </div>
            <motion.div 
              className="overflow-hidden rounded-3xl w-full md:w-[90%] order-2 md:order-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={brand2}
                alt="brand"
                className="w-full aspect-[4/3] object-cover rounded-3xl"
              />
            </motion.div>
          </div>

          {/* Prados de minerva */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center justify-center relative mt-16 md:mt-32">
            <div className="w-full md:w-[90%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu order-1 md:order-1">
              <ButtonTextCard
                title="Prados de Minerva"
                text="Prados de Minerva es un proyecto residencial que ofrece casas con diseños modernos y funcionales. Ubicado en una zona estratégica, este desarrollo combina comodidad y accesibilidad, creando un espacio ideal para familias que buscan un hogar con excelente calidad de vida."
                buttonText="Explora Prados"
                buttonLink="/prados"
              />
            </div>
            <motion.div 
              className="overflow-hidden rounded-3xl w-full md:w-[90%] order-2 md:order-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={brand3}
                alt="brand"
                className="w-full aspect-[4/3] object-cover rounded-3xl"
              />
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  )
}