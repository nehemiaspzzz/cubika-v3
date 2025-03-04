"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Hero } from "@/components/Hero/Hero";
import { SubHero } from "@/components/Hero/SubHero";
import { FiPlus, FiMinus } from "react-icons/fi";

interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqData: FAQItem[] = [
    {
      category: "Proceso de Compra",
      questions: [
        {
          question: "¿Cuál es el proceso para comprar una propiedad con Cubika?",
          answer: "El proceso comienza con una consulta inicial donde evaluamos tus necesidades. Luego programamos una visita al proyecto de interés, asesoramos en la selección y facilitamos todo el proceso legal y financiero hasta la entrega de su nuevo hogar."
        },
        {
          question: "¿Qué documentos necesito para iniciar el proceso de compra?",
          answer: "Los documentos básicos incluyen: Identificación oficial, comprobante de ingresos de los últimos 3 meses, referencias bancarias y laborales. Para financiamiento, pueden requerirse documentos adicionales según la institución financiera."
        },
        {
          question: "¿Ofrecen opciones de financiamiento?",
          answer: "Sí, trabajamos con múltiples instituciones financieras y podemos ayudarte en encontrar la mejor opción de financiamiento que se adapte a tus necesidades y capacidad de pago."
        }
      ]
    },
    {
      category: "Nuestros Proyectos",
      questions: [
        {
          question: "¿Dónde están ubicados tus proyectos?",
          answer: "Nuestros proyectos están estratégicamente ubicados en zonas de alto desarrollo en Guatemala, con fácil acceso a servicios esenciales, centros comerciales y vías principales."
        },
        {
          question: "¿Qué amenidades incluyen sus proyectos?",
          answer: "Nuestros proyectos incluyen amenidades como áreas verdes, parques infantiles, zonas de ejercicio, seguridad 24/7, y áreas sociales. Las amenidades específicas varían según el proyecto."
        },
        {
          question: "¿Cuánto tiempo toma la construcción de una vivienda?",
          answer: "El tiempo de construcción varía según el proyecto y el tipo de vivienda, pero generalmente oscila entre 8 y 12 meses desde la firma del contrato hasta la entrega."
        }
      ]
    },
    {
      category: "Servicios Post-Venta",
      questions: [
        {
          question: "¿Qué garantías ofrecen en sus propiedades?",
          answer: "Ofrecemos garantías sobre aspectos estructurales, acabados y equipamiento según los términos específicos de cada proyecto. Estas se encuentran detalladas en el manual de garantias."
        },
        {
          question: "¿Cómo manejan el mantenimiento de las áreas comunes?",
          answer: "Contamos con un equipo dedicado al mantenimiento de áreas comunes y trabajamos con una empresa especializada para garantizar el óptimo funcionamiento de todas las instalaciones."
        },
        {
          question: "¿Tienen servicio de atención al cliente post-venta?",
          answer: "Sí, contamos con un departamento de servicio al cliente post-venta que atiende cualquier consulta o requerimiento después de la entrega de su propiedad."
        }
      ]
    },
    {
      category: "Aspectos Legales",
      questions: [
        {
          question: "¿Qué documentación legal recibo al comprar?",
          answer: "Al finalizar la compra, recibirá la escritura de propiedad debidamente registrada, planos de la propiedad, factura, documento contable, manual del propietario y toda la documentación relacionada con garantías y reglamentos."
        },
        {
          question: "¿Cómo se manejan los trámites municipales?",
          answer: "Nos encargamos de todos los trámites municipales necesarios, incluyendo licencias de construcción y permisos, para garantizar que su propiedad cumpla con todas las regulaciones locales."
        }
      ]
    }
  ];

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
        <div className="mt-2 md:mt-8">
          <Hero
            title="Preguntas"
            subtitle="Frecuentes"
            heroImage="bg-about-hero"
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
          className="px-4 md:px-8 lg:px-16 mb-16"
        >
          <SubHero
            title="¿Cómo Podemos Ayudarte?"
            subtitle="Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y procesos."
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
          className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 mb-24"
        >
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: categoryIndex * 0.1
              }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-primary mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, index) => {
                  const key = `${category.category}-${index}`;
                  const isOpen = openItems[key];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(category.category, index)}
                        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors duration-300"
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-center w-6 h-6 text-primary"
                        >
                          {isOpen ? <FiMinus /> : <FiPlus />}
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200"
                          >
                            <div className="p-4 bg-gray-50">
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
          }}
          viewport={{ once: true }}
          className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16 mb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">¿No encontraste lo que buscabas?</h2>
            <p className="text-gray-600 mb-8">
              Nuestro equipo está listo para responder cualquier pregunta adicional que puedas tener.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              Contáctanos
            </motion.a>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
