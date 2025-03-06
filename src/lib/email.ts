import { Resend } from 'resend';

// Inicializar Resend con la API key
const resendApiKey = process.env.RESEND_API_KEY || '';
if (!resendApiKey) {
  console.error('ADVERTENCIA: RESEND_API_KEY no está configurada. Los correos no se enviarán correctamente.');
}
const resend = new Resend(resendApiKey);

// Configurar el correo de contacto
const contactEmail = 'servicioalcliente@grupocubika.com'; // Dirección fija para asegurar que siempre se use esta
const fromEmail = 'no-reply@grupocubika.com'; // Usar el dominio verificado de grupocubika.com

interface EmailData {
    type: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono?: string;
    empresa?: string;
    mensaje: string;
    cvUrl?: string;
    cvFileName?: string;
}

export async function sendContactEmail(data: EmailData) {
    const subject = `Nuevo mensaje de contacto: ${data.type}`;
    
    let emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo mensaje de contacto</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 25px 0;
                    border-bottom: 2px solid #f0f0f0;
                    background: linear-gradient(to right, #f9f9f9, #ffffff, #f9f9f9);
                }
                .logo {
                    max-width: 180px;
                    margin-bottom: 15px;
                }
                .content {
                    padding: 35px 25px;
                }
                h1 {
                    color: #91472d;
                    font-size: 28px;
                    margin-top: 0;
                    margin-bottom: 25px;
                    text-align: center;
                    font-weight: 700;
                }
                h2 {
                    color: #91472d;
                    font-size: 22px;
                    margin-top: 30px;
                    margin-bottom: 15px;
                    font-weight: 600;
                }
                p {
                    margin-bottom: 18px;
                    font-size: 16px;
                    color: #444444;
                    line-height: 1.7;
                }
                .info-section {
                    background-color: #f7f7f7;
                    padding: 25px;
                    border-radius: 10px;
                    margin: 25px 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }
                .info-item {
                    padding: 12px 0;
                    border-bottom: 1px solid #e0e0e0;
                }
                .info-item:last-child {
                    border-bottom: none;
                }
                .label {
                    font-weight: bold;
                    color: #91472d;
                    display: inline-block;
                    width: 120px;
                }
                .message-box {
                    background-color: #f9f9f9;
                    border-left: 5px solid #91472d;
                    padding: 20px;
                    margin-top: 20px;
                    border-radius: 0 10px 10px 0;
                }
                .message-box p {
                    margin: 0;
                    white-space: pre-line;
                }
                .footer {
                    text-align: center;
                    padding-top: 25px;
                    border-top: 2px solid #f0f0f0;
                    color: #777777;
                    font-size: 14px;
                }
                .priority-high {
                    background-color: #fff8f8;
                    border-left: 5px solid #d14836;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 0 10px 10px 0;
                }
                .priority-normal {
                    background-color: #f9f9f9;
                    border-left: 5px solid #91472d;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 0 10px 10px 0;
                }
                .timestamp {
                    color: #888888;
                    font-size: 14px;
                    text-align: right;
                    margin-top: 10px;
                }
                .highlight {
                    background-color: #fffde7;
                    padding: 2px 5px;
                    border-radius: 3px;
                }
                .action-buttons {
                    margin: 25px 0;
                    text-align: center;
                }
                .action-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #91472d;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    margin: 0 10px;
                    transition: background-color 0.3s;
                }
                .action-button:hover {
                    background-color: #7a3a25;
                }
                .action-button.secondary {
                    background-color: #6c757d;
                }
                .action-button.secondary:hover {
                    background-color: #5a6268;
                }
                .notification-badge {
                    display: inline-block;
                    background-color: #91472d;
                    color: white;
                    font-size: 14px;
                    font-weight: bold;
                    padding: 5px 10px;
                    border-radius: 20px;
                    margin-left: 10px;
                }
                .contact-card {
                    background-color: #f9f9f9;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 15px;
                    margin-top: 20px;
                }
                .contact-card-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .contact-icon {
                    width: 40px;
                    height: 40px;
                    background-color: #91472d;
                    border-radius: 50%;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    margin-right: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://grupocubika.com/images/logo-cubika.png" alt="Cubika Logo" class="logo">
                    <h1>Nuevo mensaje de contacto <span class="notification-badge">Nuevo</span></h1>
                </div>
                <div class="content">
                    <div class="priority-normal">
                        <p>Se ha recibido un nuevo mensaje a través del formulario de contacto del sitio web.</p>
                    </div>
                    
                    <div class="contact-card">
                        <div class="contact-card-header">
                            <div class="contact-icon">👤</div>
                            <h2 style="margin: 0;">${data.nombres} ${data.apellidos}</h2>
                        </div>
                        <div class="info-section" style="margin-top: 15px; margin-bottom: 0;">
                            <div class="info-item">
                                <span class="label">Tipo:</span> <span class="highlight">${data.type}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Email:</span> <a href="mailto:${data.email}" style="color: #91472d; text-decoration: none;">${data.email}</a>
                            </div>
                            ${data.telefono ? `
                            <div class="info-item">
                                <span class="label">Teléfono:</span> <a href="tel:${data.telefono}" style="color: #91472d; text-decoration: none;">${data.telefono}</a>
                            </div>
                            ` : ''}
                            ${data.empresa ? `
                            <div class="info-item">
                                <span class="label">Empresa:</span> ${data.empresa}
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <h2>Mensaje del cliente:</h2>
                    <div class="message-box">
                        <p>${data.mensaje}</p>
                    </div>
                    
                    ${data.cvUrl ? `
                    <div style="margin-top: 25px; background-color: #f0f7ff; padding: 15px; border-radius: 8px; border-left: 5px solid #0077b5;">
                        <h3 style="margin-top: 0; color: #0077b5; font-size: 18px;">Curriculum Vitae adjunto</h3>
                        <p style="margin-bottom: 10px;">El candidato ha adjuntado su CV para revisión:</p>
                        <div style="background-color: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #e0e0e0; display: flex; align-items: center;">
                            <span style="background-color: #0077b5; color: white; padding: 8px; border-radius: 50%; margin-right: 10px; font-size: 16px;">📄</span>
                            <div>
                                <p style="margin: 0; font-weight: bold;">${data.cvFileName || 'CV.pdf'}</p>
                                <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Documento PDF adjunto</p>
                            </div>
                        </div>
                        <div style="margin-top: 15px; text-align: center;">
                            <a href="${data.cvUrl}" target="_blank" style="display: inline-block; background-color: #0077b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Descargar CV</a>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="action-buttons">
                        <a href="mailto:${data.email}" class="action-button">Responder</a>
                        <a href="tel:${data.telefono || ''}" class="action-button secondary" ${!data.telefono ? 'style="opacity: 0.5; pointer-events: none;"' : ''}>Llamar</a>
                    </div>
                    
                    <div class="timestamp">
                        Recibido el: ${new Date().toLocaleString('es-MX', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
                <div class="footer">
                    <p>Este es un mensaje automático del sistema de contacto de Grupo Cubika.</p>
                    <p>© ${new Date().getFullYear()} Grupo Cubika | Desarrolladores inmobiliarios</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        console.log('Intentando enviar email a:', contactEmail);
        
        // Enviar el correo principal
        const { data: emailResponse } = await resend.emails.send({
            from: `Cubika Contact <${fromEmail}>`,
            to: contactEmail,
            replyTo: data.email,
            subject: subject,
            html: emailContent,
        });

        console.log('Email enviado correctamente:', emailResponse);

        // Enviar confirmación al usuario (como funcionaba antes)
        console.log('Enviando confirmación al usuario:', data.email);
        
        await resend.emails.send({
            from: `Cubika <${fromEmail}>`,
            to: data.email,
            subject: 'Hemos recibido tu mensaje',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Gracias por contactarnos</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            line-height: 1.6;
                            color: #333333;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 12px;
                            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding: 25px 0;
                            border-bottom: 2px solid #f0f0f0;
                            background: linear-gradient(to right, #f9f9f9, #ffffff, #f9f9f9);
                        }
                        .logo {
                            max-width: 180px;
                            margin-bottom: 15px;
                        }
                        .content {
                            padding: 35px 25px;
                        }
                        h1 {
                            color: #91472d;
                            font-size: 28px;
                            margin-top: 0;
                            margin-bottom: 25px;
                            text-align: center;
                            font-weight: 700;
                        }
                        p {
                            margin-bottom: 18px;
                            font-size: 16px;
                            color: #444444;
                            line-height: 1.7;
                        }
                        .details {
                            background-color: #f7f7f7;
                            padding: 20px;
                            border-radius: 10px;
                            margin: 25px 0;
                            border-left: 5px solid #91472d;
                        }
                        .details h2 {
                            color: #91472d;
                            font-size: 20px;
                            margin-top: 0;
                            margin-bottom: 15px;
                            font-weight: 600;
                        }
                        ul {
                            padding-left: 20px;
                            margin-bottom: 0;
                        }
                        li {
                            margin-bottom: 12px;
                            color: #444444;
                        }
                        li:last-child {
                            margin-bottom: 0;
                        }
                        strong {
                            color: #333333;
                            font-weight: 600;
                        }
                        .footer {
                            text-align: center;
                            padding-top: 25px;
                            border-top: 2px solid #f0f0f0;
                            color: #777777;
                            font-size: 14px;
                        }
                        .social {
                            margin: 20px 0;
                        }
                        .social a {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #0077b5;
                            border-radius: 6px;
                            color: white;
                            text-decoration: none;
                            font-weight: 600;
                            transition: background-color 0.3s;
                        }
                        .social a:hover {
                            background-color: #005e93;
                        }
                        .highlight {
                            color: #91472d;
                            font-weight: 600;
                        }
                        .button {
                            display: inline-block;
                            padding: 12px 25px;
                            background-color: #91472d;
                            color: white;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: 600;
                            margin-top: 10px;
                            transition: background-color 0.3s;
                        }
                        .button:hover {
                            background-color: #7a3a25;
                        }
                        .tagline {
                            font-style: italic;
                            color: #666;
                            text-align: center;
                            margin: 15px 0;
                        }
                        .contact-info {
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-radius: 8px;
                            margin-top: 20px;
                            text-align: center;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://grupocubika.com/images/logo-cubika.png" alt="Cubika Logo" class="logo">
                        </div>
                        <div class="content">
                            <h1>¡Gracias por contactarnos!</h1>
                            <p>Hemos recibido tu mensaje y queremos agradecerte por ponerte en contacto con nosotros. En <span class="highlight">Grupo Cubika</span> valoramos tu interés y nos comprometemos a brindarte la mejor atención.</p>
                            
                            <p class="tagline">"Transformando tierras en hogares y sueños en realidad"</p>
                            
                            <p>Nuestro equipo revisará tu solicitud y te responderemos lo antes posible, generalmente dentro de las próximas 24-48 horas hábiles.</p>
                            
                            <div class="details">
                                <h2>Detalles de tu mensaje:</h2>
                                <ul>
                                    <li><strong>Tipo de consulta:</strong> ${data.type}</li>
                                    <li><strong>Nombre:</strong> ${data.nombres} ${data.apellidos}</li>
                                    <li><strong>Mensaje:</strong> ${data.mensaje}</li>
                                    ${data.cvUrl ? `<li><strong>CV adjunto:</strong> Tu curriculum vitae ha sido subido a Google Drive para su revisión</li>` : ''}
                                </ul>
                            </div>
                            
                            <p>Si tienes alguna pregunta adicional o necesitas asistencia inmediata, no dudes en responder a este correo electrónico o contactarnos a través de nuestros canales oficiales.</p>
                            
                            <p>Puedes visitar nuestra página web para conocer más sobre nuestros servicios:</p>
                            <div style="text-align: center;">
                                <a href="https://grupocubika.com" class="button">Visitar sitio web</a>
                            </div>
                            
                            <div class="contact-info">
                                <p><strong>Grupo Cubika</strong><br>
                                Ciudad de Guatemala, Guatemala<br>
                                Desarrolladores inmobiliarios desde 2022</p>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="social">
                                <a href="https://www.linkedin.com/company/grupo-cubika/" target="_blank">Síguenos en LinkedIn</a>
                            </div>
                            <p>© ${new Date().getFullYear()} Grupo Cubika. Todos los derechos reservados.</p>
                            <p>Somos una corporación 100% guatemalteca con inversión en la industria inmobiliaria.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        return emailResponse;
    } catch (error) {
        console.error('Error detallado al enviar email:', error);
        console.error('Datos del formulario:', {
            type: data.type,
            email: data.email,
            destinatario: contactEmail,
            remitente: fromEmail
        });
        throw error;
    }
}
