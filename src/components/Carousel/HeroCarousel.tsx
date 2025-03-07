"use client";

import Image from "next/image"
import { motion } from "framer-motion";

// images
interface Props {
  image: string,
  text: string,
  logo: string,
  logoSize?: string // Parámetro opcional para ajustar el tamaño del logo
}

export const HeroCarousel = ({image, text, logo, logoSize = "w-[200px] md:w-[300px]"}: Props) => {
  return (
    <div className="relative h-full w-full">
            <Image
              src={image}
              alt="image 1"
              className="h-full w-full object-cover md:object-center"
              fill
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <motion.section
              id="hero"
              className="absolute inset-0 flex flex-col w-full h-full place-items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delayChildren: 0.3,
                staggerChildren: 0.2
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={logoSize} // Usar el tamaño personalizado
              >
                <Image src={logo} alt="Hero Image" className="w-full h-auto" width={300} height={300} />
              </motion.div>
              <motion.div
                className="w-1/2 h-px bg-white my-4 opacity-40"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ duration: 0.7 }}
              />
              <motion.h1
                className="text-white text-2xl md:text-4xl font-bold mb-4 text-center px-8 md:px-16 lg:px-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {text}
              </motion.h1>
            </motion.section>
          </div>
  )
}
