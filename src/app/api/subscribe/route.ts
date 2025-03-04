import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'El email es requerido' },
                { status: 400 }
            );
        }

        // Enviar email de confirmación
        await sendContactEmail({
            type: 'subscribe',
            nombres: 'Suscriptor',
            apellidos: 'Newsletter',
            email,
            mensaje: 'Suscripción al newsletter'
        });

        return NextResponse.json({ message: 'Suscripción exitosa' });
    } catch (error) {
        console.error('Error al procesar la suscripción:', error);
        return NextResponse.json(
            { error: 'Error al procesar la suscripción' },
            { status: 500 }
        );
    }
}
