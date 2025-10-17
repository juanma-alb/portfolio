import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio." })
    .min(2, "Por favor, ingresá al menos dos caracteres.")
    .max(80, "El nombre no puede superar los 80 caracteres."),
  email: z
    .string({ required_error: "El email es obligatorio." })
    .email("Ingresá un email válido."),
  message: z
    .string({ required_error: "El mensaje es obligatorio." })
    .min(10, "Contame un poco más sobre tu consulta.")
    .max(1000, "El mensaje es demasiado largo (máx. 1000 caracteres)."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
