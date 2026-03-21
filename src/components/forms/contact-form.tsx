"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Debe ser un email válido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

function fieldClass(
  name: keyof FormData,
  errors: Partial<Record<keyof FormData, { message?: string }>>,
  touchedFields: Partial<Record<keyof FormData, boolean>>
) {
  const base =
    "w-full bg-surface/50 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 transition-all border";
  const err = errors[name] && touchedFields[name];
  const ok = touchedFields[name] && !errors[name];
  if (err) return cn(base, "border-red-500 focus:ring-red-500/40");
  if (ok) return cn(base, "border-emerald-500/70 focus:ring-emerald-500/30");
  return cn(base, "border-surface focus:ring-accent focus:border-transparent");
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    setErrorMessage("");
    if (!executeRecaptcha) {
      setStatus("error");
      setErrorMessage(
        "No se pudo verificar el envío. Recarga la página o contacta soporte."
      );
      return;
    }

    let recaptchaToken: string;
    try {
      recaptchaToken = await executeRecaptcha("contact_submit");
    } catch {
      setStatus("error");
      setErrorMessage("Verificación de seguridad fallida. Intenta de nuevo.");
      return;
    }

    if (!recaptchaToken?.trim()) {
      setStatus("error");
      setErrorMessage("Verificación de seguridad fallida. Intenta de nuevo.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(
          json.error || "Verificación de seguridad fallida. Intenta de nuevo."
        );
      }

      setStatus("success");
      reset();

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Hubo un problema enviando el mensaje. Intenta de nuevo."
      );

      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-left bg-surface/30 p-8 rounded-2xl border border-surface/50 backdrop-blur-sm relative overflow-hidden"
    >
      {status === "success" && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <CheckCircle2 className="h-16 w-16 text-accent mb-4" />
          <h3 className="text-xl font-heading font-bold text-white mb-2">¡Mensaje enviado!</h3>
          <p className="text-muted text-center max-w-xs">
            Nos pondremos en contacto contigo lo más pronto posible.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">
          Nombre *
        </label>
        <input
          {...register("name")}
          id="name"
          className={fieldClass("name", errors, touchedFields)}
          placeholder="Tu nombre"
        />
        {errors.name && touchedFields.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">
            Email *
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className={fieldClass("email", errors, touchedFields)}
            placeholder="tu@email.com"
          />
          {errors.email && touchedFields.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-muted mb-1">
            Teléfono (opcional)
          </label>
          <input
            {...register("phone")}
            id="phone"
            className={fieldClass("phone", errors, touchedFields)}
            placeholder="+1 234 567 8900"
          />
          {errors.phone && touchedFields.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted mb-1">
          Mensaje *
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className={cn(
            fieldClass("message", errors, touchedFields),
            "resize-none"
          )}
          placeholder="¿En qué te podemos ayudar?"
        />
        {errors.message && touchedFields.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Mensaje"
        )}
      </Button>
    </form>
  );
}
