"use client"
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero/Hero";
import { SubHero } from "@/components/Hero/SubHero";

export default function Privacy() {
  const policies = [
    {
      title: "Recopilación de Información",
      content: "En Cubika, recopilamos información personal cuando usted la proporciona voluntariamente a través de nuestros formularios web, correo electrónico o contacto directo. Esta información puede incluir su nombre, dirección de correo electrónico, número de teléfono y preferencias de vivienda."
    },
    {
      title: "Uso de la Información",
      content: "Utilizamos la información recopilada para: Proporcionar y mejorar nuestros servicios inmobiliarios, comunicarnos con usted sobre propiedades y ofertas relevantes, y personalizar su experiencia en nuestro sitio web."
    },
    {
      title: "Protección de Datos",
      content: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción."
    },
    {
      title: "Compartir Información",
      content: "No vendemos ni alquilamos su información personal a terceros. Solo compartimos su información cuando es necesario para proporcionar nuestros servicios o cuando la ley lo requiere."
    },
    {
      title: "Cookies y Tecnologías Similares",
      content: "Utilizamos cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el uso del sitio y personalizar el contenido. Puede controlar las cookies a través de la configuración de su navegador."
    },
    {
      title: "Sus Derechos",
      content: "Usted tiene derecho a acceder, corregir o eliminar su información personal. También puede optar por no recibir comunicaciones de marketing en cualquier momento."
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
            title="Políticas de"
            subtitle="Privacidad"
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
            title="Su Privacidad es Importante"
            subtitle="En Cubika, nos comprometemos a proteger y respetar su privacidad. Esta política describe cómo recopilamos, utilizamos y protegemos su información personal."
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
          className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-primary">{policy.title}</h3>
                <p className="text-gray-600 leading-relaxed">{policy.content}</p>
              </motion.div>
            ))}
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
          className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16 mb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">¿Tiene Preguntas?</h2>
            <p className="text-gray-600 mb-8">
              Si tiene alguna pregunta sobre nuestra política de privacidad o cómo manejamos sus datos, no dude en contactarnos.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              Contáctenos
            </motion.a>
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
          className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 mb-24"
        >
          <div className="bg-primary/5 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-primary">Actualizaciones de la Política</h3>
            <p className="text-gray-600 leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en esta página. Le recomendamos revisar periódicamente esta política para mantenerse informado sobre cómo protegemos su información.
            </p>
            <p className="text-gray-500 mt-4 text-sm">
              Última actualización: Enero 2024
            </p>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
