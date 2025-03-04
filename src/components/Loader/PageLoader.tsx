"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import heroImage from "../../../public/images/logo_cubika.png";

export const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const logoControls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1; // más lento: 1% cada 50ms
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Primero movemos el logo a su posición final
      logoControls.start({
        scale: 0.5,
        y: -window.innerHeight/2 + 50,
        x: -window.innerWidth/2 + 100,
        transition: { 
          duration: 1.2,
          ease: [0.43, 0.13, 0.23, 0.96] // Curva de ease personalizada para movimiento más suave
        }
      });
      
      // Después de mover el logo, desvanecemos el fondo
      setTimeout(() => {
        controls.start({ 
          opacity: 0,
          transition: { 
            duration: 0.8,
            ease: "easeInOut"
          }
        });
      }, 1000);
    }
  }, [progress, controls, logoControls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[201] flex flex-col items-center justify-center bg-white"
    >
      <motion.div
        animate={logoControls}
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
        className="relative w-48 h-48"
      >
        <Image
          src={heroImage}
          alt="Cubika Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      <motion.div 
        className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 text-primary font-medium"
      >
        Cargando... {progress}%
      </motion.p>
    </motion.div>
  );
};
