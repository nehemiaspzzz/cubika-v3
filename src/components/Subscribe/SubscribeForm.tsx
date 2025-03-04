'use client';
import { useState } from 'react';
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";

export default function SubscribeForm() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Error al suscribirse');
            }

            alert('¡Gracias por suscribirte!');
            setEmail('');

        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar la suscripción');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    required
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/70 text-sm"
                    disabled={isSubmitting}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Suscribiendo...' : 'Suscribirse'}
                </button>
            </form>
        </div>
    );
}
