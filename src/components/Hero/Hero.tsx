import { motion } from "framer-motion";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  heroImage?: string | StaticImageData;
  needBackground?: boolean;
  overlay?: ReactNode;
}

export const Hero = ({
  title,
  subtitle, 
  heroImage,
  needBackground = true,
  overlay
}: HeroProps) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-[500px] w-[95%] mx-auto rounded-3xl mb-8 overflow-hidden"
    >
      {typeof heroImage === 'string' ? (
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <div className={`w-full h-full bg-cover bg-center ${heroImage}`} />
        </motion.div>
      ) : heroImage && (
        <motion.div className="w-full h-full">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={heroImage}
              alt={title || "Hero image"}
              fill
              className="object-cover"
              quality={100}
              priority
            />
          </motion.div>
        </motion.div>
      )}
      {overlay ? overlay : (
        <>
          {needBackground && (
            <div className="absolute inset-0 bg-black opacity-80 rounded-3xl"></div>
          )}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-6xl font-bold text-white uppercase">
              {title}
            </h1>
            {subtitle && (
              <>
                <div className="w-1/4 h-px bg-white my-4 opacity-40" />
                <h2 className="text-4xl font-bold text-white uppercase">
                  {subtitle}
                </h2>
              </>
            )}
          </div>
        </>
      )}
    </motion.section>
  );
}