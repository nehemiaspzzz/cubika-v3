"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.png';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white">
            <div className="flex justify-between items-center px-4 py-4">
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
                    <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Menú desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/about" className="text-black hover:text-primary transition-colors">
                        Nosotros
                    </Link>
                    <Link href="/projects" className="text-black hover:text-primary transition-colors">
                        Proyectos
                    </Link>
                    <Link href="/contact" className="text-black hover:text-primary transition-colors">
                        Contacto
                    </Link>
                </div>
            </div>

            {/* Menú móvil */}
            <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'} overflow-hidden bg-white`}>
                <div className="px-4 py-2">
                    <Link href="/about" className="block py-2 text-black hover:text-primary transition-colors">
                        Nosotros
                    </Link>
                    <Link href="/projects" className="block py-2 text-black hover:text-primary transition-colors">
                        Proyectos
                    </Link>
                    <Link href="/contact" className="block py-2 text-black hover:text-primary transition-colors">
                        Contacto
                    </Link>
                </div>
            </div>
        </nav>
    );
}; 