import { z } from "zod";

export const projectTypeValues = ["app", "web", "cms", "other"] as const;
export const budgetValues = ["", "under5k", "5k15k", "15k50k", "50kplus"] as const;
export const timelineValues = [
  "",
  "asap",
  "1to3months",
  "3to6months",
  "flexible",
] as const;

export const requestFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  projectType: z.enum(projectTypeValues),
  relatedProject: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.enum(budgetValues).optional(),
  timeline: z.enum(timelineValues).optional(),
  message: z.string().trim().min(10, "Tell me a bit more (min 10 chars)").max(5000),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;
