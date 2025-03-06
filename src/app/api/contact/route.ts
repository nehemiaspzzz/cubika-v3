import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

// Configuración para permitir archivos grandes
export const config = {
    api: {
        bodyParser: false,
    },
};

// Función para simular la subida a Google Drive y generar un enlace
async function uploadToGoogleDrive(file: File): Promise<string> {
    // En una implementación real, aquí subirías el archivo a Google Drive usando su API
    // y obtendrías un enlace de descarga real
    
    // Por ahora, simulamos el proceso y generamos un enlace ficticio
    console.log(`Simulando subida a Google Drive: ${file.name} (${file.size} bytes)`);
    
    // Simulamos un ID de archivo de Google Drive
    const fakeFileId = Math.random().toString(36).substring(2, 15);
    
    // Generamos un enlace ficticio de Google Drive
    // En una implementación real, este sería un enlace real de Google Drive
    const downloadLink = `https://drive.google.com/file/d/${fakeFileId}/view?usp=sharing`;
    
    console.log(`Enlace de descarga generado: ${downloadLink}`);
    
    return downloadLink;
}

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

        console.log('Datos recibidos:', { 
            formType, 
            nombres, 
            apellidos, 
            email, 
            telefono: telefono || 'No proporcionado', 
            empresa: empresa || 'No proporcionada',
            cvRecibido: cv ? 'Sí' : 'No'
        });
        
        // Procesar el archivo CV si existe
        let cvUrl = '';
        let cvFileName = '';
        if (cv && formType === 'trabajo') {
            try {
                // Verificar que el archivo es válido
                if (!cv.name || !cv.size || !cv.type) {
                    throw new Error('Archivo CV inválido');
                }
                
                console.log('Archivo CV recibido:', {
                    nombre: cv.name,
                    tamaño: cv.size,
                    tipo: cv.type
                });
                
                // Guardar el nombre del archivo
                cvFileName = cv.name;
                
                // Subir el archivo a Google Drive (simulado)
                cvUrl = await uploadToGoogleDrive(cv);
                
                console.log('CV subido correctamente. Enlace de descarga:', cvUrl);
            } catch (cvError) {
                console.error('Error al procesar el CV:', cvError);
                // Continuamos sin el CV en caso de error
            }
        }

        try {
            // Enviar el email
            console.log('Intentando enviar email con los siguientes datos:', {
                type: formType,
                nombres,
                apellidos,
                email,
                cvUrl: cvUrl || 'No adjuntado',
                cvFileName: cvFileName || 'No adjuntado'
            });
            
            const emailResponse = await sendContactEmail({
                type: formType,
                nombres,
                apellidos,
                email,
                telefono,
                empresa,
                mensaje,
                cvUrl: cvUrl || undefined,
                cvFileName: cvFileName || undefined
            });
            
            console.log('Email enviado correctamente:', emailResponse);
            
            return NextResponse.json({ 
                message: 'Email enviado correctamente',
                success: true
            });
        } catch (emailError: any) {
            console.error('Error específico al enviar el email:', emailError);
            
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
