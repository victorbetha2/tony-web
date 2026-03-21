"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  leadFormSchema,
  type LeadFormValues,
  AREA_INTERES_OPTIONS,
  ETAPA_ACTUAL_OPTIONS,
  COMO_CONOCIO_OPTIONS,
  shouldShowNombreEvento,
  LEAD_MENSAJE_PLACEHOLDER,
} from "@/lib/lead-schema";
import { SPANISH_SPEAKING_COUNTRIES } from "@/lib/spanish-speaking-countries";
import { cn } from "@/lib/utils";

function inputClass(
  name: keyof LeadFormValues,
  errors: Partial<Record<keyof LeadFormValues, { message?: string }>>,
  touchedFields: Partial<Record<keyof LeadFormValues, boolean>>
) {
  const base =
    "w-full bg-surface/50 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 transition-all border";
  const err = errors[name] && touchedFields[name];
  const ok = touchedFields[name] && !errors[name];
  if (err) return cn(base, "border-red-500 focus:ring-red-500/40");
  if (ok) return cn(base, "border-emerald-500/70 focus:ring-emerald-500/30");
  return cn(base, "border-surface focus:ring-accent focus:border-transparent");
}

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, touchedFields },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: {
      como_conocio: "",
      nombre_evento: "",
      mensaje: "",
    },
  });

  const comoConocio = watch("como_conocio");
  const showEvento = shouldShowNombreEvento(comoConocio);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const evento = new URLSearchParams(window.location.search).get("evento");
    if (evento) setValue("nombre_evento", decodeURIComponent(evento));
  }, [setValue]);

  const onValid = async (data: LeadFormValues) => {
    setErrorMessage("");
    setStatus("idle");
    if (!executeRecaptcha) {
      setStatus("error");
      setErrorMessage(
        "No se pudo verificar el envío. Recarga la página o contacta soporte."
      );
      return;
    }

    let recaptchaToken: string;
    try {
      recaptchaToken = await executeRecaptcha("lead_submit");
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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        throw new Error(json.error || "Error en la solicitud");
      }

      setSubmittedName(data.nombre);
      setSubmittedEmail(data.email);
      setStatus("success");
      reset();
    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMessage(
        e instanceof Error ? e.message : "Hubo un problema. Intenta de nuevo."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-6 bg-surface/30 rounded-2xl border border-surface/50 max-w-lg mx-auto"
      >
        <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-heading font-bold text-white mb-3">
          ¡Gracias, {submittedName}!
        </h3>
        <p className="text-muted leading-relaxed mb-8">
          Recibimos tu información. Alguien del equipo de T2B se comunicará contigo
          pronto al email {submittedEmail} o por WhatsApp.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 border border-muted text-foreground bg-transparent hover:bg-surface hover:text-white px-6 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          Volver al inicio
        </Link>
      </motion.div>
    );
  }

  return (
    <div id="lead-form" className="max-w-lg mx-auto scroll-mt-28">
      <h2 className="text-xl md:text-2xl font-heading font-bold text-white text-center mb-8">
        Completa tus datos y te contactaremos con la información más adecuada para ti
      </h2>

      <form
        onSubmit={handleSubmit(onValid)}
        className="space-y-5 text-left bg-surface/30 p-6 md:p-8 rounded-2xl border border-surface/50 backdrop-blur-sm relative"
      >
        {status === "error" && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-muted mb-1">
            Nombre completo *
          </label>
          <input
            {...register("nombre")}
            id="nombre"
            autoComplete="name"
            className={inputClass("nombre", errors, touchedFields)}
            placeholder="Tu nombre"
          />
          {errors.nombre && touchedFields.nombre && (
            <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">
            Email *
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass("email", errors, touchedFields)}
            placeholder="tu@email.com"
          />
          {errors.email && touchedFields.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-muted mb-1">
            Teléfono / WhatsApp *
          </label>
          <input
            {...register("telefono")}
            id="telefono"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass("telefono", errors, touchedFields)}
            placeholder="+504 0000 0000"
          />
          {errors.telefono && touchedFields.telefono && (
            <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pais" className="block text-sm font-medium text-muted mb-1">
            País *
          </label>
          <select
            {...register("pais")}
            id="pais"
            className={inputClass("pais", errors, touchedFields)}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona tu país
            </option>
            {SPANISH_SPEAKING_COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.pais && touchedFields.pais && (
            <p className="text-red-400 text-xs mt-1">{errors.pais.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="area_interes" className="block text-sm font-medium text-muted mb-1">
            Área de interés *
          </label>
          <select
            {...register("area_interes")}
            id="area_interes"
            className={inputClass("area_interes", errors, touchedFields)}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un área
            </option>
            {AREA_INTERES_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {errors.area_interes && touchedFields.area_interes && (
            <p className="text-red-400 text-xs mt-1">{errors.area_interes.message}</p>
          )}
        </div>

        <div>
          <span className="block text-sm font-medium text-muted mb-2">
            Etapa actual *
          </span>
          <div className="space-y-2">
            {ETAPA_ACTUAL_OPTIONS.map((opt) => (
              <label
                key={opt}
                className="flex items-start gap-3 p-3 rounded-lg border border-surface bg-surface/30 cursor-pointer hover:border-accent/40 has-[:checked]:border-accent/60"
              >
                <input
                  {...register("etapa_actual")}
                  type="radio"
                  value={opt}
                  className="mt-1 text-accent"
                />
                <span className="text-sm text-foreground">{opt}</span>
              </label>
            ))}
          </div>
          {errors.etapa_actual && touchedFields.etapa_actual && (
            <p className="text-red-400 text-xs mt-1">{errors.etapa_actual.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="como_conocio" className="block text-sm font-medium text-muted mb-1">
            ¿Cómo nos conociste?
          </label>
          <select
            {...register("como_conocio")}
            id="como_conocio"
            className={inputClass("como_conocio", errors, touchedFields)}
          >
            <option value="">Selecciona una opción</option>
            {COMO_CONOCIO_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence>
          {showEvento && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <label
                htmlFor="nombre_evento"
                className="block text-sm font-medium text-muted mb-1"
              >
                Nombre del evento
              </label>
              <input
                {...register("nombre_evento")}
                id="nombre_evento"
                className={inputClass("nombre_evento", errors, touchedFields)}
                placeholder="¿Cuál fue el evento al que asististe?"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-muted mb-1">
            Mensaje
          </label>
          <textarea
            {...register("mensaje")}
            id="mensaje"
            rows={4}
            className={cn(
              inputClass("mensaje", errors, touchedFields),
              "resize-none min-h-[120px]"
            )}
            placeholder={LEAD_MENSAJE_PLACEHOLDER}
          />
          {errors.mensaje && touchedFields.mensaje && (
            <p className="text-red-400 text-xs mt-1">{errors.mensaje.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar y recibir información"
          )}
        </Button>
      </form>
    </div>
  );
}
