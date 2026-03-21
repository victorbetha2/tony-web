import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { leadPayloadSchema } from "@/lib/lead-schema";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

function getClientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return req.headers.get("x-real-ip");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const { recaptchaToken, ...fields } = data;

    const captcha = await verifyRecaptchaToken(recaptchaToken);
    if (!captcha.success) {
      return NextResponse.json(
        {
          error: "Verificación de seguridad fallida. Intente de nuevo.",
        },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);

    await db.insert(leads).values({
      nombre: fields.nombre,
      email: fields.email,
      telefono: fields.telefono.trim(),
      pais: fields.pais,
      areaInteres: fields.area_interes,
      etapaActual: fields.etapa_actual,
      comoConocio: fields.como_conocio?.trim() || null,
      nombreEvento: fields.nombre_evento?.trim() || null,
      mensaje: fields.mensaje?.trim() || null,
      ipAddress: ip,
      recaptchaScore: captcha.score,
    });

    const to = process.env.CONTACT_EMAIL || "info@t2bteam.net";
    const sentAt = new Date().toLocaleString("es", {
      dateStyle: "full",
      timeStyle: "short",
    });

    try {
      await resend.emails.send({
        from: "T2B Team Web <noreply@uniklabs.tech>",
        to,
        subject: `Nuevo lead capturado — ${fields.nombre} está interesado en ${fields.area_interes}`,
        html: `
        <h2>Nuevo lead (post-conferencia)</h2>
        <p><strong>Nombre completo:</strong> ${escapeHtml(fields.nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p><strong>Teléfono / WhatsApp:</strong> ${escapeHtml(fields.telefono)}</p>
        <p><strong>País:</strong> ${escapeHtml(fields.pais)}</p>
        <p><strong>Área de interés:</strong> ${escapeHtml(fields.area_interes)}</p>
        <p><strong>Etapa actual:</strong> ${escapeHtml(fields.etapa_actual)}</p>
        <p><strong>¿Cómo nos conoció?:</strong> ${escapeHtml(fields.como_conocio || "—")}</p>
        <p><strong>Nombre del evento:</strong> ${escapeHtml(fields.nombre_evento || "—")}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(fields.mensaje?.trim() || "—")}</p>
        <p><strong>Fecha y hora del envío:</strong> ${escapeHtml(sentAt)}</p>
        <p><strong>Score reCAPTCHA:</strong> ${captcha.score.toFixed(3)}</p>
      `,
        replyTo: fields.email,
      });
    } catch (emailErr) {
      console.error("Resend error (lead saved):", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json(
      { error: "Error al enviar el formulario" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
