'use client';
import { useState, useEffect } from 'react';
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { motion } from 'framer-motion';

type ContactFormType = 'general' | 'trabajo' | 'negocios';

interface FormTypeOption {
    value: ContactFormType;
    label: string;
    icon: string;
}

const formTypes: FormTypeOption[] = [
    {
        value: 'general',
        label: 'Información General',
        icon: '📝'
    },
    {
        value: 'trabajo',
        label: 'Búsqueda de Trabajo',
        icon: '💼'
    },
    {
        value: 'negocios',
        label: 'Propuesta de Negocios',
        icon: '🤝'
    }
];

export default function ContactForm() {
    const [formType, setFormType] = useState<ContactFormType>('general');
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        empresa: '',
        mensaje: '',
        cv: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar el archivo
        if (file.size > 5 * 1024 * 1024) {
            alert('El archivo no debe superar los 5MB');
            e.target.value = '';
            return;
        }

        if (!file.type.includes('pdf')) {
            alert('Solo se permiten archivos PDF');
            e.target.value = '';
            return;
        }

        console.log('Archivo seleccionado:', file.name, 'Tamaño:', file.size, 'Tipo:', file.type);

        setFormData(prev => ({
            ...prev,
            cv: file
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validar que se adjunte un CV si el tipo de formulario es 'trabajo'
        if (formType === 'trabajo' && !formData.cv) {
            setSubmitStatus('error');
            setErrorMessage('Por favor, adjunta tu CV para aplicar a una posición de trabajo.');
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');
        
        // Establecer un timeout para evitar que se quede cargando indefinidamente
        const timeoutId = setTimeout(() => {
            if (isSubmitting) {
                setIsSubmitting(false);
                setSubmitStatus('error');
                setErrorMessage('La solicitud ha tardado demasiado tiempo. Por favor, inténtalo de nuevo.');
            }
        }, 30000); // Aumentar a 30 segundos para dar más tiempo al servidor
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('formType', formType);
            formDataToSend.append('nombres', formData.nombres);
            formDataToSend.append('apellidos', formData.apellidos);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('telefono', formData.telefono || '');
            formDataToSend.append('empresa', formData.empresa || '');
            formDataToSend.append('mensaje', formData.mensaje);
            
            if (formData.cv && formType === 'trabajo') {
                formDataToSend.append('cv', formData.cv);
                console.log('Adjuntando CV:', formData.cv.name, formData.cv.size);
            } else if (formType === 'trabajo' && !formData.cv) {
                console.log('Formulario de trabajo sin CV adjunto');
            }

            console.log('Enviando formulario...');
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formDataToSend,
                });

                // Limpiar el timeout ya que recibimos respuesta
                clearTimeout(timeoutId);

                let result;
                try {
                    result = await response.json();
                    console.log('Respuesta del servidor:', result);
                } catch (jsonError) {
                    console.error('Error al parsear la respuesta JSON:', jsonError);
                    throw new Error('Error al procesar la respuesta del servidor');
                }

                if (!response.ok) {
                    throw new Error(result?.error || result?.message || 'Error al enviar el mensaje');
                }

                setSubmitStatus('success');
                
                // Limpiar el formulario
                setFormData({
                    nombres: '',
                    apellidos: '',
                    email: '',
                    telefono: '',
                    empresa: '',
                    mensaje: '',
                    cv: null
                });
                
                // Limpiar el input de archivo si existe
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = '';
                }
            } catch (fetchError) {
                console.error('Error en la petición fetch:', fetchError);
                throw new Error('Error de conexión con el servidor. Por favor, inténtalo de nuevo.');
            }
            
        } catch (error: any) {
            // Limpiar el timeout en caso de error
            clearTimeout(timeoutId);
            
            console.error('Error en el envío del formulario:', error);
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
        >
            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <p className="font-medium">¡Mensaje enviado con éxito!</p>
                    <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
                </div>
            )}
            
            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <p className="font-medium">Error al enviar el mensaje</p>
                    <p>{errorMessage}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selector de tipo de formulario */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {formTypes.map((type) => (
                        <motion.div
                            key={type.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormType(type.value)}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                                formType === type.value
                                    ? 'border-primary bg-primary/5 shadow-lg'
                                    : 'border-gray-200 hover:border-primary/50'
                            }`}
                        >
                            <div className="flex items-center gap-3 justify-center">
                                <span className="text-2xl">{type.icon}</span>
                                <h3 className="font-semibold text-gray-800">{type.label}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-6">
                    {/* Campos del formulario */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
                                Nombres
                            </label>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                value={formData.nombres}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                                Apellidos
                            </label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                                Teléfono (opcional)
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    {formType === 'negocios' && (
                        <div>
                            <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                                Nombre de la empresa
                            </label>
                            <input
                                type="text"
                                id="empresa"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                            Mensaje
                        </label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows={4}
                            value={formData.mensaje}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {formType === 'trabajo' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                        >
                            <label className="block text-sm font-medium text-gray-700">CV (PDF)</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                                        </p>
                                        <p className="text-xs text-gray-500">PDF (Máx. 5MB)</p>
                                    </div>
                                    <input 
                                        type="file"
                                        name="cv"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {formData.cv && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Archivo seleccionado: {formData.cv.name}</span>
                                </div>
                            )}
                        </motion.div>
                    )}

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                bg-primary text-white px-8 py-3 text-lg rounded-md 
                                hover:bg-primary/80 
                                transition-all duration-200
                                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}
