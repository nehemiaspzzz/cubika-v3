"use client";

import Image from "next/image";
import logoCubika from "../../../public/images/logo_cubika.png";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname() || '/';

    const menuItems = [
        {
            title: "Sobre Nosotros", 
            href: "/about"
        }, 
        {
            title: "Nuestro Equipo", 
            href: "/team"
        },
        {
            title: "Nuestras Marcas", 
            href: "/brands"
        }, 
        {
            title: "Noticias", 
            href: "/blog"
        }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="w-full flex justify-between items-center py-4 px-4 md:px-12 lg:px-32 fixed top-0 left-0 right-0 z-[200] bg-white shadow-md">
                {/* Logo */}
                <div className="relative">
                    <Link href="/home" className="relative z-[100] block p-2">
                        <Image
                            src={logoCubika}
                            alt="Logo Cubika"
                            className="w-40 md:w-40 lg:w-48"
                            priority
                        />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden relative z-[100]"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <div className="w-10 h-10 flex items-center justify-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 transition-all duration-300 ease-in-out"
                            fill="none"
                            viewBox="0 0 24 24" 
                            stroke="#cc965a"
                        >
                            {!isMobileMenuOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            )}
                        </svg>
                    </div>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <div className="rounded-xl px-8 py-3 flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link 
                                key={item.title}
                                href={item.href}
                                className={`
                                    text-base font-medium
                                    hover:text-primary transition-all duration-300 ease-in-out
                                    ${pathname === item.href 
                                        ? 'text-primary font-bold' 
                                        : 'text-gray-700'}
                                `}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    <Link 
                        href="/contact" 
                        className="transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <PrimaryButton 
                            text="Contáctanos" 
                            className="text-base transition-all duration-300 ease-in-out hover:bg-primary/90"
                        />
                    </Link>
                </nav>
            </header>

            {/* Mobile Navigation Overlay */}
            <div 
                className={`
                    md:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-[90]
                    transition-all duration-500 ease-in-out
                    ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
                `}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.title}
                            href={item.href}
                            className={`
                                text-2xl font-medium transition-all duration-300 ease-in-out
                                hover:text-primary hover:scale-110 transform
                                ${pathname === item.href 
                                    ? 'text-primary font-bold' 
                                    : 'text-gray-700'}
                            `}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}
                    <Link 
                        href="/contact" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-4 transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <PrimaryButton 
                            text="Contáctanos" 
                            className="text-lg hover:bg-primary/90"
                        />
                    </Link>
                </div>
            </div>
            {/* Espacio para compensar el header fixed */}
            <div className="h-24" />
        </>
    );
};