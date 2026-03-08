import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, message } = await req.json();

        await resend.emails.send({
            from: 'T2B Team Web <noreply@t2bteam.net>',
            to: process.env.CONTACT_EMAIL || "test@example.com",
            subject: `Nuevo contacto de ${name} - T2B Team`,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
            replyTo: email,
        });

        // Send confirmation to the user
        await resend.emails.send({
            from: 'T2B Team <noreply@t2bteam.net>',
            to: email,
            subject: 'Recibimos tu mensaje - T2B Team',
            html: `
        <h2>¡Hola ${name}!</h2>
        <p>Recibimos tu mensaje y te contactaremos pronto.</p>
        <p>Equipo T2B Team</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
    }
}
