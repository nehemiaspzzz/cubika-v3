import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
    console.log('API de contacto recibió una solicitud');
    
    try {
        // Procesar FormData en lugar de JSON
        const formData = await req.formData();
        
        const formType = formData.get('formType') as string;
        const nombres = formData.get('nombres') as string;
        const apellidos = formData.get('apellidos') as string;
        const email = formData.get('email') as string;
        const telefono = formData.get('telefono') as string;
        const empresa = formData.get('empresa') as string;
        const mensaje = formData.get('mensaje') as string;
        const cv = formData.get('cv') as File | null;

        // Validar campos requeridos
        if (!nombres || !apellidos || !email || !mensaje || !formType) {
            console.error('Faltan campos requeridos:', { nombres, apellidos, email, mensaje, formType });
            return NextResponse.json(
                { error: 'Faltan campos requeridos', success: false },
                { status: 400 }
            );
        }

        console.log('Datos recibidos:', { formType, nombres, apellidos, email, telefono, empresa });

        // Intentar enviar el email
        try {
            const emailResponse = await sendContactEmail({
                type: formType,
                nombres,
                apellidos,
                email,
                telefono,
                empresa,
                mensaje
            });
            
            console.log('Email enviado correctamente:', emailResponse);
            
            return NextResponse.json({ 
                message: 'Email enviado correctamente',
                success: true
            });
        } catch (emailError: any) {
            console.error('Error al enviar el email:', emailError);
            
            // Responder con error pero asegurar que la respuesta llegue al cliente
            return NextResponse.json(
                { 
                    error: 'Error al enviar el email',
                    message: emailError.message || 'Error desconocido',
                    success: false
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Error general en la API de contacto:', error);
        
        // Asegurar que siempre haya una respuesta
        return NextResponse.json(
            { 
                error: 'Error al procesar la solicitud',
                message: error.message || 'Error desconocido',
                success: false
            },
            { status: 500 }
        );
    }
}
