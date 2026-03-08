"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "El nombre es muy corto"),
    email: z.string().email("Debe ser un email válido"),
    phone: z.string().optional(),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Error en la solicitud");

            setStatus("success");
            reset();

            // Reset success status after a few seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage("Hubo un problema enviando el mensaje. Intenta de nuevo.");

            // Reset error status after a few seconds
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left bg-surface/30 p-8 rounded-2xl border border-surface/50 backdrop-blur-sm relative overflow-hidden">

            {status === "success" && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <CheckCircle2 className="h-16 w-16 text-accent mb-4" />
                    <h3 className="text-xl font-heading font-bold text-white mb-2">¡Mensaje enviado!</h3>
                    <p className="text-muted text-center max-w-xs">Nos pondremos en contacto contigo lo más pronto posible.</p>
                </div>
            )}

            {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 mb-6">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{errorMessage}</p>
                </div>
            )}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">Nombre *</label>
                <input
                    {...register("name")}
                    id="name"
                    className="w-full bg-surface/50 border border-surface rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Tu nombre"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">Email *</label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className="w-full bg-surface/50 border border-surface rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted mb-1">Teléfono (opcional)</label>
                    <input
                        {...register("phone")}
                        id="phone"
                        className="w-full bg-surface/50 border border-surface rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="+1 234 567 8900"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted mb-1">Mensaje *</label>
                <textarea
                    {...register("message")}
                    id="message"
                    rows={4}
                    className="w-full bg-surface/50 border border-surface rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    placeholder="¿En qué te podemos ayudar?"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                    </>
                ) : "Enviar Mensaje"}
            </Button>
        </form>
    );
}
