import * as z from "zod";

export const contactPayloadSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  message: z.string().min(10).max(10_000),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
