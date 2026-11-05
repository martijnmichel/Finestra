import { Abort } from "telefunc";
import { Resend } from "resend";
import { requestFormSchema, type RequestFormValues } from "./schema";

export async function submitRequest(input: RequestFormValues) {
  const parsed = requestFormSchema.safeParse(input);
  if (!parsed.success) {
    throw Abort({ validation: parsed.error.flatten() });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_ADDRESS || "Sonid <hello@sonid.app>";
  const to =
    process.env.REQUEST_TO_EMAIL || "martijn.michel@gmail.com";

  if (!apiKey) {
    throw Abort("Email is not configured on the server.");
  }

  const data = parsed.data;
  const subject = `Finestra request from ${data.name}${
    data.company ? ` (${data.company})` : ""
  }`;

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Project type: ${data.projectType}`,
    data.relatedProject ? `Related project: ${data.relatedProject}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
    "",
    "Message:",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text: lines,
  });

  if (error) {
    console.error("[submitRequest] Resend error", error);
    throw Abort("Could not send your request. Please try again or email me directly.");
  }

  return { ok: true as const };
}
