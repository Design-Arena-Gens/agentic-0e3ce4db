import { z } from "zod";

export const leadSourceOptions = [
  "Website Form",
  "Landing Page",
  "Phone",
  "Email Campaign",
  "Social Media",
  "Referral"
] as const;

export const leadStatusOptions = [
  "new",
  "contacted",
  "qualified",
  "lost",
  "won"
] as const;

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  status: z.enum(leadStatusOptions).default("new"),
  tags: z.array(z.string()).optional(),
  source: z.enum(leadSourceOptions).optional(),
  owner: z.string().optional(),
  lastContactedAt: z.string().optional()
});

export type LeadInput = z.infer<typeof leadSchema>;
