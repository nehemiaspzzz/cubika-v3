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
      className="w-full overflow-x-hidden pt-6 md:pt-10"
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
          className="relative mb-12 md:mb-24 px-4 md:px-12 lg:px-16 mt-6 md:mt-16 max-w-[1400px] mx-auto"
        >
          {/* Arboleda los encinos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center justify-center relative">
            <div className="w-full md:w-[95%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu order-1 md:order-1">
              <ButtonTextCard
                title="arboleda los encinos"
                text="Donde la naturaleza y el lujo convergen en perfecta armonía. Un exclusivo desarrollo residencial que redefine el arte de vivir, fusionando la serenidad del entorno natural con la sofisticación urbana contemporánea."
                buttonText="Descubre Arboleda"
                buttonLink="https://www.arboledalosencinos.com.gt/"
              />
            </div>
            <motion.div 
              className="relative w-full md:w-[95%] h-[300px] md:h-[400px] rounded-[16px] md:rounded-[24px] overflow-hidden order-2 md:order-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={brand1}
                alt="Arboleda los Encinos"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* JYL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center justify-center relative mt-12 md:mt-24">
            <div className="w-full md:w-[95%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu order-1 md:order-2">
              <ButtonTextCard
                title="Jyl"
                text="Elevamos la gestión residencial a un arte. Nuestro compromiso con la excelencia se refleja en cada detalle, creando experiencias excepcionales que transforman espacios en comunidades distinguidas."
                buttonText="Conoce JYL"
                buttonLink="https://jylservicios.com/"
              />
            </div>
            <motion.div 
              className="relative w-full md:w-[95%] h-[300px] md:h-[400px] rounded-[16px] md:rounded-[24px] overflow-hidden order-2 md:order-1 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={brand2}
                alt="JYL Servicios"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* Prados de minerva */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center justify-center relative mt-12 md:mt-24">
            <div className="w-full md:w-[95%] transition-all duration-300 ease-in-out hover:scale-105 transform-gpu order-1 md:order-1">
              <ButtonTextCard
                title="Prados de Minerva"
                text="La fusión perfecta entre diseño contemporáneo y vida familiar. Un desarrollo residencial que hace realidad tus aspiraciones, donde cada espacio ha sido cuidadosamente diseñado para brindar una experiencia de vida excepcional."
                buttonText="Explora Prados"
                buttonLink="/prados"
              />
            </div>
            <motion.div 
              className="relative w-full md:w-[95%] h-[300px] md:h-[400px] rounded-[16px] md:rounded-[24px] overflow-hidden order-2 md:order-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={brand3}
                alt="Prados de Minerva"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  )
}