"use client";
import ContactForm from "@/components/Forms/ContactForm";
import { motion } from "framer-motion";

export default function Contact() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50"
        >
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className="max-w-3xl mx-auto"
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2
                    }}
                    className="bg-white/70 backdrop-blur-sm rounded-[32px] shadow-[0_0_40px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100"
                >
                    <div className="w-full p-8 md:p-12">
                        <div className="text-center mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.4
                                }}
                                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                            >
                                Contáctanos
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.6
                                }}
                                className="text-base md:text-lg text-gray-600 max-w-xl mx-auto transition-all duration-300 ease-in-out hover:scale-105 transform-gpu"
                            >
                                Estamos aquí para escucharte. Cuéntanos sobre tu proyecto y juntos haremos realidad tus ideas.
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.8
                            }}
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}