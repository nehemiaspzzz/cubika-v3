"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.png';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="relative">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={120}
                            height={40}
                            className="w-auto h-auto"
                        />
                    </Link>

                    {/* Menú hamburguesa */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex flex-col justify-center items-center md:hidden"
                    >
                        <span className={`block w-6 h-0.5 bg-gray-600 mb-1.5 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-600 mb-1.5 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                    {/* Menú desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">
                            Nosotros
                        </Link>
                        <Link href="/projects" className="text-gray-700 hover:text-primary transition-colors font-medium">
                            Proyectos
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t border-gray-100`}>
                <div className="px-4 py-2">
                    <Link href="/about" className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium">
                        Nosotros
                    </Link>
                    <Link href="/projects" className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium">
                        Proyectos
                    </Link>
                    <Link href="/contact" className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium">
                        Contacto
                    </Link>
                </div>
            </div>
        </nav>
    );
}; 