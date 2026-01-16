 "use server";

import {
  createLead,
  deleteLead,
  listLeads,
  updateLead
} from "@/lib/lead-store";
import { leadSchema } from "@/lib/validators";

export async function getLeads() {
  return listLeads();
}

export async function createLeadAction(formData: FormData) {
  const data = leadSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    company: formData.get("company") || undefined,
    message: formData.get("message") || undefined,
    status: formData.get("status") || undefined,
    tags:
      (formData.get("tags") as string | null)
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [],
    source: formData.get("source") || undefined,
    owner: formData.get("owner") || undefined,
    lastContactedAt: formData.get("lastContactedAt") || undefined
  });

  const lead = await createLead(data);
  return lead;
}

export async function updateLeadAction(id: string, formData: FormData) {
  const data = leadSchema.partial().parse({
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
    company: formData.get("company") || undefined,
    message: formData.get("message") || undefined,
    status: formData.get("status") || undefined,
    tags:
      (formData.get("tags") as string | null)
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? undefined,
    source: formData.get("source") || undefined,
    owner: formData.get("owner") || undefined,
    lastContactedAt: formData.get("lastContactedAt") || undefined
  });

  return updateLead(id, data);
}

export async function deleteLeadAction(id: string) {
  await deleteLead(id);
}
