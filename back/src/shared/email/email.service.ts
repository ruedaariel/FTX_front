// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        // Configura el "transporter" de nodemailer con tus credenciales SMTP
        // Por ejemplo, usando Gmail (para desarrollo, no para producción)
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'usuarionuevo.ftx@gmail.com',
                pass: 'wxsw lyfa tyum ojuu' // O usa una variable de entorno
            },
            tls: {
                rejectUnauthorized: false // <-- ignora el certificado (SOLO PARA ETAPA DE DESARROLLO }
            }
        });
    }

    async enviarCredenciales(email: string, passwordGenerada: string) {
        const mailOptions = {
            from: 'usuarionuevo.ftx@gmail.com',
            to: email,
            subject: '¡Bienvenido! Aquí están tus credenciales de acceso',
            html: `<p>Hola,</p>
             <p>Tu cuenta ha sido creada exitosamente. Tu contraseña es: <strong>${passwordGenerada}</strong></p>
             <p>Por favor, cámbiala en tu primer inicio de sesión.</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a: ${email}`);
        } catch (error) {
            console.error(`Error al enviar el correo a ${email}:`, error);
            throw new Error('No se pudo enviar el correo de bienvenida');
        }
    }

        async resetPassword(email: string, passwordGenerada: string) {
        const mailOptions = {
            from: 'usuarionuevo.ftx@gmail.com',
            to: email,
            subject: '¡Hola! Restablecé tu contraseña',
            html: `<p>Hola,</p>
             <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
             <p> Tu nueva contraseña es <strong>${passwordGenerada}</strong></p>
             <p>Por favor, cámbiala en tu primer inicio de sesión.</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a: ${email}`);
        } catch (error) {
            console.error(`Error al enviar el correo a ${email}:`, error);
            throw new Error('No se pudo enviar el correo de bienvenida');
        }
    }

       async enviarCambioContrasena(email: string) {
        const mailOptions = {
            from: 'usuarionuevo.ftx@gmail.com',
            to: email,
            subject: 'Cambio de Contraseña',
            html: `<p>Hola,</p>
             <p>Te informamos que tu contraseña ha cambiado en tu cuenta FTX</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a: ${email}`);
        } catch (error) {
            console.error(`Error al enviar el correo a ${email}:`, error);
            throw new Error('No se pudo enviar el correo de bienvenida');
        }
    }

}