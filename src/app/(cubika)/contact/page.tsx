"use client";
import ContactForm from "@/components/Forms/ContactForm";
import { CustomMap } from "@/components/Map/CustomMap";

export default function Contact() {
    return (
        <div className="min-h-screen pt-24 pb-12 md:pb-0 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-stretch bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Formulario */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
                        <p className="text-base md:text-lg text-gray-600 mb-8 transition-all duration-300 ease-in-out hover:scale-105 transform-gpu">
                            Let&apos;s make tshe skys align our constellations! Reach out and let the magic of collaboration illuminate our skies.
                        </p>
                        <ContactForm />
                    </div>

                    {/* Mapa */}
                    <div className="w-full md:w-1/2 h-[500px] md:min-h-[700px]">
                        <CustomMap />
                    </div>
                </div>
            </div>
        </div>
    );
}