"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

const ContactSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre (mínimo 2 caracteres)"),
  email: z.string().email("Ingresá un email válido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactValues = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    mode: "onBlur",
  });

  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const onSubmit = async (values: ContactValues) => {
    setStatus("idle");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "No se pudo enviar el mensaje");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ocurrió un error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid w-full max-w-xl gap-4"
      noValidate
      aria-describedby="contacta11y-status"
    >
      <div className="grid gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="h-11 rounded-xl border border-input bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Tu nombre"
          {...register("name")}
          aria-invalid={Boolean(errors.name) || undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="h-11 rounded-xl border border-input bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="tu@email.com"
          {...register("email")}
          aria-invalid={Boolean(errors.email) || undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={5}
          className="rounded-xl border border-input bg-background px-3 py-2 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Contame brevemente en qué te puedo ayudar…"
          {...register("message")}
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting ? "true" : "false"} className="rounded-full">
          {isSubmitting ? "Enviando…" : "Enviar"}
        </Button>
      </div>

      <div
        id="contacta11y-status"
        role="status"
        aria-live="polite"
        className="min-h-5 text-sm"
      >
        {status === "success" ? (
          <span className="text-green-600">¡Mensaje enviado! Te responderé a la brevedad.</span>
        ) : status === "error" ? (
          <span className="text-destructive">{errorMsg}</span>
        ) : null}
      </div>
    </form>
  );
}
