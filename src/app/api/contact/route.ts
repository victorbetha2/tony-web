import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { contactPayloadSchema } from "@/lib/contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    await db.insert(contactSubmissions).values({
      name,
      email,
      phone: phone?.trim() ? phone.trim() : null,
      message,
    });

    try {
      await resend.emails.send({
        from: "T2B Team Web <noreply@uniklabs.tech>",
        to: process.env.CONTACT_EMAIL || "info@t2bteam.net",
        subject: `Nuevo contacto de ${name} - T2B Team`,
        html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone?.trim() || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
        replyTo: email,
      });

      await resend.emails.send({
        from: "T2B Team <noreply@uniklabs.tech>",
        to: email,
        subject: "Recibimos tu mensaje - T2B Team",
        html: `
        <h2>¡Hola ${name}!</h2>
        <p>Recibimos tu mensaje y te contactaremos pronto.</p>
        <p>Equipo T2B Team</p>
      `,
      });
    } catch (emailErr) {
      console.error("Resend error (submission saved):", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
