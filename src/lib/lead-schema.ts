import * as z from "zod";

export const AREA_INTERES_OPTIONS = [
  "Finanzas personales",
  "Finanzas familiares",
  "Emprendimiento",
  "Desarrollo personal",
  "Liderazgo",
  "Ventas",
] as const;

export const ETAPA_ACTUAL_OPTIONS = [
  "Quiero aprender desde cero",
  "Ya tengo algo de experiencia",
  "Quiero mentoría personalizada",
  "Quiero información sobre cursos",
  "Quiero herramientas prácticas",
] as const;

export const COMO_CONOCIO_OPTIONS = [
  "Conferencia / Evento presencial",
  "Evento virtual / Webinar",
  "Redes sociales",
  "Recomendación de un amigo",
  "YouTube / Podcast",
  "Otro",
] as const;

export const EVENTO_SOURCE_VALUES = [
  "Conferencia / Evento presencial",
  "Evento virtual / Webinar",
] as const;

export function shouldShowNombreEvento(como: string | undefined): boolean {
  if (!como) return false;
  return (EVENTO_SOURCE_VALUES as readonly string[]).includes(como);
}

/** Placeholder del textarea Mensaje (mismo texto que antes iba fijo bajo el formulario). */
export const LEAD_MENSAJE_PLACEHOLDER =
  "No importa en qué punto estés hoy. Lo importante es que des el siguiente paso con dirección.";

export const leadFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  telefono: z.string().min(7, "Ingresa un número de teléfono válido"),
  pais: z.string().min(1, "Selecciona tu país"),
  area_interes: z.string().min(1, "Selecciona un área de interés"),
  etapa_actual: z.string().min(1, "Selecciona tu etapa actual"),
  como_conocio: z.string().optional(),
  nombre_evento: z.string().optional(),
  mensaje: z.string().max(5000, "El mensaje es demasiado largo").optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadPayloadSchema = leadFormSchema.extend({
  recaptchaToken: z.string().min(1, "Token de seguridad requerido"),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;
