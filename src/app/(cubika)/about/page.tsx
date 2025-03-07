"use client";
import { SimpleCard } from "@/components/Cards/SimpleCard";
import ExperienceTimeline from "@/components/Timeline/ExperienceTimeline";
import { experiences } from "@/constants/constants";
import Image from "next/image";
import aboutImage from "../../../../public/images/about-image-3.webp";
import brand1 from "../../../../public/images/brand-1.webp";
import brand2 from "../../../../public/images/brand-2.webp";
import brand3 from "../../../../public/images/brand-3.webp";
import brand4 from "../../../../public/images/brand-4.webp";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { Hero } from "@/components/Hero/Hero";
import { SubHero } from "@/components/Hero/SubHero";
import React from "react";
import { Counter } from "@/components/Counter/Counter";

export default function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

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

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
        }
    };


    const words = useMemo(() => ["Historia", "Compañía", "Marca"], []);
    const [currentWord, setCurrentWord] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWord];
        const typeSpeed = isDeleting ? 100 : 200;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (text.length < word.length) {
                    setText(word.slice(0, text.length + 1));
                } else {
                    setIsDeleting(true);
                    setTimeout(() => { }, 1000);
                }
            } else {
                if (text.length > 0) {
                    setText(word.slice(0, text.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentWord((prev) => (prev + 1) % words.length);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, currentWord, words]);

    const logrosRef = useRef(null);
    const viviendasRef = useRef(null);
    const familiasRef = useRef(null);
    const comunidadesRef = useRef(null);
    
    const isLogrosInView = useInView(logrosRef, { once: true });
    const isViviendasInView = useInView(viviendasRef, { once: true });
    const isFamiliasInView = useInView(familiasRef, { once: true });
    const isComunidadesInView = useInView(comunidadesRef, { once: true });

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="overflow-x-hidden"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                <div className="h-2 md:h-8" />

                <div className="mt-2 md:mt-8 relative">
                    <Hero 
                        title="Nuestra Evolución"
                        subtitle="A través del tiempo"
                        heroImage="bg-brands-hero"
                        needBackground={false}
                        overlay={
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-[#CE9659]/30"
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
                                        className="text-6xl font-bold text-white uppercase drop-shadow-lg"
                                    >
                                        Nuestra Evolución
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
                                        A través del tiempo
                                    </motion.h2>
                                </motion.div>
                            </motion.div>
                        }
                    />
                </div>

                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center my-10 "
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: true }}
                    >
                        <SubHero title="Nuestro crecimiento Empresarial"/>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ExperienceTimeline experiences={experiences} />
                    </motion.div>
                </motion.section>
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    viewport={{ once: true }}
                    className="my-20 w-[90%] md:w-[80%] mx-auto"
                >
                    <div className="w-full">
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-extrabold uppercase mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                            >
                                Nuestra Visión en Acción
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-base md:text-lg font-light text-gray-600 max-w-3xl mx-auto"
                            >
                                En Cubika, nuestra filosofía se traduce en acciones concretas que reflejan sostenibilidad, innovación y compromiso. Diseñamos proyectos que no solo transforman terrenos en hogares, sino que también mejoran la calidad de vida y respetan el entorno.
                            </motion.p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="hidden md:flex flex-col justify-center items-center gap-1"
                            >
                                <div className="flex flex-col text-2xl font-bold bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                                    <span>V</span>
                                    <span>A</span>
                                    <span>L</span>
                                    <span>O</span>
                                    <span>R</span>
                                    <span>E</span>
                                    <span>S</span>
                                </div>
                            </motion.div>

                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        text: "Disciplina",
                                        icon: "🎯",
                                        description: "Mantenemos altos estándares en cada proyecto y decisión. Nuestro compromiso con la excelencia se refleja en cada detalle y proceso que realizamos."
                                    },
                                    {
                                        text: "Responsabilidad y Compromiso",
                                        icon: "🤝",
                                        description: "Cumplimos nuestras promesas con clientes y comunidad. Cada proyecto refleja nuestra dedicación por crear espacios que impacten positivamente en la vida de las personas."
                                    },
                                    {
                                        text: "Calidad",
                                        icon: "⭐",
                                        description: "Excelencia en cada detalle de nuestros desarrollos. Utilizamos los mejores materiales y procesos para garantizar resultados excepcionales que perduren en el tiempo."
                                    },
                                    {
                                        text: "Innovación",
                                        icon: "💡",
                                        description: "Buscamos constantemente nuevas soluciones sostenibles. Implementamos tecnologías y métodos innovadores para crear espacios más eficientes y amigables con el medio ambiente."
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div className="text-3xl mb-3">{item.icon}</div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-800">{item.text}</h3>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    ref={logrosRef}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    viewport={{ once: true }}
                    className="relative flex flex-col items-center justify-evenly my-20 w-[90%] h-[600px] mx-auto bg-about-us-image bg-cover bg-center rounded-[40px] py-8 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: true }}
                        className="relative z-10 text-4xl font-extrabold uppercase text-center text-white mb-4 transition-all duration-300 ease-in-out hover:scale-105 transform-gpu"
                    >
                        Nuestros Logros
                    </motion.h2>
                    <div className="relative z-10 flex flex-col md:flex-row justify-center items-center w-full gap-8 md:gap-16">
                        <motion.div
                            ref={viviendasRef}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 transform-gpu"
                        >
                            <h1 className="text-white text-center text-4xl font-extrabold">{isViviendasInView && <Counter end={350} />}</h1>
                            <p className="text-white text-center mt-2">Viviendas entregadas</p>
                        </motion.div>
                        <motion.div
                            ref={familiasRef}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 transform-gpu"
                        >
                            <h1 className="text-white text-center text-4xl font-extrabold">{isFamiliasInView && <Counter end={400} />}</h1>
                            <p className="text-white text-center mt-2">Familias satisfechas</p>
                        </motion.div>
                        <motion.div
                            ref={comunidadesRef}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 transform-gpu"
                        >
                            <h1 className="text-white text-center text-4xl font-extrabold">{isComunidadesInView && <Counter end={2} />}</h1>
                            <p className="text-white text-center mt-2">Comunidades creadas</p>
                        </motion.div>
                    </div>
                </motion.section>
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    viewport={{ once: true }}
                    className="my-20 flex flex-col md:flex-row items-center justify-between"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: true }}
                        className="flex w-[90%] md:w-1/3 h-auto md:h-[450px] justify-center items-center bg-white rounded-3xl p-8 mb-16 md:mb-0 md:mx-8 relative z-10 box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1) transition-all duration-300 ease-in-out hover:scale-105 hover:z-20"
                    >
                        <p className="text-black text-center md:text-justify ">
                            Cubika representa innovación, sostenibilidad y diseño en el sector inmobiliario. Creamos proyectos que combinan estética, funcionalidad y respeto por el medio ambiente, reflejando nuestro compromiso con transformar espacios en hogares. Nuestra marca simboliza progreso, calidad y la búsqueda constante por superar las expectativas, llevando a las familias guatemaltecas soluciones habitacionales que enriquecen su calidad de vida. Cubika no solo construye viviendas, sino también sueños y experiencias de vida, alineadas con nuestra visión de un futuro más sostenible y humano.
                        </p>
                    </motion.div>
                    <Image
                        src={aboutImage}
                        alt="About Image"
                        className="w-[90%] md:w-2/3 h-[400px] md:h-[500px] rounded-3xl md:rounded-l-3xl relative z-0 object-cover"
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
                >
                    <div className="flex flex-col items-center justify-center mb-24 w-[70%] mx-auto">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="text-4xl font-extrabold uppercase text-center my-2 transition-all duration-300 ease-in-out hover:scale-105 transform-gpu "
                        >
                            La inspiración de
                        </motion.h2>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="text-4xl font-extrabold uppercase text-center transition-all duration-300 ease-in-out hover:scale-110 transform-gpu"
                        >
                            nuestra{" "}
                            <motion.span
                                className="text-white bg-primary px-2 py-2 rounded-3xl text-3xl inline-block"
                                animate={{ opacity: 1 }}
                            >
                                {text}
                                <span className="animate-pulse">|</span>
                            </motion.span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="text-center my-4 font-extralight text-[#767676] mt-8 transition-all duration-300 ease-in-out hover:scale-105 transform-gpu"
                        >
                            La construcción de nuestra marca en Cubika se inspira en la grandeza del Coliseo Romano, símbolo de fortaleza y diseño. Al igual que este ícono, nuestra marca se edifica sobre principios de innovación y sostenibilidad. El símbolo de las personas sosteniendo la arquitectura refleja el valor de nuestro equipo humano, donde el trabajo unido es clave para lograr proyectos exitosos y duraderos.
                        </motion.p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 mb-24 w-[98%] mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="w-[250px] md:w-[280px]"
                        >
                            <Image
                                src={brand1}
                                alt="Brand 1"
                                className="w-[250px] md:w-[280px] h-[280px] rounded-3xl rotate-6 shadow-2xl z-10 transition-all duration-300 hover:scale-105 hover:z-20 object-cover"
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
                            className="w-[250px] md:w-[280px]"
                        >
                            <Image
                                src={brand2}
                                alt="Brand 2"
                                className="w-[250px] md:w-[280px] h-[280px] rounded-3xl -rotate-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 object-cover"
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
                            className="w-[250px] md:w-[280px]"
                        >
                            <Image
                                src={brand3}
                                alt="Brand 3"
                                className="w-[250px] md:w-[280px] h-[280px] rounded-3xl rotate-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 object-cover"
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
                            className="w-[250px] md:w-[280px]"
                        >
                            <Image
                                src={brand4}
                                alt="Brand 4"
                                className="w-[250px] md:w-[280px] h-[280px] rounded-3xl -rotate-3 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 object-cover"
                            />
                        </motion.div>
                    </div>
                </motion.section>
            </motion.div>
        </motion.div>
    );
}