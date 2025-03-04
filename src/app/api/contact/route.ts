import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const { 
            nombres, 
            apellidos, 
            email, 
            telefono, 
            empresa, 
            mensaje,
            formType 
        } = await req.json();

        if (!nombres || !apellidos || !email || !mensaje || !formType) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Crear el contenido del email
        const emailContent = `
            Nuevo mensaje de contacto:
            
            Tipo de formulario: ${formType}
            Nombres: ${nombres}
            Apellidos: ${apellidos}
            Email: ${email}
            Teléfono: ${telefono || 'No proporcionado'}
            Empresa: ${empresa || 'No proporcionada'}
            Mensaje: ${mensaje}
        `;

        // Enviar el email
        await sendContactEmail({
            type: formType,
            nombres,
            apellidos,
            email,
            telefono,
            empresa,
            mensaje
        });

        return NextResponse.json({ message: 'Email enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el email:', error);
        return NextResponse.json(
            { error: 'Error al enviar el email' },
            { status: 500 }
        );
    }
}
