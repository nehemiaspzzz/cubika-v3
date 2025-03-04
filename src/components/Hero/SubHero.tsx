
import { motion } from "framer-motion";


interface SubHeroProps {
    title: string
    subtitle?: string 
}

export const SubHero = ({
    title,
    subtitle
}: SubHeroProps) => {

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                className="flex flex-col items-center justify-center w-[70%] mx-auto"
            >
                <motion.h2 
                    variants={itemVariants}
                    className="text-3xl font-bold uppercase text-center"
                >
                    El Legado de Cubika
                </motion.h2>
                <motion.div 
                    variants={itemVariants}
                    className="w-[310px] h-[3px] bg-primary mb-4" 
                />
                <motion.h2 
                    variants={itemVariants}
                    className="text-5xl font-extrabold uppercase text-center my-4"
                >
                    {title}
                </motion.h2>
                <motion.p 
                    variants={itemVariants}
                    className="text-center mt-4 font-light"
                >
                    {subtitle}
                </motion.p>
            </motion.div>
    )
}