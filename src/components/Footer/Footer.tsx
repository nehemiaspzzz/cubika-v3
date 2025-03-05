import Image from "next/image";
import logoCubika from "../../../public/images/logo_cubika_secondary.png";
import Link from "next/link";
import SubscribeForm from "../Subscribe/SubscribeForm";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/company/grupo-cubika/',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/>
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-footer-image text-white" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Columna 1: Logo y descripción */}
                    <div className="space-y-6">
                        <Link href="/home" className="inline-block">
                            <Image
                                src={logoCubika}
                                alt="Logo Grupo Cubika"
                                className="w-48 md:w-56"
                                priority
                            />
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Transformamos terrenos en hogares sostenibles, con un enfoque en diseño, 
                            innovación y desarrollo urbano en Guatemala.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                    aria-label={`Síguenos en ${item.name}`}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columna 2: Enlaces principales */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary">Explora</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/brands" className="text-gray-300 hover:text-white transition-colors duration-300">
                                    Nuestras Marcas
                                </Link>
                            </li>
                            <li>
                                <Link href="/team" className="text-gray-300 hover:text-white transition-colors duration-300">
                                    Equipo
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                                    Contáctanos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Información legal y ayuda */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary">Ayuda</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                                    Políticas de Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-300">
                                    Preguntas Frecuentes
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Columna 4: Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary">Boletín Informativo</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Suscríbete para recibir las últimas novedades de propiedades y noticias 
                            del blog de Grupo Cubika.
                        </p>
                        <SubscribeForm />

                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">
                            © {currentYear} Grupo Cubika. Todos los derechos reservados.
                        </p>
                        <p className="text-sm text-gray-400 mt-4 md:mt-0">
                            Diseñado y desarrollado en Guatemala
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};