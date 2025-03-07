"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ModuleSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Columna de la imagen */}
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full">
              <Image
                src="/images/banner-module.png"
                alt="Module Banner"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
          
          {/* Columna del contenido */}
          <motion.div 
            className="w-full md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center md:justify-start mb-8">
              <div className="relative w-[200px] h-[80px]">
                <Image
                  src="/images/icono-modulé.png"
                  alt="Module Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Soluciones arquitectónicas personalizadas
            </h2>
            
            <div className="space-y-4 text-lg text-gray-600">
              <p className="text-justify">
              Somos una empresa creada con la visión de ofrecer soluciones arquitectónicas personalizadas y de alta calidad. Nos especializamos en el diseño, fabricación e instalación de puertas, ventanas y muebles de cocina, garantizando altos estándares de precisión, durabilidad y estética en cada proyecto. Nuestro compromiso con la excelencia nos permite transformar espacios con productos que combinan funcionalidad, innovación y un impecable nivel de detalle.
              </p>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <a 
                  href="#contact" 
                  className="inline-block bg-[#91472d] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#b15e3d] transition-colors duration-300"
                >
                  Conoce más
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ModuleSection 