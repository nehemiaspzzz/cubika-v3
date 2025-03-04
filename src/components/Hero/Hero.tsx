import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  needBackground?: boolean;
}

export const Hero = ({
  title,
  subtitle, 
  heroImage,
  needBackground = true
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
      className={`relative h-[757px] bg-cover bg-center w-[95%] mx-auto rounded-3xl mb-8 ${heroImage || ''}`}
    >
      {
        needBackground && (
          <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
        )
      }
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
    </motion.section>
  );
}