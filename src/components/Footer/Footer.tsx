import Image from "next/image";
import logoCubika from "../../../public/images/logo_cubika_secondary.png";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import Link from "next/link";
import SubscribeForm from "../Subscribe/SubscribeForm";

export const Footer = () => {
    return (
        <footer className="bg-footer-image text-white">
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-8 py-6 md:py-12 px-4 md:px-16 lg:px-32 max-w-7xl mx-auto">
                {/* Logo y descripción */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <Image
                        src={logoCubika}
                        alt="Logo Cubika"
                        className="w-48 md:w-64 mb-3"
                    />
                </div>

                {/* Links */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-4">
                    <div>
                        <ul className="flex flex-col items-center md:items-start space-y-2">
                            <li className="text-sm md:text-base hover:text-primary transition-colors cursor-pointer">
                                <Link href="/brands">
                                Nuestras Marcas
                                </Link>
                            </li>
                            <li className="text-sm md:text-base hover:text-primary transition-colors cursor-pointer">
                                <Link href="/team">
                                    Equipo
                                </Link>
                            </li>
                            <li className="text-sm md:text-base hover:text-primary transition-colors cursor-pointer">
                                <Link href="/news">
                                    Noticias
                                </Link>
                            </li>
                            <li className="text-sm md:text-base hover:text-primary transition-colors cursor-pointer">
                                <Link href="/contact">
                                    Contáctanos
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col items-center md:items-start space-y-2">
                            <li className="text-sm md:text-base hover:text-primary transition-colors cursor-pointer">
                                <Link href="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                                  Políticas de Privacidad
                                </Link>
                            </li>
                            <li className="text-sm md:text-base hover:text-primary transition-colors cursor-pointer">
                                <Link href="/faq" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                                  Preguntas Frecuentes
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col items-center md:items-start order-last md:order-none mt-2 md:mt-0">
                    <h3 className="text-sm md:text-base font-light mb-3 text-center md:text-left">
                        Suscríbete para recibir las últimas novedades de propiedades y noticias del blog de Cubika.
                    </h3>
                    <SubscribeForm />
                </div>

                {/* Copyright */}
                <div className="text-center md:text-left col-span-full order-last mt-4 md:mt-6">
                    <p className="text-xs md:text-sm"> 2025 Grupo Cubika. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};