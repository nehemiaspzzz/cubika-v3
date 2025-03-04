import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
    type: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono?: string;
    empresa?: string;
    mensaje: string;
    cvUrl?: string;
}

export async function sendContactEmail(data: EmailData) {
    const subject = `Nuevo mensaje de contacto: ${data.type}`;
    
    let emailContent = `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Tipo de consulta:</strong> ${data.type}</p>
        <p><strong>Nombre:</strong> ${data.nombres} ${data.apellidos}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.telefono ? `<p><strong>Teléfono:</strong> ${data.telefono}</p>` : ''}
        ${data.empresa ? `<p><strong>Empresa:</strong> ${data.empresa}</p>` : ''}
        <h3>Mensaje:</h3>
        <p>${data.mensaje}</p>
    `;

    if (data.cvUrl) {
        emailContent += `
            <p><strong>CV adjunto:</strong> ${data.cvUrl}</p>
        `;
    }

    try {
        const { data: emailResponse } = await resend.emails.send({
            from: 'Cubika Contact <no-reply@cubika.com>',
            to: process.env.CONTACT_EMAIL!,
            subject: subject,
            html: emailContent,
        });

        // Enviar confirmación al usuario
        await resend.emails.send({
            from: 'Cubika <no-reply@cubika.com>',
            to: data.email,
            subject: 'Hemos recibido tu mensaje',
            html: `
                <h2>Gracias por contactarnos</h2>
                <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
                <p>Detalles de tu mensaje:</p>
                <ul>
                    <li>Tipo de consulta: ${data.type}</li>
                    <li>Mensaje: ${data.mensaje}</li>
                </ul>
            `,
        });

        return emailResponse;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
