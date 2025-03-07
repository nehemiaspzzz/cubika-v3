'use client';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Carousel } from "@material-tailwind/react";

// images
import quienesSomos from "../../../../public/images/quienes-somos-1.webp";
import quienesSomos2 from "../../../../public/images/quienes-somos-2.webp";
import principios from "../../../../public/images/principios.webp";
import cubika from "../../../../public/images/cubika-img.webp";
import arboleda from "../../../../public/images/arboleda-img.webp";
import jardines from "../../../../public/images/jl-image.webp";
import prados from "../../../../public/images/prados-image.webp";
import team from "../../../../public/images/team-meet.webp";
import brandHero from "../../../../public/images/hero-logo.webp";
import aboutHero from "../../../../public/images/brand-hero3.webp";
import aboutUsImage from "../../../../public/images/about-hero.webp";
import heroImage from "../../../../public/images/hero-logo.png";
import heroImage2 from "../../../../public/images/logo-arboleda.png";
import heroImage3 from "../../../../public/images/logo-jyl.png";
import moduleHero from "../../../../public/images/banner-module.png";
import moduleImage from "../../../../public/images/logo-module.png";

// Lazy load components
const SecondaryButton = dynamic(() => import("@/components/Buttons/SecondaryButton").then(mod => mod.SecondaryButton), { ssr: true });
const PrimaryCard = dynamic(() => import("@/components/Cards/PrimaryCard").then(mod => mod.PrimaryCard), { ssr: true });
const ImageTextCard = dynamic(() => import("@/components/Cards/ImageTextCard").then(mod => mod.ImageTextCard), { ssr: true });
const Header = dynamic(() => import("@/components/Header/Header").then(mod => mod.Header), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer/Footer").then(mod => mod.Footer), { ssr: true });
const PostsCard = dynamic(() => import("@/components/Posts/PostCard").then(mod => mod.PostsCard), { ssr: true });
const HeroCarousel = dynamic(() => import("@/components/Carousel/HeroCarousel").then(mod => mod.HeroCarousel), { ssr: true });

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized data fetching with caching and error handling
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const cachedPosts = sessionStorage.getItem('blogPosts');
        const cacheTimestamp = sessionStorage.getItem('blogPostsTimestamp');
        const now = Date.now();
        
        // Use cache if it exists and is less than 5 minutes old
        if (cachedPosts && cacheTimestamp && now - parseInt(cacheTimestamp) < 300000) {
          setPosts(JSON.parse(cachedPosts));
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        setPosts(data);
        sessionStorage.setItem('blogPosts', JSON.stringify(data));
        sessionStorage.setItem('blogPostsTimestamp', now.toString());
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Use cached data as fallback even if it's old
        const cachedPosts = sessionStorage.getItem('blogPosts');
        if (cachedPosts) {
          setPosts(JSON.parse(cachedPosts));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Memoized animation variants with mobile optimization
  const animations = useMemo(() => ({
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { 
        duration: isMobile ? 0.4 : 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    fadeInUp: {
      initial: { opacity: 0, y: isMobile ? 15 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: isMobile ? 0.4 : 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    stagger: {
      animate: {
        transition: {
          staggerChildren: isMobile ? 0.05 : 0.1,
          delayChildren: isMobile ? 0.1 : 0.2
        }
      }
    }
  }), [isMobile]);

  // Optimized viewport config
  const viewportConfig = useMemo(() => ({
    once: true,
    amount: isMobile ? 0.1 : 0.3
  }), [isMobile]);

  const quienesSomosRef = useRef(null);
  const principiosRef = useRef(null);
  const proyectosRef = useRef(null);

  const quienesSomosInView = useInView(quienesSomosRef, { once: true, amount: 0.2 });
  const principiosInView = useInView(principiosRef, { once: true, amount: 0.2 });
  const proyectosInView = useInView(proyectosRef, { once: true, amount: 0.1 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="overflow-x-hidden"
    >
      <motion.div
        className="rounded-b-3xl h-screen relative"
        {...animations.fadeIn}
        role="banner"
        aria-label="Carrusel principal de Cubika"
      >
        <Carousel
          loop
          autoplay
          placeholder={aboutHero.src}
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
          className="rounded-b-xl w-full"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2" role="tablist">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={`Slide ${i + 1}`}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          <HeroCarousel
            image={brandHero.src}
            text="Somos una corporación 100% guatemalteca con inversión en la industria inmobiliaria."
            logo={heroImage.src}
          />
          <HeroCarousel
            image={aboutUsImage.src}
            text="Construimos hogares sostenibles en un entorno natural, con cercania a la ciudad."
            logo={heroImage2.src}
          />
          <HeroCarousel
            image={moduleHero.src}
            text="Somos una empresa creada con la visión de ofrecer soluciones arquitectónicas personalizadas y de alta calidad."
            logo={moduleImage.src}
            logoSize="w-[250px] md:w-[400px]"
          />
          <HeroCarousel
            image={aboutHero.src}
            text="Nos especializamos en la administración y manejo de ornato en proyectos habitacionales."
            logo={heroImage3.src}
          />
        </Carousel>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-0 left-0 w-full"
        >
          <Header />
        </motion.div>
      </motion.div>

      <motion.section
        variants={animations.fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        id="quienes-somos"
        className="flex flex-col items-center justify-center mt-8"
        role="region"
        aria-labelledby="quienes-somos-title"
      >
        <motion.h1
          variants={animations.fadeIn}
          className="text-2xl font-bold uppercase text-center"
          id="quienes-somos-title"
        >
          Somos Cubika
        </motion.h1>
        <motion.div
          variants={animations.fadeIn}
          className="w-[310px] h-[3px] bg-primary my-4"
        />
        <motion.h2
          variants={animations.fadeIn}
          className="text-center text-3xl font-bold uppercase px-4 mb-8"
        >
          Orgullosamente guatemaltecos, transformando el <br /> futuro inmobiliario
        </motion.h2>

        <motion.div
          variants={animations.fadeIn}
          className="flex flex-col md:flex-row my-8 w-full items-center md:items-start"
        >
          <div className="w-full md:w-[60%] flex justify-center md:justify-start px-4 md:px-0">
            <Image
              src={quienesSomos}
              alt="Quienes Somos"
              width={1920}
              height={1080}
              quality={85}
              loading="lazy"
              className="w-full"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="flex flex-col w-full md:w-[40%] items-center px-4 md:px-0 relative z-10">
            <motion.div
              variants={animations.fadeIn}
              id="card-quienes-somos"
              className="w-full md:w-[110%] bg-white rounded-2xl p-8 mt-8 md:mt-16 md:ml-[-15%] text-justify shadow-lg"
            >
              <p className="transition-all duration-300 ease-in-out hover:scale-105 transform-gpu">
                Nuestra filosofía empresarial es contribuir de manera sostenible, con innovación en el diseño y
                construcción de cada proyecto, que nos motivan a crear sueños, ilusiones y
                emociones que estamos seguros de lograrlo en cada uno de nuestros clientes,
                con el motor principal que es nuestro equipo de trabajo.
              </p>
            </motion.div>

            <motion.div
              variants={animations.fadeIn}
              id="card-quienes-somos-2"
              className="w-full md:w-[110%] h-auto ml-[1%] bg-primary rounded-3xl p-1 mt-8"
            >
              <div className="bg-primary/60 rounded-lg p-8 lg:p-8">
                <p className="text-white">
                  Nos enfocamos en crear una experiencia de vida, cuidando cada detalle en el
                  desarrollo de cada vivienda, transformando tierras en hogares y sueños en realidades.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={animations.fadeIn}
              className="flex items-center justify-center mt-10 md:mt-12"
            >
              <div className="transition-all duration-300 ease-in-out hover:scale-110 transform-gpu">
                <Link href="/about">
                  <SecondaryButton text="¡Descubre nuestra historia!" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={animations.fadeIn}
          className="flex flex-col items-center md:items-start justify-center mt-8 px-4 md:px-0"
        >
          <Image
            src={quienesSomos2}
            alt="Quienes Somos"
            width={1920}
            height={1080}
            quality={85}
            loading="lazy"
            className="w-full h-auto transition-all duration-300 ease-in-out hover:scale-105 transform-gpu mb-16"
            sizes="100vw"
          />
        </motion.div>
      </motion.section>

      <motion.section
        variants={animations.fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        id="propuesta"
        className="flex flex-col items-center justify-center mt-10"
        role="region"
        aria-labelledby="portafolio-title"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          variants={sectionVariants}
          className="text-center text-4xl sm:text-5xl font-extrabold uppercase mb-8 px-4"
          id="portafolio-title"
        >
          Portafolio
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          variants={sectionVariants}
          className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="w-full h-[300px] md:h-[400px] mb-8">
            <ImageTextCard
              title="Grupo Cubika"
              text="Transformamos terrenos en hogares sostenibles, con un enfoque en diseño, innovación y desarrollo urbano. Desde nuestra fundación, hemos trabajado para crear experiencias de vida únicas que respeten el medio ambiente y mejoren la calidad de vida de nuestros clientes. "
              image={cubika}
            />
          </div>
          <div className="w-full h-[300px] md:h-[400px] mb-8">
            <ImageTextCard
              title="J&L Servicios"
              text="Nos especializamos en la administración y manejo de ornato en proyectos habitacionales."
              image={jardines}
            />
          </div>
          <div className="w-full h-[300px] md:h-[400px] mb-8">
            <ImageTextCard
              title="Arboleda los Encinos"
              text="Construimos hogares sostenibles en un entorno natural, con cercania a la ciudad."
              image={arboleda}
            />
          </div>
          <div className="w-full h-[300px] md:h-[400px] mb-8">
            <ImageTextCard
              title="Prados de Minerva"
              text="Nuestro primer proyecto habitacional en el mercado guatemalteco brindado acceso a la primera vivienda."
              image={prados}
            />
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        variants={animations.fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        id="principios"
        className="flex flex-col md:flex-row w-full items-center justify-center mt-8"
        role="region"
        aria-labelledby="principios-title"
      >
        <div className="flex flex-col w-full md:w-[60%] items-center justify-center px-4 md:px-8 mt-8 md:mt-0">
          <motion.h2
            variants={animations.fadeIn}
            className="text-center text-3xl font-bold uppercase mb-8"
            id="principios-title"
          >
            Principios que nos guían
          </motion.h2>
          <motion.div
            variants={animations.fadeIn}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
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
              <PrimaryCard
                title="Orden y Constancia"
                text="Nos esforzamos para mantener el control, el orden y la constancia en nuestras acciones y comportamientos, para lograr los objetivos trazados."
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
            >
              <PrimaryCard
                title="Trabajo en Equipo"
                text="Valoramos la capacidad de trabajar en equipo, combinando habilidades y esfuerzos para alcanzar objetivos comunes de manera efectiva У armoniosa."
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
            >
              <PrimaryCard
                title="Comunicación"
                text="Valoramos la claridad honestidad en la comunicación. Fomentamos un ambiente donde la información fluye de manera efectiva, construyendo relaciones sólidas basadas en la confianza y el respeto."
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
            >
              <PrimaryCard
                title="Compromiso con el Desarrollo"
                text="Nos esforzamos para mantener el control, el orden y la constancia en nuestras acciones y comportamientos, para lograr los objetivos trazados."
              />
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          variants={animations.fadeIn}
          className="hidden md:block w-[60%] mb-8 md:mb-0"
        >
          <Image
            src={principios}
            alt="Principios"
            width={1920}
            height={1080}
            quality={85}
            loading="lazy"
            className="w-full h-[650px] rounded-l-3xl rounded-r-none"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </motion.div>
      </motion.section>
      <motion.div
        className="block md:hidden w-full flex justify-center mt-8 mb-8"
      >
        <Image
          src={principios}
          alt="Principios"
          width={800}
          height={600}
          quality={85}
          loading="lazy"
          className="w-[90%] h-auto rounded-xl"
          sizes="90vw"
        />
      </motion.div>
      <div className="h-16 md:h-26"></div>

      {/* Sección del Equipo */}
      <motion.section
        variants={animations.fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        id="team"
        className="flex flex-col md:flex-row w-full items-center justify-center mt-8 relative"
        role="region"
        aria-labelledby="team-title"
      >
        <motion.div
          variants={animations.fadeIn}
          className="hidden md:block w-[60%] mb-8 md:mb-0"
        >
          <Image
            src={team}
            alt="Equipo Cubika"
            width={1920}
            height={1080}
            quality={85}
            priority
            className="w-full h-[650px] rounded-r-3xl rounded-l-none object-cover object-center"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </motion.div>

        <div className="flex flex-col w-full md:w-[60%] items-center justify-center px-4 md:px-8 mt-8 md:mt-0 md:ml-[-10%] relative z-10">
          <div className="w-[310px] h-[3px] bg-primary my-4"></div>
          <h2 className="text-center text-3xl lg:text-4xl font-bold uppercase mb-12">
            EL EQUIPO QUE <br /> NOS DEFINE
          </h2>

          <div className="w-[90%] h-auto bg-white rounded-2xl p-8 shadow-lg md:ml-[-15%]">
            <p className="text-base lg:text-lg">
              Nuestro equipo directivo, gerencial, comercial, constructivo, de desarrollo y administrativo,
              se caracteriza por la pasión y dedicación que se le da a cada vivienda de nuestros clientes,
              donde buscamos dar una mejor calidad de vida.
            </p>
          </div>

          <div className="w-fit max-w-[90%] bg-[#1B2845] rounded-2xl p-8 mt-8">
            <p className="text-white text-xl lg:text-2xl font-bold text-center">
              Pero sin duda lo que nos hace únicos es poder trascender y formar parte de un sueño de un nuevo hogar que perdurará en el tiempo.
            </p>
          </div>

          <div className="flex justify-center w-full mt-8">
            <Link href="/team" className="transition-all duration-300 ease-in-out hover:scale-110 transform-gpu">
              <SecondaryButton text="Conoce a nuestro equipo" />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.div className="block md:hidden w-full flex justify-center mt-8 mb-8">
        <Image
          src={team}
          alt="Equipo Cubika"
          width={800}
          height={600}
          quality={85}
          loading="lazy"
          className="w-[90%] h-auto rounded-xl"
          sizes="90vw"
        />
      </motion.div>
      <div className="h-16 md:h-26"></div>

      <motion.section
        variants={animations.fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        id="news"
        className="mx-4 lg:mx-14 py-12 bg-gray-50 rounded-3xl"
        role="region"
        aria-labelledby="news-title"
      >
        <div className="flex flex-col items-center justify-center mb-8">
          <motion.h2
            variants={animations.fadeIn}
            className="text-center text-3xl lg:text-4xl font-bold uppercase mb-3"
            id="news-title"
          >
            Últimas novedades
          </motion.h2>
          <motion.p
            variants={animations.fadeIn}
            className="text-center text-gray-600 text-lg mb-6 max-w-2xl"
          >
            Mantente informado sobre nuestros proyectos y avances
          </motion.p>
          <motion.div
            variants={animations.fadeIn}
            className="flex justify-center"
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-300 font-semibold group"
            >
              Ver todas las noticias
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={animations.fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 my-6 px-4 lg:px-8">
            {posts.slice(0, 3).map((post: any, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-sm mx-auto w-full"
              >
                <PostsCard
                  header={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
                  title={post.title.rendered}
                  text={post.excerpt.rendered}
                  date={post.date}
                  author={post._embedded?.author?.[0]?.name}
                  slug={post.slug}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
      <Footer />
    </motion.div>
  );
}
